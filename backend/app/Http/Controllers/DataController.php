<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\DataResource;

use App\Models\InsertData;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DataController extends Controller
{


    public function crearDatos(Request $request)
    {

        $model = new InsertData();
    

        $model->getData($request->timeunit, $request->until);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $model = new InsertData();
        $model->getData(null, null);


        $companiaIDs = DB::table('companias')->get();
        $companiaIDs = json_decode(json_encode($companiaIDs), true);
        $datos = array();
        foreach ($companiaIDs as $element) {
        

            $datos[$element['name']] = DB::table('bolsa')->where('compañia_id', $element['id'])->latest()->first();
        }

        return DataResource::collection($datos);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\InsertData  $insertData
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {

        $name = strtoupper($request->name);
        $company = json_decode(json_encode(DB::table('companias')->where('name', '=', $name)->get()));
        if (isset($request->from)) {
            $from = $request->from;
        } else {
            $from = Carbon::now();
        }

        if (isset($request->to)) {
            $to = $request->to;
        } else {
            $to = Carbon::now();
        }

        $from = Carbon::parse($from);
        $to = Carbon::parse($to);

        if($to->eq($from)){
            $bolsa = InsertData::select('*')->where('compañia_id', $company[0]->id,)->whereDate('created_at', $to)->get();
                    
        } else{
            $to->addDay();
            error_log($to);
            $bolsa = InsertData::select('*')->where('compañia_id', $company[0]->id)->whereBetween('created_at', [$from, $to])->get();
        }
         
        return DataResource::collection($bolsa);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\InsertData  $insertData
     * @return \Illuminate\Http\Response
     */
    public function edit(InsertData $insertData)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\InsertData  $insertData
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InsertData $insertData)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\InsertData  $insertData
     * @return \Illuminate\Http\Response
     */
    public function destroy(InsertData $insertData)
    {
        //
    }
}
