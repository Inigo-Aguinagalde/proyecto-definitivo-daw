<?php

namespace App\Console;

use App\Models\InsertData;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Str;


class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {


        if (!Schema::hasTable('companias')) {
            Schema::create('companias', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('name');
            });
            $schedule->command('db:seed --class=companiasSeeder');
            $schedule->command('migrate');
        };

        if (!Schema::hasTable('bolsa')) {
            Schema::create('bolsa', function (Blueprint $table) {
                $table->uuid('id');
                $table->timestamp('created_at');
                $table->float('variacion');
                $table->float('Euros');
                $table->foreignUuid('compañia_id');
            });
            Schema::table('bolsa', function (Blueprint $table) {
                $table->foreign('compañia_id')
                    ->references('id')
                    ->on('companias')
                    ->onDelete('cascade');
            });
            $schedule->command('db:seed --class=BolsaSeeder');
        };
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
