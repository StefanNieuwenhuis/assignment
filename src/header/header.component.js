import $ from "jquery";
import "./style.scss";

import logo from "../public/images/logo.png";

let template = require("./header.component.handlebars");

/**
 * Class representing a HeaderComponent
 */
class HeaderComponent {
    
    /**
     * Create a component called HeaderComponent
     * @param {string} container - DOM container id to bind Handlebars template to
     */
    constructor(container) {
        this.container = container;
        this.headerImage = { "url": logo };
        this.bindHandlebarsTemplateToDom();
    }

    /**
     * Bind handlebars template to DOM element
     */
    bindHandlebarsTemplateToDom() {
        $(this.container).html(template(this.headerImage));
    }
}
export default HeaderComponent;