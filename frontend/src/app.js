
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

// inject VueRouter into Vue
Vue.use(VueRouter);
Vue.use(Vuex);

// initiate the store
const store = new Vuex.Store(Store);

// create new Vue app
const app = new Vue({
    store: store,
    router: Router
}).$mount('#app');

console.log(app);