<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Models\AccountServer\AccountLogin;

class PanelTest extends DuskTestCase
{

    use DatabaseMigrations;

    public function test_whether_panel_is_not_accessible_to_normal_users() {
        $this->browse(function($first, $second){
            $first->loginAs(AccountLogin::find(73))
                  ->visit('/panel')
                  ->assertSee('Sorry, the page you are looking for could not be found.');
        });
    }
    public function test_whether_panel_is_accessible_to_admins() {
        $this->browse(function($first, $second) {
            $first->loginAs(AccountLogin::find(44))
                  ->visit('/panel')
                  ->assertDontSee('Sorry, the page you are looking for could not be found.')
                  ->assertSee('Panel')
                  ->assertSee('News')
                  ->assertSee('Downloadss');
        });
    }
}
