<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExperiencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->unsignedInteger('s_id');
            $table->unsignedInteger('resume_id');

            $table->string('company')->nullable();
            $table->string('location')->nullable();
            $table->string('activity')->nullable();
            $table->string('position')->nullable();

            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();

            $table->text('duty')->nullable();

            $table->unsignedTinyInteger('now')->nullable()->default(0);

            $table->unique('s_id');

            $table->foreign('resume_id')->references('s_id')->on('profiles')->onDelete('cascade');
        });
    }

    /*
{
    {
        "id":"5261986",
        "resume_id":"4299380",
        "company":"GoodZone Club  ",
        "location":"Каролина-Бугаз",
        "activity":"отельно ресторанный комплекс",
        "position":"старший официант",
        "start_date":"2017-05-01",
        "end_date":"2017-09-01",
        "duty":"контроль проведения открытия закрытия смены,помощь администратору в  работе с официантами,проведения переучета посуды и классические обязанности официанта.",
        "now":false
    }
}
    */

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('experiences');
    }
}
