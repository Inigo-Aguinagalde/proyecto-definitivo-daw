<?php
namespace App\Models;

use Carbon\Carbon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class InsertData extends Model
{
    use HasFactory;

    protected $table = 'bolsa';

    public function getData($timeunit, $until)
    {
 
        if ($timeunit == null) {
            $timeunit = 'minute';
        }
        if ($until == null) {
            $until = Carbon::now();
        }

        $this->generateDataWithParams($until, $timeunit);
    }

    public function __construct()
    {
       
      
    }

    public function generateDataWithParams($until, $timeunit)
    {
    
        set_time_limit(60000);

        $companiaIDs = DB::table('compañias')->pluck('id');
       
        foreach ($companiaIDs as $element) {
        
            $maxCreatedAt = DB::table('bolsa')->where('compañia_id', $element)->max('created_at');
            
            $datos =  DB::table('bolsa')->where([['compañia_id', $element], ['created_at', $maxCreatedAt]])->first();
          
            $maxCreatedAt = Carbon::parse($maxCreatedAt);
           

            $euro = $datos->Euros;
            
           $dt = $this->addToDate($maxCreatedAt, $timeunit);

            while ($until > $dt) {

                if ($dt->isWeekday() && ($dt->hour  < '17' && $dt->hour >= '9')) {

                    $rand = (rand(-10, 10));
                    $randomVariation = (rand(-500, 500) / 10000) * 5;
                    $variacion = round($randomVariation, 2);
                    $variacion = $variacion + $rand;
                    $euro = round($euro + ($euro * $variacion)/100, 2);
                    if($euro<0.5){
                        $euro = rand(5, 10);
                    }
                    $variacion = round($variacion,2);
                    $euro = round($euro,2);
                    DB::table('bolsa')->insert([
                        'id' => Str::uuid()->toString(),
                        'created_at' =>  $dt,
                        'variacion' => $variacion,
                        'Euros' => $euro,
                        'compañia_id' => $element,
                    ]);
                }
                $dt = $this->addToDate($dt, $timeunit);
            }
        }
    }

    public function addToDate($dt, $timeunit)
    {

        switch ($timeunit) {
            case "day":
                return $dt->addDay();
                break;
            case "hour":
                return $dt->addHour();
                break;
        }

        return $dt->addMinute();
    }
}