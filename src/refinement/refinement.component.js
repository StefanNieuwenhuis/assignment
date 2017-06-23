import $ from "jquery";
import "./style.scss";

let template = require("./refinement.component.handlebars");

/**
 * Class representing a RefinementComponent
 */
class RefinementComponent {

    /**
     * Create a component called RefinementComponent
     * @param {string} container - DOM container id to bind Handlebars template to
     */
    constructor(container) {
        this.container = container;

        this.items =
            {
                "merken": [
                    {
                        "label": "Apple",
                        "value": "Apple"
                    },
                    {
                        "label": "Samsung",
                        "value": "Samsung"
                    },
                    {
                        "label": "Lenovo",
                        "value": "Lenovo"
                    }
                ]
            };

        this.bindHandlebarsTemplateToDom();
    }

    /**
     * Bind handlebars template to DOM element
     */
    bindHandlebarsTemplateToDom() {
        $(this.container).html(template(this.items));
    }
}

export default RefinementComponent;