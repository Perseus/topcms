
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

// Require Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min');

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css');
require('font-awesome/css/font-awesome.css');
require('froala-editor/css/froala_style.min.css');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import config from './config.js';

// Main components
import Navbar from './components/layouts/Navbar';
import Breadcrumbs from './components/layouts/Breadcrumbs';

// Page components
import Panel from './components/panel/Panel';
// Sub-components
import Createnews from './components/panel/News/Createnews';
import Editnews from './components/panel/News/Editnews';

// 3rd party assets
import VueFroala from 'vue-froala-wysiwyg';



Vue.use(VueFroala);
const app = new Vue({
    el: '#app',
    props: ['config'], 
    created() {
        this.config = config;
        
    },
    components: { Navbar, Breadcrumbs, Panel, Createnews, Editnews },
});
