<?php

namespace Tests\Feature;

use App\Models\AccountServer\AccountLogin;
use App\Models\GameDB\Account;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;

class UserTest extends TestCase
{
    /**
     * setUp
     * Begin a transaction to store all the procedures or queries being run in the testing DB
     *
     * @return void
     */
    public function setUp() {
        parent::setUp();
        DB::beginTransaction();
    }
    
    /**
     * tearDown
     * Rollback the transaction to make sure the test entries don't stay in the database.
     *
     * @return void
     */
    public function tearDown() {

        DB::rollBack();
        parent::tearDown();
    }
    /** 
     * Registration Test
     * Checks if a user registers in both the accountserver and the gamedb
     * databases successfully
     */

     public function test_if_account_is_created_in_both_databases() {
         
            // first create accountlogin user
            $accountUser = factory(AccountLogin::class)->create();

            // create the gamedb user using the accountlogin users id and account name
            $gameUser = factory(Account::class)->create(['act_id' => $accountUser->id, 'act_name' => $accountUser->name]);

            // AccountServer database tests
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
