<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SiteInfo\News;

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
     * @return view
     */
    public function displayCreateNews() {
        return view('panel.news.create');
    }

    /**
     * displayEditNews
     * Displays the edit news view
     * 
     * @return view
     */

    public function displayEditNews($id) {
        $news = News::whereId($id)->get()->toJson();
        return view('panel.news.edit')->with('news', $news);;
    }

    /**
     * displayAllNews
     * Returns a paginated view of all the news articles in the database
     * 
     * @return view
     */
    public function displayAllNews() {
        $displayNews = News::orderBy('created_at', 'desc')->paginate(10);

        return view('panel.news.view')->with('news', $displayNews);
    }
}
