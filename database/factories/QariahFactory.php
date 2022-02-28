<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class QariahFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $age = rand(10, 60);

        return [
            'new_ic' => $this->faker->myKadNumber(),
            'name' => $this->faker->name(),
            'address' => $this->faker->townState(),
            'tel' => $this->faker->mobileNumber(),
            'dob' => $this->faker->date('Y-m-d', now()->subYear($age)),
            'sex' => rand(1, 2),
            'nationality' => 1,
            'population' => 1,
            'ethnic' => 1,
            'marital' => json_encode(array(
                'level' => 1,
                'wife_count' => 1,
                'dependance_count' => 0,
                'child_count' => 0,
            ), true, JSON_UNESCAPED_SLASHES),
            "health" => json_encode(array(
                'physical' => 1,
                'disability_type' => '',
                'other_disability_type' => '',
                'diseases_type' => '',
                'other_diseases_type' => '',
            ), true, JSON_UNESCAPED_SLASHES),
            "education" => json_encode(array(
                'level' => 4,
                'major' => 'Sains Komputer',
                'certificate' => 7,
                'place_of_study' => 1,
            ), true, JSON_UNESCAPED_SLASHES),
            "occupation" => json_encode(array(
                'income' => 7,
                'sector' => 2,
                'status' => 1,
                'occupation' => 'Pengaturcara',
                'title' => 'Senior',
                'business_occupation' => 'Keliwon',
                'previous_sector' => '',
                'employees_name_and_address' => 'Togl sdn bhd',
                'sideincome' => '',
                'other_sideincome' => ''
            ), true, JSON_UNESCAPED_SLASHES),
            "home_ownership" => json_encode(array(
                'level' => 1,
                'structure' => 1,
                'land_status' => 1,
                'other_owned_level' => 1,
                'other_supply' => 7,
                'vehicle_type' => 1,
                'water_supply' => 1,
                'electric_supply' => 1,
            ), true, JSON_UNESCAPED_SLASHES),
            "others" => json_encode(array(
                'vehicle' =>
                array(
                    1 => rand(0, 1),
                    2 => 0,
                    3 => 0,
                    4 => 0,
                    5 => 0,
                    6 => 0,
                    7 => 0,
                ),
                'investment_type' => 1,
                'other_investment_type' => '0',
                'is_helped' => 'false',
                'help_type' => '',
                'other_help_type' => '',
                'livestock' => '',
            ), true, JSON_UNESCAPED_SLASHES),
        ];
    }
}
