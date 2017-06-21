'use strict';
import $ from 'jquery';
import './styles.scss';

import ProductsComponent from './products/products.component';

let products = new ProductsComponent('#container');;

$(() => {
    initInfiniteScroll("#container");
});


let initInfiniteScroll = (elementId) => {
    const element = $(elementId)[0];
    $(element).scroll(() => {
        let scrollPosition = element.scrollHeight - element.scrollTop - element.clientHeight;
        if (scrollPosition === 0) {
            products.increaseLimit(10);
            products.load();
        }
    });
}
