<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SiteInfo\News;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $newsArticles = News::orderBy('updated_at', 'desc')->paginate(5);
        return view('home', compact('newsArticles'));
    }
}
