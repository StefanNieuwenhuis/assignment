import $ from "jquery";
import "./style.scss";

let template = require("./products.component.handlebars");
import * as TABLETS from "../../data/tablets.json";

class ProductsComponent {

    constructor(container) {
        this.container = container; // DOM container element
        this.filters = []; // Array for filters
        this.limit = 10; // Limit of products showed

        this.init(); // Initialize 
    }

    init() {
        this.load(); // Load tablets.json into Handlebars template
    }

    load() {
        let products = TABLETS.products;
        if (this.limit <= products.length) {
            products = products.slice(0, this.limit);
        }
        if (this.filters.length > 0) {
            products = products.filter((product) => {
                return this.filters.indexOf(product.specsTag) >= 0;
            });
        }
        $(this.container).html(template(products));
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
        load();
    }
}
export default ProductsComponent;