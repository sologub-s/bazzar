<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->unsignedInteger('ava_id');
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->string('href')->nullable();
            $table->string('logo')->nullable();
            $table->unsignedTinyInteger('logo_is_fetched')->default(0);
            $table->string('tel')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->text('address')->nullable();

            $table->unique('ava_id');
            $table->unique('name');
            $table->unique('slug');
            $table->unique('href');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shops');
    }
}
