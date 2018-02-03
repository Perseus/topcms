<?php

namespace Tests\Browser;

use App\Models\AccountServer\AccountLogin;
use App\Models\GameDB\Account;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\DB;

class RegisterTest extends DuskTestCase
{   


    /**
     * A function to ensure that validation of the form works
     * and the user inputs all fields before submitting.
     *
     * @return void
     */
    public function test_whether_form_validation_works()
    {
        $accountUser = factory(AccountLogin::class)->make();

        $this->browse(function (Browser $browser) use ($accountUser) {

            $browser->visit('/register')
                    ->press('Register')
                    ->assertSee('The username field is required')
                    ->assertSee('The email field is required')
                    ->assertSee('The password field is required');
        });
    }


    public function test_whether_registration_works() {
        // first create accountlogin user
        $accountUser = factory(AccountLogin::class)->make();     

        $this->browse(function (Browser $browser) use ($accountUser) {

                $browser->visit('/register')
                        ->type('username', $accountUser->name)
                        ->type('email', $accountUser->email)
                        ->type('password', $accountUser->originalPassword)
                        ->type('password_confirmation', $accountUser->originalPassword)
                        ->press('Register')
                        ->assertDontSee('The username has already been taken.')
                        ->assertDontSee('The email must be a valid email address.')
                        ->assertDontSee('Following problems were found with your registration :')
                        ->assertPathIs('/');
                       
        });

        $accountUser = AccountLogin::where('name', $accountUser->name)->first();
        $gameUser = factory(Account::class)->make(['act_id' => $accountUser->id, 'act_name' => $accountUser->name]);

        $this->assertDatabaseHas(env('DB_DATABASE').'.dbo.account_login',
        ['name' => $accountUser->name,
         'password' => $accountUser->password,
         'originalPassword' => $accountUser->originalPassword, 
         'ban' => $accountUser->ban]);

        // GameDB database tests
        $this->assertDatabaseHas(env('DB_2_DATABASE').'.dbo.account',
                                ['act_name' => $gameUser->act_name,
                                'act_id' => $accountUser->id,
                                'gm' => $gameUser->gm]);
        
    }
   
}
