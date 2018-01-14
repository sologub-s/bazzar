<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->unsignedInteger('ava_id');
            $table->string('name');
            $table->string('slug');
            $table->unsignedInteger('parent_id')->nullable()->default(0);
            $table->unsignedTinyInteger('active')->default(1);
            $table->unsignedTinyInteger('broken')->default(0);
            $table->longText('terms')->nullable();
            $table->string('img')->nullable();

            $table->unique('ava_id');
            $table->index('parent_id');
            $table->index('active');
            $table->index('broken');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
}
