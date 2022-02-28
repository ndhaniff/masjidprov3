<?php

namespace Database\Seeders;

use App\Models\Qariah;
use Illuminate\Database\Seeder;

class QariahTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Qariah::factory(30)->create();
    }
}
