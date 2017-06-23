import $ from "jquery";
import "./style.scss";

let template = require("./footer.component.handlebars");

/**
 * Class representing a FooterComponent
 */
class footerComponent {

    /**
     * Create a component called FooterComponent
     * @param {string} container - DOM container id to bind Handlebars template to
     */
    constructor(container) {
        this.container = container;

        this.bindHandlebarsTemplateToDom();
    }

    /**
     * Bind handlebars template to DOM element
     */
    bindHandlebarsTemplateToDom() {
        $(this.container).html(template());
    }
}
export default footerComponent;