'use strict';
import $ from 'jquery';
import './styles.scss';

import ProductsComponent from './products/products.component';

class Main {
    constructor() {
        const containerId = "#container"; // Define containerId for further referencing
        
        this.products = new ProductsComponent(containerId); // Create a new instance of ProductsComponent

        // When the DOM is ready initialize infinite scroll for #container div
        $(() => { this.initInfiniteScroll(containerId); });

    }

    initInfiniteScroll(containerId) {
        const element = $(containerId)[0];
        
        $(element).scroll(() => {
            let scrollPosition = element.scrollHeight - element.scrollTop - element.clientHeight; // Get the current scrolling position
            
            // When scrolled to the bottom of the container...
            if (scrollPosition === 0) {
                this.products.increaseLimit(10); // Increase the number of products visible by 10
                this.products.load(); // Load all the products
            }
        });
    }
}
new Main(); // Create a new instance of Main
