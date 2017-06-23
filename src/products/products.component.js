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
        this.defaultChunkSize = 10;
        this.chunkSize = this.defaultChunkSize; // # of products visible at the same time
        this.maxLimit = 0;

        this.loadAndFilterProducts(); // Load and filter products 
        this.bindInfiniteScrollingToDomContainer(); // Bind infinite scrolling to the products DOM container
    }

    /**
     * Load and filter data and enable infinite scrolling
     */
    loadAndFilterProducts() {
        this.loadData().then(products => {
            this.products = products;

            if (this.query) { this.search() };
            if (this.filters.length > 0) { this.filter(); }
            if (this.chunkSize <= products.length) { this.createProductChunks(); }
            this.bindHandlebarsTemplateToDom();
        });
    }

    /**
     * Load products data from tablets.json
     * @return {any} - Promise (rejected or resolved)
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
     * Slice the products object into chunks (# of products visible at the same time)
     */
    createProductChunks() {
        this.products = this.products.slice(0, this.chunkSize);
    }

    /**
     * Filter products object by matching specsTag
     * @return {Array<Object>} - Filtered products
     */
    filter() {
        this.products = this.products.filter(product => {
            return this.filters.indexOf(product.specsTag) >= 0;
        });
    }

    /**
     * Query products object by matching search terms
     * @return {Array<Object>} - Filtered products
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
     * @param {number} size - Chunks size 
     */
    setChunkSize(size) {
        this.chunkSize = size;
    }

    /**
     * Reset the chunk size to default (value 10)
     */
    resetChunkSizeToDefault(){
        this.setChunkSize(this.defaultChunkSize);
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

        // If no filters are active reset the chunk size to default (10) again
        if(this.filters.length === 0){
            this.resetChunkSizeToDefault();
        }
    }

    /**
     * Bind infinite scrolling to the products DOM container
     */
    bindInfiniteScrollingToDomContainer() {
        const element = $(this.container)[0];
        $(element).scroll(() => {
            let scrollPosition = element.scrollHeight - element.scrollTop - element.clientHeight; // Get the current scrolling position

            // When scrolled to the bottom of the container...
            if (scrollPosition === 0) {
                this.setChunkSize((this.chunkSize + 10)); // Increase the chunk size (# of products visible at the same time) by 10
                this.loadAndFilterProducts(); // Load and filter products
            }
        });
    }
}
export default ProductsComponent;