<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TermController extends Controller
{
    //
    public function index(){
        return $this->getTerms();
    }
    private function getTerms(){
        return DB::table('car_stvterm_oferta')
        ->select(DB::raw("stvterm_oferta_term_code as term_desc,
         stvterm_oferta_term_desc as term_name"))
        ->distinct()
        ->whereRaw("stvterm_oferta_cart_visible='S'")
        ->orderBy('stvterm_oferta_term_code','asc')
        ->get();
    }
}
