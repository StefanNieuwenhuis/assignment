import $ from "jquery";
import "./style.scss";

let template = require("./products.component.handlebars");
import * as TABLETS from "../../data/tablets.json";

class ProductsComponent {

    constructor(container) {
        this.container = container; // DOM container element
        this.products = []; // Array for products
        this.filters = []; // Array for filters
        this.query = "";
        this.limit = 10; // Limit of products showed
        this.maxLimit = 0;

        this.init(); // Initialize 
        this.infiniteScroll();
    }

    init() {
        this.loadData().then(products => {
            this.products = products;
            if (this.limit <= products.length) { this.createProductChunks(); }
            if(this.query){this.search()};
            if (this.filters.length > 0) { this.filter(); }
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

    createProductChunks() {
        this.products = this.products.slice(0, this.limit);
    }

    filter() {
        this.products = this.products.filter(product => {
            return this.filters.indexOf(product.specsTag) >= 0;
        });

    }

    search(){
        this.products = this.products.filter(product =>{
            console.log(product.specsTag.includes(this.query));
            return product.specsTag.toLowerCase().includes(this.query);
            
        });
        console.log(this.query);
    }

    setTemplate() {
        $(this.container).html(template(this.products));
    }

    setLimit(limit) {
        this.limit = limit;
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

    infiniteScroll() {
        const element = $(this.container)[0];
        $(element).scroll(() => {
            let scrollPosition = element.scrollHeight - element.scrollTop - element.clientHeight; // Get the current scrolling position

            // When scrolled to the bottom of the container...
            if (scrollPosition === 0) {
                this.setLimit((this.limit + 10)); // Increase the number of products visible by 10
                this.init(); // Load all the products
            }
        });
    }
}
export default ProductsComponent;