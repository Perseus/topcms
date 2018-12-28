
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */



import Vue from 'vue';

import Store from './store/index';
import Router from './router/index';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.config.devtools = true

import * as Sentry from '@sentry/browser'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faSearch, faShoppingCart, faDownload, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper, faImages } from '@fortawesome/fontawesome-free-regular';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add( [ faAngleRight, faSearch, faNewspaper, faImages, faShoppingCart, faDownload, faTimes ] );

Vue.component('font-awesome-icon', FontAwesomeIcon)

// inject VueRouter into Vue
Vue.use(VueRouter);
Vue.use(Vuex);

// initiate the store
const store = new Vuex.Store(Store);

Sentry.init({
    dsn: 'https://b1bb5f392e7d493d901ed3f0397f42c4@sentry.io/1340165',
    integrations: [new Sentry.Integrations.Vue({ Vue })]
});

  
// create new Vue app
const app = new Vue({
    store: store,
    router: Router
}).$mount('#app');

