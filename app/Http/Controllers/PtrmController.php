<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PtrmController extends Controller
{
    //
    public function index(Request $request){
        return $this->getPtrms($request);
    }

    private function getPtrms(Request $request){
        $term=$request->query('term');

        return DB::table('car_stvterm_oferta')
        ->select(DB::raw("stvterm_oferta_ptrm_code as ptrm,  
        stvterm_oferta_ptrm_desc as ptrm_name"))
        ->distinct()
        ->whereRaw("stvterm_oferta_cart_visible='S'")
        ->where('stvterm_oferta_term_code','=',$term)
        ->whereRaw("stvterm_oferta_ptrm_code <> '4'")
        ->orderBy('stvterm_oferta_ptrm_code','asc')
        ->get();

    }
}
