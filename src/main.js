'use strict';
import $ from 'jquery';
import './styles.scss';

import ProductsComponent from './products/products.component';
import RefinementComponent from './refinement/refinement.component';

class Main {
    constructor() {
        // When the DOM is ready...
        $(() => {
            // Create all components
            this.createComponents();

            // Intialize infinite scroll for #container div
            this.initInfiniteScroll("#container");

            $("input[type='checkbox']").change((event) => {
                const target = $(event.currentTarget)[0];
                if (target.checked) {
                    this.products.addFilter($(target).val());
                }else{
                    this.products.removeFilter($(target).val());
                }
            });
        });

    }

    createComponents() {
        this.products = new ProductsComponent("#container"); // Create a new instance of ProductsComponent
        this.refinement = new RefinementComponent("#refinement"); // Create a new instance of RefinementComponent

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
