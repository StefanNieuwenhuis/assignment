import $ from "jquery";
import "./style.scss";

let template = require("./search.component.handlebars");

class HeaderComponent {
    constructor(container) {
        this.container = container;

        this.load();
    }

    load() {
        $(this.container).html(template());

        
    }
}
export default HeaderComponent;