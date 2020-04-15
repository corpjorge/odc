<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CampusController extends Controller
{
    //
    //
    public function index(){
        return $this->getCampus();
    }
    private function getCampus(){
        return DB::table('car_view_swvcofe')
        ->select(DB::raw('swvcofe_camp_code as code,
        swvcofe_camp_code as name'))
        ->distinct()
        ->join('car_stvterm_oferta',function($join){
            $join->on('stvterm_oferta_term_code','=','swvcofe_term_code')
            ->on('swvcofe_ptrm_code','=','stvterm_oferta_ptrm_code');
        })
        ->whereRaw("stvterm_oferta_cart_visible='S'")
        ->get();
    }
}
