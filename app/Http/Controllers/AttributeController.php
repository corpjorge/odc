<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class AttributeController extends Controller
{
    //
    public function index(){
        return $this->getAttributes();
    }
    private function getAttributes(){
        return DB::table('car_swtcattr')
        ->select(DB::raw('swtcattr_code_attr as code,
        SWTCATTR_NAME_ATTR as name,
        DBMS_LOB.substr(SWTCATTR_DESC_ATTR) as description,
        SWTCATTR_NAME_COLOR as css'))
        ->distinct()
        ->join('car_view_swvattr',function($join){
            $join->on('swtcattr_code_attr','=','swvattr_attr_code');
        })
        ->join('car_view_swvcofe',function($join){
            $join->on('swvattr_term_code','=','swvcofe_term_code')
            ->on('swvcofe_nrc','=','swvattr_nrc');
        })
        ->get();
    }
}
