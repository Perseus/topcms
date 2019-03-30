<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSiteAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('site_admins', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('access_level');
            $table->integer('account_id');
            $table->timestamps();

            $table->foreign('account_id')->references('act_id')->on('account');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('site_admins');
    }
}
