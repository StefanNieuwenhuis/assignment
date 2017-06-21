import $ from "jquery";
import "./style.scss";

let template = require("./footer.component.handlebars");

class footerComponent {
    constructor(container) {
        this.container = container;

        this.load();
    }

    load() {
        $(this.container).html(template());
     }
}
export default footerComponent;