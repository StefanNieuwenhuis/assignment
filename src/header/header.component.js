import $ from "jquery";
import "./style.scss";

const logo = require("../public/images/logo.png");

let template = require("./header.component.handlebars");

class HeaderComponent {
    constructor(container) {
        this.container = container;
        this.headerImage = {"url": logo};
        this.load();
    }

    load() {
        $(this.container).html(template(this.headerImage));        
    }
}
export default HeaderComponent;