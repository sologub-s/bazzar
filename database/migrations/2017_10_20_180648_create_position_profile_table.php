<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePositionProfileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('position_profile', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('position_id')->unsigned()->nullable();
            $table->foreign('position_id')->references('id')
                ->on('positions')->onDelete('cascade');

            $table->integer('profile_id')->unsigned()->nullable();
            $table->foreign('profile_id')->references('id')
                ->on('profiles')->onDelete('cascade');

            $table->unique(['position_id', 'profile_id',]);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('position_profile');
    }
}
