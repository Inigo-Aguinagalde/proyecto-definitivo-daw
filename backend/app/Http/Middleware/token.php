<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class token
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
       try{
        JWTAuth::parseToken()->authenticate();
       }catch(Exception $e){
            if($e instanceof TokenInvalidException){

                return response()->json(['status'=>'invalid token']);
            }

            if($e instanceof TokenExpiredException){
                return response()->json(['status'=>'token expired']);
            }

            return response()->json(['status'=>'token not found']);
       }
       return $next($request);
    }
}
