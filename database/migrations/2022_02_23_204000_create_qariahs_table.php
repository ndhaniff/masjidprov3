<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQariahsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('qariahs', function (Blueprint $table) {
            $table->id();
            $table->string('old_ic')->nullable();
            $table->string('new_ic');
            $table->string('name');
            $table->string('address');
            $table->string('tel')->nullable();
            $table->string('home_tel')->nullable();
            $table->string('office_tel')->nullable();
            $table->date('dob');
            $table->integer('sex');
            $table->integer('nationality');
            $table->integer('population');
            $table->integer('ethnic');
            $table->json('marital');
            $table->json('health');
            $table->json('education');
            $table->json('occupation');
            $table->json('home_ownership');
            $table->json('others');
            $table->softDeletes();
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
        Schema::dropIfExists('qariahs');
    }
}
