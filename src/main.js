'use strict';
import $ from 'jquery';
import "jquery-ui/ui/widgets/autocomplete";
import './styles.scss';

import HeaderComponent from './header/header.component';
import ProductsComponent from './products/products.component';
import RefinementComponent from './refinement/refinement.component';
import FooterComponent from './footer/footer.component';

class Main {
    constructor() {
        // When the DOM is ready...
        $(() => {
            // Create all components
            this.createComponents();

            // Intialize infinite scroll for #container div
            this.initInfiniteScroll("#products");

            $("input[type='checkbox']").change((event) => {
                const target = $(event.currentTarget)[0];
                if (target.checked) {
                    this.products.addFilter($(target).val());
                } else {
                    this.products.removeFilter($(target).val());
                }
                this.products.init();
            });


            $("#searchfield").autocomplete({
                source: (request, response) => {
                    $.ajax({
                        url: `${window.location.protocol}//zoeksuggesties.s-bol.com/extern/qs/OpenSearchJSCB/search_suggestions_callback/media_all/${encodeURIComponent(request.term)}`,
                        cache: true,
                        dataType: 'jsonp',
                        jsonp: false,
                        jsonpCallback: 'search_suggestions_callback',
                        success: (data) => {
                            console.log(data);
                            let suggestions = [];
                            data[1].forEach(suggestion => { suggestions.push(suggestion); });
                            response(suggestions);
                        },
                        error: (error) => response([])
                    });
                },
                select: function (event, ui) {
                   if(ui.item){
                       console.log(this);
                       this.products.addFilter(ui.item.value);
                   }
                }
            });
        });

    }

    createComponents() {
        this.header = new HeaderComponent("#header"); // Create a new instance of HeaderComponent
        this.products = new ProductsComponent("#products"); // Create a new instance of ProductsComponent
        this.refinement = new RefinementComponent("#refinement"); // Create a new instance of RefinementComponent
        this.footer = new FooterComponent("#footer"); // Create a new instance of FooterComponent

    }

    initInfiniteScroll(containerId) {
        const element = $(containerId)[0];

        $(element).scroll(() => {
            let scrollPosition = element.scrollHeight - element.scrollTop - element.clientHeight; // Get the current scrolling position

            // When scrolled to the bottom of the container...
            if (scrollPosition === 0) {
                this.products.increaseLimit(10); // Increase the number of products visible by 10
                this.products.init(); // Load all the products
            }
        });
    }
}
new Main(); // Create a new instance of Main
