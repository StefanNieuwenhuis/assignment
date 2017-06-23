import $ from "jquery";
import "./style.scss";

let template = require("./search.component.handlebars");

/**
 * Class representing a ProductsComponent
 */
class SearchComponent {

    /**
     * Create a component called SearchComponent
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
export default SearchComponent;