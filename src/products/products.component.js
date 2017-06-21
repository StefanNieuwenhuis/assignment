import $ from "jquery";
import "./style.scss";

let template = require("./products.component.handlebars");

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
        $.getJSON({
            url: "../../data/tablets.json",
            success: (data) => {
                // Check if the limit range is smaller than the products array
                if (this.limit <= data.products.length) {
                    let products = data.products.slice(0, this.limit); // Slice the array to the limit

                    // Filter the sliced array when filters are set
                    if (this.filters.length > 0) {
                       products = products.filter((product) => {
                          return this.filters.indexOf(product.specsTag)>=0;
                       });
                    }

                    // Populate Handebars template
                    $(this.container).html(template(products));
                }
            },
            fail: (error) => { 
                console.error(error); // Throw an error message if the request fails
            }
        });
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