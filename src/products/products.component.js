import $ from "jquery";
import "./styles.scss";

let template = require("./products.component.handlebars");

import * as TABLETS from "../../data/tablets.json";

class ProductsComponent {

    constructor(container) {
        this.container = container;
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
                if (this.limit <= data.products.length) {
                    let products = data.products.slice(0, this.limit);
                    $(this.container).html(template(products));
                }
            },
            fail: (error) => { console.error(error); }
        });
    }

    increaseLimit(value) {
        this.limit += value;
    }
}
export default ProductsComponent;