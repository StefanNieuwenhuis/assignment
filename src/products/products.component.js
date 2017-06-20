import $ from "jquery";
import "./styles.scss";
let template = require("./products.component.handlebars");


import * as TABLETS from "../../data/tablets.json";

class ProductsComponent {

    constructor(container) {
        this.container = container;
        this.init();
    }

    init() {
        $(this.container).html(template(TABLETS));
    }


}
export default ProductsComponent;