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
Route::post('/panel/news/create', 'SiteController@createNews');
Route::post('/panel/news/edit/{id}', 'SiteController@editNews');
Route::post('/panel/news/delete/{id}', 'SiteController@deleteNews');


// Site-panel routes
Route::get('/panel', 'SitePanelController@index')->name('SitePanelIndex');
Route::get('/panel/news/create', 'SitePanelController@displayCreateNews');
Route::get('/panel/news/edit/{id}', 'SitePanelController@displayEditNews');
Route::get('/panel/news/view', 'SitePanelController@displayAllNews');

