<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BolsaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = DB::table('compañias')->where('name', '=', 'INDITEX')->get();


        DB::table('bolsa')->insert([
            'id' => Str::uuid()->toString(),
            'variacion' => 0.46,
            'Euros' => 28.53,
            'created_at' => '2022-01-03 09:00:00',
            'compañia_id' => $user[0]->id,
        ]);

        $user = DB::table('compañias')->where('name', '=', 'SANTANDER')->get();


        DB::table('bolsa')->insert([
            'id' => Str::uuid()->toString(),
            'variacion' => 0.41,
            'created_at' => '2022-01-03 09:00:00',
            'Euros' => 2.77,
            'compañia_id' => $user[0]->id,
        ]);

        $user = DB::table('compañias')->where('name', '=', 'BBVA')->get();


        DB::table('bolsa')->insert([
            'id' => Str::uuid()->toString(),
            'variacion' => -0.30,
            'created_at' => '2022-01-03 09:00:00',
            'Euros' => 5.26,
            'compañia_id' => $user[0]->id,
        ]);

        $user = DB::table('compañias')->where('name', '=', 'NATURGY')->get();


        DB::table('bolsa')->insert([
            'id' => Str::uuid()->toString(),
            'variacion' => 0.29,
            'created_at' => '2022-01-03 09:00:00',
            'Euros' => 27.15,
            'compañia_id' => $user[0]->id,
        ]);

        $user = DB::table('compañias')->where('name', '=', 'CELLNEX')->get();


        DB::table('bolsa')->insert([
            'id' => Str::uuid()->toString(),
            'variacion' => 2.13,
            'created_at' => '2022-01-03 09:00:00',
            'Euros' => 33.33,
            'compañia_id' => $user[0]->id,
        ]);

        $user = DB::table('compañias')->where('name', '=', 'CAIXABANK')->get();


        DB::table('bolsa')->insert([
            'id' => Str::uuid()->toString(),
            'variacion' => -0.12,
            'created_at' => '2022-01-03 09:00:00',
            'Euros' => 2.41,
            'compañia_id' => $user[0]->id,
        ]);

        $user = DB::table('compañias')->where('name', '=', 'TELEFÓNICA')->get();


        DB::table('bolsa')->insert([
            'id' => Str::uuid()->toString(),
            'variacion' => -1.61,
            'Euros' => 3.91,
            'created_at' => '2022-01-03 09:00:00',
            'compañia_id' => $user[0]->id,
        ]);

        $user = DB::table('compañias')->where('name', '=', 'REPSOL')->get();


        DB::table('bolsa')->insert([
            'id' => Str::uuid()->toString(),
            'variacion' => 2.03,
            'Euros' => 10.43,
            'created_at' => '2022-01-03 09:00:00',
            'compañia_id' => $user[0]->id,
        ]);

        $user = DB::table('compañias')->where('name', '=', 'FERROVIAL')->get();


        DB::table('bolsa')->insert([
            'id' => Str::uuid()->toString(),
            'variacion' => 0.58,
            'Euros' => 27.56,
            'created_at' => '2022-01-03 09:00:00',
            'compañia_id' => $user[0]->id,
        ]);

        $user = DB::table('compañias')->where('name', '=', 'IBERDROLA')->get();


        DB::table('bolsa')->insert([
            'id' => Str::uuid()->toString(),
            'variacion' => 0.34,
            'Euros' => 10.41,
            'created_at' => '2022-01-03 09:00:00',
            'compañia_id' => $user[0]->id,
        ]);
    }
}
    