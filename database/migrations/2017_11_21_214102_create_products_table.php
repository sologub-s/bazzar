<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            //$table->engine = 'MyISAM';

            $table->unsignedInteger('ava_id');
            $table->char('name', 191);
            $table->char('slug', 191);

            $table->unsignedInteger('parent_id');
            $table->unsignedInteger('category_id')->nullable();
            $table->unsignedInteger('brand_id')->nullable();
            $table->char('img', 191)->nullable();
            $table->unsignedTinyInteger('parsed')->default(0);
            /*
            $table->longText('properties_json')->nullable();
            $table->longText('description')->nullable();
            $table->longText('images_json')->nullable();
            */
            $table->unsignedTinyInteger('active')->default(1);
            $table->unsignedTinyInteger('in_stock')->default(1);
            /*
            $table->longText('prices_json')->nullable();
            */
            $table->unsignedDecimal('price_min')->default(0);
            $table->unsignedDecimal('price_max')->default(0);
            $table->unsignedDecimal('broken')->default(0);
            $table->unsignedTinyInteger('has_ava_img')->default(0);

            $table->unique('ava_id');
            $table->index('name');
            $table->index('created_at');
            $table->index('slug');
            $table->index('category_id');
            $table->index('brand_id');
            $table->index('parsed');
            $table->index('active');
            $table->index('in_stock');
            $table->index('price_min');
            $table->index('price_max');
            $table->index('broken');
            $table->index('has_ava_img');

            //$table->foreign('parent_id')->references('ava_id')->on('categories')->onDelete('cascade');
            /*
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('set null');
            */
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
