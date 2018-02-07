<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SitePanelController extends Controller
{
    //

    public function __construct() {
        $this->middleware('admin');
    }


    /**
     * index
     * Displays the panel index view
     *
     * @return void
     */
    public function index()
    {
        return view('panel.index');
    }


    /**
     * displayCreateNews
     * Displays the create news view
     *
     * @return void
     */
    public function displayCreateNews() {
        return view('panel.news.create');
    }
}
