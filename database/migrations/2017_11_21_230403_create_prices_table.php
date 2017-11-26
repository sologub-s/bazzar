<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prices', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->unsignedInteger('ava_id');
            $table->string('name', 2048);
            $table->unsignedInteger('ava_shop_id');
            $table->unsignedInteger('shop_id');
            $table->unsignedDecimal('price')->default(0);
            $table->string('country')->nullable();
            $table->unsignedInteger('ava_product_id');
            $table->unsignedInteger('product_id');
            $table->unsignedInteger('product_pid')->nullable();
            $table->unsignedInteger('ordering')->nullable();
            $table->string('img', 2048)->nullable();
            $table->string('href', 4092)->nullable();
            $table->longText('description')->nullable();
            $table->bigInteger('parse_time')->default(0);

            $table->unique('ava_id');
            $table->index('shop_id');
            $table->index('product_id');
            $table->index('parse_time');

            //$table->foreign('ava_shop_id')->references('ava_id')->on('shops')->onDelete('cascade');
            //$table->foreign('shop_id')->references('id')->on('shops')->onDelete('set');
            //$table->foreign('ava_product_id')->references('ava_id')->on('products')->onDelete('cascade');
            //$table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prices');
    }
}
