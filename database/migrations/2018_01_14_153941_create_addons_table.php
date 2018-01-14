<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAddonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addons', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            //$table->engine = 'MyISAM';
            $table->unsignedInteger('product_id')->nullable();
            $table->unique('product_id');

            $table->longText('properties_json')->nullable();
            $table->longText('description')->nullable();
            $table->longText('images_json')->nullable();

            $table->longText('prices_json')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('addons');
    }
}
