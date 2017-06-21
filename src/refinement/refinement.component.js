import $ from 'jquery';
import './style.scss';

let template = require('./refinement.component.handlebars');

class RefinementComponent{
    constructor(container){
        this.container = container;

        this.items = [
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

        ];

        this.load();
    }

    load(){
        $(this.container).html(template(this.items));
    }
}

export default RefinementComponent;