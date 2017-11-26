<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->string('name')->nullable();
            $table->string('href');
            $table->unsignedInteger('city_id')->nullable();
            $table->unsignedInteger('s_id');
            $table->unsignedTinyInteger('parsed')->default(0);

            $table->string('position')->default('');
            $table->unsignedInteger('salary')->nullable();
            $table->unsignedTinyInteger('fulltime_employment')->nullable()->default(0);
            $table->unsignedTinyInteger('underemployment')->nullable()->default(0);
            $table->unsignedTinyInteger('remote')->nullable()->default(0);
            $table->unsignedTinyInteger('ready_to_realloc')->nullable()->default(0);
            $table->dateTime('birthday')->nullable();
            $table->dateTime('published_at')->nullable();

            $table->string('phone_prim')->nullable();
            $table->string('phone_sec')->nullable();
            $table->string('address')->nullable();
            $table->string('email')->nullable();
            $table->text('add_info')->nullable();
            $table->longText('raw_data')->nullable();
            $table->longText('full_page')->nullable();

            $table->longText('custom_search')->nullable();

            $table->unique('href');
            $table->unique('s_id');
            $table->foreign('city_id')->references('id')->on('cities')->onDelete('cascade');
        });
        DB::statement('ALTER TABLE profiles ADD FULLTEXT (custom_search)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
}
