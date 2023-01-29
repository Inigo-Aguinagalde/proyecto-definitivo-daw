<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;



class compañiasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('compañias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'INDITEX',
        ]);

        DB::table('compañias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'SANTANDER',
        ]);

        DB::table('compañias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'BBVA',
        ]);

        DB::table('compañias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'NATURGY',
        ]);

        DB::table('compañias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'CELLNEX',
        ]);

        DB::table('compañias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'CAIXABANK',
        ]);

        DB::table('compañias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'TELEFONICA',
        ]);

        DB::table('compañias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'REPSOL',
        ]);

        DB::table('compañias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'FERROVIAL',
        ]);

        DB::table('compañias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'IBERDROLA',
        ]);
    }
}
