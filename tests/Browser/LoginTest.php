<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Models\AccountServer\AccountLogin;

class LoginTest extends DuskTestCase
{

    public function test_whether_form_validation_works()
    {
        $this->browse(function($first, $second) {
            $first->visit('/login')
                  ->press('Log In')
                  ->assertSee('The name field is required')
                  ->assertSee('The password field is required');
        });
    }

    public function test_whether_login_works()
    {
        $this->browse(function($first, $second) {
                $first->loginAs(AccountLogin::find(44))
                      ->visit('/')
                      ->assertSee('Logout');
        });
    }

    public function test_whether_logout_works()
    {
        $this->browse(function($first, $second) {
                $first->press('Logout')
                      ->assertDontSee('Logout')
                      ->assertPathIs('/');
        });
    }
}
