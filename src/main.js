'use strict';

import $ from 'jquery';

import ProductsComponent from './products/products.component';

$(() => {
   loadComponent();
});

let loadComponent = () =>{
    let products = new ProductsComponent('#container');
};
