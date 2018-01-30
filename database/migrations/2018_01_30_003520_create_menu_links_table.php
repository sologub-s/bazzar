<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMenulinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_links', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->char('name', 200)->nullable();
            $table->string('href')->nullable();
            $table->char('target', 30)->nullable();
            $table->unsignedInteger('parent_id')->nullable();
            $table->integer('order')->nullable();
            $table->boolean('active')->default(true);

            $table->enum('custom_type', ['main', 'catalogue', 'blog', 'contacts',])->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menu_links');
    }
}
