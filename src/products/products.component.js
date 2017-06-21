import $ from "jquery";
import "./style.scss";

let template = require("./products.component.handlebars");

import * as TABLETS from "../../data/tablets.json";

class ProductsComponent {

    constructor(container) {
        this.container = container;
        this.filters = [];
        this.limit = 10;
        this.init();
    }

    init() {
        this.load();
    }

    load() {
        // let products = TABLETS.products;
        // if(this.limit <= products.length){            
        //     products = products.slice(0, this.limit);            
        //     $(this.container).html(template(products));
        //     console.log(products);
        // }

        $.getJSON({
            url: "../../data/tablets.json",
            success: (data) => {
                // Check if the limit range is smaller than the products array
                if (this.limit <= data.products.length) {
                    let products = data.products.slice(0, this.limit); // Slice the array to the limit

                    // Filter the sliced array when filters are set
                    if (this.filters.length > 0) {
                       products = products.filter((filter) => {
                           return filter.specsTag.indexOf(this.filters) > -1;
                       });
                    }
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