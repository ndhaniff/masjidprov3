<?php

namespace Database\Seeders;

use App\Models\Qariah;
use App\Models\QariahRelative;
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
        Qariah::factory(10)
            ->has(QariahRelative::factory()->count(rand(1, 3)), 'relatives')
            ->create();
        Qariah::factory(10)
            ->has(QariahRelative::factory()->count(rand(1, 3)), 'relatives')
            ->create();
        Qariah::factory(5)
            ->has(QariahRelative::factory()->count(rand(1, 3)), 'relatives')
            ->create();
        Qariah::factory(5)
            ->create();
    }
}
