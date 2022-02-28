<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQariahRelativesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('qariah_relatives', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('qariah_id');
            $table->string('full_name');
            $table->string('old_ic')->nullable();
            $table->string('new_ic')->nullable();
            $table->integer('sex');
            $table->integer('age');
            $table->string('physical');
            $table->string('relationship');
            $table->string('education');
            $table->string('occupation');
            $table->string('income');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('qariah_id')->references('id')->on('qariahs');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('qariah_relatives');
    }
}
