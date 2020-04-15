<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProgramController extends Controller
{
    //
    public function index(Request $request){
        return $this->getPrograms($request);
    }
    private function getPrograms(Request $request){
        $term=$request->query('term');
        $ptrm=$request->query('ptrm');

        return DB::table('car_view_swvdpto')
        ->select(DB::raw("swvdpto_subj_code as prefix, 
        swvdpto_name_dpto as name,
        swvdpto_name_dpto as abbr"))
        ->distinct()
        ->join('car_stvterm_oferta',function($join){
            $join->on('stvterm_oferta_term_code','=','swvdpto_term_code')
            ->on('swvdpto_ptrm_code','=','stvterm_oferta_ptrm_code');
        })
        ->whereRaw("stvterm_oferta_cart_visible='S'")
        ->where('swvdpto_term_code','=',$term)
        ->where('swvdpto_ptrm_code','=',$ptrm)
        ->orderBy('swvdpto_subj_code')
        ->get();
    }
		
}
