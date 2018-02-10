<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Models\AccountServer\AccountLogin;
use App\Models\SiteInfo\News;
use App\Models\SiteInfo\Download;
use App\Models\SiteInfo\Author;
use App\Models\SiteInfo\DownloadsCategory;
use App\Models\SiteInfo\NewsCategory;
use Barryvdh\Debugbar;


class PanelTest extends DuskTestCase
{



    public function test_whether_panel_is_not_accessible_to_normal_users()
    {
        $this->browse(function($first, $second) {
            $first->loginAs(AccountLogin::find(73))
                  ->visit('/panel')
                  ->assertSee('Sorry, the page you are looking for could not be found.')
                  ->logout();
        });
    }

    public function test_whether_panel_is_accessible_to_admins() {
        $this->browse(function($first, $second) {
            $first->loginAs(AccountLogin::find(44))
                  ->visit('/panel')
                  ->assertDontSee('Sorry, the page you are looking for could not be found.')
                  ->assertSee('Panel')
                  ->assertSee('News')
                  ->assertSee('Downloads');
        });
    }

    public function test_whether_creating_news_article_works() {

        
        $author = factory(Author::class)->create();
        $news_category = factory(NewsCategory::class)->create();
        $this->browse(function($first,$second) {
            $first->maximize()
                  ->visit('/panel')
                  ->clickLink('Create a news article')
                  ->type('title', "News Test 1")
                  ->select('author')
                  ->select('category')
                  ->type('content', 'This is a test news article!')
                  ->press('Submit')
                  ->screenshot('error')
                  ->pause(3000)
                  ->assertPathIs('/panel')
                  ->assertSee('News Test 1')
                  ->assertSee('This is a test');
        });

    }


    public function test_whether_editing_news_article_works() {
        $this->browse(function($first, $second) {
                $first->visit('/panel')
                      ->clickLink('Edit')
                      ->assertPathBeginsWith('/panel/news/edit/')
                      ->type('content', "Edited Test")
                      ->type('title', "Edited")
                      ->press('Submit')
                      ->pause(3000)
                      ->assertPathIs('/panel')
                      ->assertSee("Edited")
                      ->assertSee("Edited Test");
        });
    }

    public function test_whether_deleting_news_article_works() {
        $this->browse(function($first, $second) {
                $first->visit('/panel')
                      ->clickLink('Delete')
                      ->assertSee('Are you sure you want to delete this news article?')
                      ->click('@dont-delete')
                      ->assertPathBeginsWith('/panel')
                      ->assertSee("Edited")
                      ->assertSee("Edited Test");
        });

        $this->browse(function($first, $second) {
            $first->visit('/panel')
                  ->clickLink('Delete')
                  ->assertSee('Are you sure you want to delete this news article?')
                  ->click('@delete')
                  ->assertPathBeginsWith('/panel')
                  ->pause(1000)
                  ->assertDontSee("Edited")
                  ->assertDontSee("Edited Test");
        });
    }

}
