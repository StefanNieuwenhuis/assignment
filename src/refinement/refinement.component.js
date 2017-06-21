import $ from 'jquery';
import './style.scss';

let template = require('./refinement.component.handlebars');

class RefinementComponent{
    constructor(container){
        this.container = container;
        this.load();
    }

    load(){
        $(this.container).html(template());
    }
}

export default RefinementComponent;