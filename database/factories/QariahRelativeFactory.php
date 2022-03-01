<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class QariahRelativeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $age = rand(10, 65);
        $relationship = ['c', 'D', 'J', 'N', 'z'];
        $physical = ['S', 'U', 'T', 'C'];
        $education = ['SPM', 'SRP', 'SPMV', 'diploma', 'ijazah'];
        $sex = ['L', 'P', 'K'];

        return [
            'new_ic' => $this->faker->myKadNumber(),
            'full_name' => $this->faker->name(),
            'dob' => $this->faker->date('Y-m-d', now()->subYear($age)),
            'sex' => $sex[array_rand($sex)],
            'age' => $age,
            'occupation' => 'Faker',
            'relationship' => $relationship[array_rand($relationship)],
            'physical' => $physical[array_rand($physical)],
            'education' => $education[array_rand($education)],
            'income' => 0,
        ];
    }
}
