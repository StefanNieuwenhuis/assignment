import $ from "jquery";
import "./style.scss";

let template = require("./products.component.handlebars");
import * as TABLETS from "../../data/tablets.json";

/**
 * Class representing a ProductsComponent
 */
class ProductsComponent {

    /**
     * Create a component called ProductsComponent
     * @param {string} container - DOM container id to bind Handlebars template to
     */
    constructor(container) {
        this.container = container; // DOM container element
        this.products = []; // Array for products
        this.filters = []; // Array for filters
        this.query = "";
        this.limit = 10; // Limit of products showed
        this.maxLimit = 0;

        this.init(); // Initialize 
    }

    /**
     * Load and filter data and enable infinite scrolling
     */
    init() {
        this.loadData().then(products => {
            this.products = products;

            if (this.query) { this.search() };
            if (this.filters.length > 0) { this.filter(); }
            if (this.limit <= products.length) { this.createProductChunks(); }
            this.bindHandlebarsTemplateToDom();
        });

        this.infiniteScroll();
    }

    /**
     * Load products data from tablets.json
     */
    loadData() {
        return new Promise((resolve, reject) => {
            if (TABLETS) {
                resolve(TABLETS.products);
            } else {
                reject([]);
            }
        });
    }

    /**
     * Slice the products object into chunks that'll be fed to infinite scroll
     */
    createProductChunks() {
        this.products = this.products.slice(0, this.limit);
    }


    /**
     * Filter products object by matching specsTag
     */
    filter() {
        this.products = this.products.filter(product => {
            return this.filters.indexOf(product.specsTag) >= 0;
        });

    }

    /**
     * Query products object by matching search terms
     * @return {Object} - Filtered products
     */
    search() {
        this.products = this.products.filter(product => {
            return product.specsTag.toLowerCase().includes(this.query.toLowerCase());
        });
    }

    /**
     * Bind handlebars template to DOM element
     */
    bindHandlebarsTemplateToDom() {
        $(this.container).html(template(this.products));
    }

    /**
     * Set the chunk size to determine how many products are visible at the same time
     * @param {number} limit - Chunks size 
     */
    setLimit(limit) {
        this.limit = limit;
    }

    /**
     * Add string values to this.filters:string[]
     * @param {string} value - String value that matches this.products.specsTag
     */
    addFilter(value) {
        this.filters.push(value);
    }

    /**
     * Remove string values from this.filters:string[]
     * @param {string} value - String value that needs to be removed from this.filters:string[]
     */
    removeFilter(value) {
        const index = this.filters.indexOf(value);
        if (index > -1) {
            this.filters.splice(index, 1);
        }
    }

    /**
     * Filter this.products
     */
    filterData() {
        loadData();
    }

    /**
     * Enable infinite scrolling to DOM element
     */
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