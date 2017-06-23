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

        this.brands =
            {
                "merken": [
                    { "label": "AXXO", "value": "AXXO" },
                    { "label": "Acer", "value": "Acer" },
                    { "label": "Allwinner Technology", "value": "Allwinner Technology" },
                    { "label": "Android", "value": "Android" },
                    { "label": "Apple", "value": "Apple" },
                    { "label": "Archos", "value": "Archos" },
                    { "label": "Asus", "value": "Asus" },
                    { "label": "Denver", "value": "Denver" },
                    { "label": "EKEN", "value": "EKEN" },
                    { "label": "HP", "value": "HP" },
                    { "label": "Huawei", "value": "Huawei" },
                    { "label": "Kurio", "value": "Kurio" },
                    { "label": "Lenovo", "value": "Lenovo" },
                    { "label": "MEDION", "value": "MEDION" },
                    { "label": "MMTC", "value": "MMTC" },
                    { "label": "Microsoft", "value": "Microsoft" },
                    { "label": "Samsung", "value": "Samsung" },
                    { "label": "Sensation", "value": "Sensation" },
                    { "label": "Sony", "value": "Sony" },
                    { "label": "Trekstor", "value": "Trekstor" },
                    { "label": "Wacom", "value": "Wacom" }
                ],
                "prijzen": [
                    { "label": "€0 - €100", "value": "<100" },
                    { "label": "€100 - €200", "value": "100-200" },
                    { "label": "> €200", "value": ">200" }
                ]
            };

        this.bindHandlebarsTemplateToDom();
    }

    /**
     * Bind handlebars template to DOM element
     */
    bindHandlebarsTemplateToDom() {
        $(this.container).html(template(this.brands));
    }
}

export default RefinementComponent;