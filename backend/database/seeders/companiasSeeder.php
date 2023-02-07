<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;



class companiasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('companias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'INDITEX',
        ]);

        DB::table('companias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'SANTANDER',
        ]);

        DB::table('companias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'BBVA',
        ]);

        DB::table('companias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'NATURGY',
        ]);

        DB::table('companias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'CELLNEX',
        ]);

        DB::table('companias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'CAIXABANK',
        ]);

        DB::table('companias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'TELEFONICA',
        ]);

        DB::table('companias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'REPSOL',
        ]);

        DB::table('companias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'FERROVIAL',
        ]);

        DB::table('companias')->insert([
            'id' => Str::uuid()->toString(),
            'name' => 'IBERDROLA',
        ]);
    }
}
