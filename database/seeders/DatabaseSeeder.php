<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'email' => 'admin@promasjid.com',
            'password' => bcrypt('aaaaaa'),
            'name' => 'Bunohan'
        ]);

        $this->call([
            QariahTableSeeder::class
        ]);
    }
}
