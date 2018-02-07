<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SiteInfo\News;
use App\Models\SiteInfo\Download;
use App\Models\SiteInfo\Author;
use App\Models\SiteInfo\DownloadsCategory;
use App\Models\SiteInfo\NewsCategory;

class SiteController extends Controller
{
    public function __construct() {
        $this->middleware('admin');
    }

    /**
     * getSmallNewsFeed
     * Returns a JSON-ified array of 5 news items 
     *
     * @return void
     */
    public function getSmallNewsFeed() {   

        try {
            $newsArticles = News::orderBy('created_at', 'desc')->get()->take(5)->toJson();
            return $newsArticles;
        } catch(Exception $e) {
            return $e->getMessage();
        }
            
    }

    /**
     * getAuthors
     * Returns a JSON-ified list of all the authors
     *
     * @return void
     */
    public function getAuthors() {
        try {
            $authors = Author::all()->toJson();
            return $authors;
        } catch(Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * getNewsCategories
     * Returns a list of news categories present in the database
     *
     * @return void
     */
    public function getNewsCategories()
    {
        try {
            $categories = NewsCategory::all()->toJson();
            return $categories;
        } catch(Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * createNews
     * Creates a news article with the data provided
     *
     * @param Request $request
     * @return void
     */
    public function createNews(Request $request)
    {
        if($request->ajax()) {
            $this->validate($request, [
                'title' => 'required|string',
                'author' => 'required|integer',
                'category' => 'required|integer',
                'content' => 'required|string'
            ]);
            $news = new News;
            $news->title = $request->title;
            $news->author = $request->author;
            $news->category = $request->category;
            $news->content = $request->content;
            try {
                $news->save();
                return response()->json(['success' => true, 'url' => '/panel']);
            } catch(Exception $e) {
                return response()->json(['error' => $e->getMessage()]);
            }


        } else {
            return response()->json([ 'error' => 'Invalid request!']);
        }
    }


}
