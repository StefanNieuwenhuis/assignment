"use strict";
import $ from "jquery";

import "./styles.scss";

import favicon from "../favicon.ico";

import HeaderComponent from "./header/header.component";
import ProductsComponent from "./products/products.component";
import RefinementComponent from "./refinement/refinement.component";
import FooterComponent from "./footer/footer.component";
import SearchComponent from "./search/search.component";


/**
 * Class representing a MainComponent
 */
class Main {

    /**
     * Create a component called MainComponent
     */
    constructor() {
        // When the DOM is ready...
        $(() => {
            // Initialize all components
            this.initializeComponents();

            // Bind onchange event to all checkboxes in the application
            // This enables the application to filter the products object
            $("input[type='checkbox']").change((event) => {
                const target = $(event.currentTarget)[0];
                if (target.checked) {
                    this.products.addFilter($(target).val());
                } else {
                    this.products.removeFilter($(target).val());
                }
                this.products.loadAndFilterProducts();
            });

            // Bind onclick event to the search button 
            // This allows the application to query and list the products
            $("#btnSearch").click(event => {
                event.preventDefault();
                this.products.resetChunkSizeToDefault();
                this.products.query = $("#searchfield").val();
                this.products.loadAndFilterProducts();
            });
        });

    }

    /**
     * Initialize all components/views needed for the application
     */
    initializeComponents() {
        this.header = new HeaderComponent("#header"); // Create a new instance of HeaderComponent
        this.products = new ProductsComponent("#products"); // Create a new instance of ProductsComponent
        this.refinement = new RefinementComponent("#refinement"); // Create a new instance of RefinementComponent
        this.footer = new FooterComponent("#footer"); // Create a new instance of FooterComponent
        this.search = new SearchComponent("#search");
    }
}
new Main(); // Create a new instance of Main
