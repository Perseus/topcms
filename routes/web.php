<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');



// Site routes
Route::get('/news/small', 'SiteController@getSmallNewsFeed');
Route::get('/authors/get', 'SiteController@getAuthors');
Route::get('/newsCat/get', 'SiteController@getNewsCategories');
Route::post('/news/create', 'SiteController@createNews');

// Site-panel routes
Route::get('/panel', 'SitePanelController@index')->name('SitePanelIndex');
Route::get('/news/create', 'SitePanelController@displayCreateNews');

