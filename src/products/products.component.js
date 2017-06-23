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
        this.filtersBrand = []; // Array for filters
        this.filtersPrice = []; //string[] for storing price filters
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
            if (this.filtersBrand.length > 0) { this.filterProductsOnBrand(); }
            if (this.filtersPrice.length > 0) { this.filterProductsOnPrice(); }
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
    resetChunkSizeToDefault() {
        this.setChunkSize(this.defaultChunkSize);
    }

    /**
     * Add string values to this.filtersBrand:string[]
     * @param {string} value - String value that matches this.products.specsTag
     */
    addBrandFilter(value) {
        this.filtersBrand.push(value);
    }

    /**
     * Remove string values from this.filtersBrand:string[]
     * @param {string} value - String value that needs to be removed from this.filtersBrand:string[]
     */
    removeBrandFilter(value) {
        const index = this.filtersBrand.indexOf(value);
        if (index > -1) {
            this.filtersBrand.splice(index, 1);
        }

        // If no filters are active reset the chunk size to default (10) again
        if (this.filtersBrand.length === 0) {
            this.resetChunkSizeToDefault();
        }
    }

    /**
     * Filter products object by matching specsTag
     * @return {Array<Object>} - Filtered products
     */
    filterProductsOnBrand() {
        this.products = this.products.filter(product => {
            return this.filtersBrand.indexOf(product.specsTag) >= 0;
        });
    }

    /**
     * Add string values to this.filtersPrice:string[]
     * @param {string} value - String value that matches this.products.offerData.offers[0].price
     */
    addPriceFilter(value) {
        this.filtersPrice.push(value);
    }

    /**
     * Remove string values to this.filtersPrice:string[]
     * @param {string} value - String value that matches this.products.offerData.offers[0].price
     */
    removePriceFilter(value) {
        const index = this.filtersPrice.indexOf(value);
        if (index > -1) {
            this.filtersPrice.splice(index, 1);
        }

        // If no filters are active reset the chunk size to default (10) again
        if (this.filtersPrice.length === 0) {
            this.resetChunkSizeToDefault();
        }
    }

    /**
     * Filter products object by matching price range
     * @return {Array<Object>} - Filtered products
     */
    filterProductsOnPrice() {
        let results = []
        this.filtersPrice.map(filter => {
            if (filter.indexOf("<") >= 0) {
                let price = filter.substring(filter.indexOf("<") + 1);
                results = results.concat(this.products.filter(product => product.offerData.offers[0].price <= price));
            }
            if (filter.indexOf("-") >= 0) {
                let priceRange = filter.split("-");
                results = results.concat(this.products.filter(product =>
                    product.offerData.offers[0].price >= priceRange[0] &&
                    product.offerData.offers[0].price <= priceRange[1]
                ));
            }

            if (filter.indexOf(">") >= 0) {
                let price = filter.substring(filter.indexOf(">") + 1);
                results = results.concat(this.products.filter(product => product.offerData.offers[0].price >= price));
            }

        });
        this.products = results;
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