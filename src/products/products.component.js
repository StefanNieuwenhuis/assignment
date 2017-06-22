import $ from "jquery";
import "./style.scss";

let template = require("./products.component.handlebars");
import * as TABLETS from "../../data/tablets.json";

class ProductsComponent {

    constructor(container) {
        this.container = container; // DOM container element
        this.products = []; // Array for products
        this.filters = []; // Array for filters
        this.limit = 10; // Limit of products showed

        this.init(); // Initialize 
    }

    init() {
        this.loadData().then(products => {
            this.products = products;
            if (this.limit <= products.length) { this.setLimit(); }
            if (this.filters.length > 0) { this.setFilter(); }
            this.setTemplate();
        });
    }

    loadData() {
        return new Promise((resolve, reject) => {
            if (TABLETS) {
                resolve(TABLETS.products);
            } else {
                reject([]);
            }
        });
    }

    setLimit() {
        this.products = this.products.slice(0, this.limit);
    }

    setFilter() {
        this.products = this.products.filter((product) => {
            return this.filters.indexOf(product.specsTag) >= 0;
        });
    }

    setTemplate() {
        $(this.container).html(template(this.products));
    }

    increaseLimit(value) {
        this.limit += value;
    }

    addFilter(value) {
        this.filters.push(value);
    }

    removeFilter(value) {
        const index = this.filters.indexOf(value);
        if (index > -1) {
            this.filters.splice(index, 1);
        }
    }

    filterData() {
        loadData();
    }
}
export default ProductsComponent;