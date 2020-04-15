<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    //
    public function index(Request $request)
    {
        try {
            $courses = $this->getCourses($request);
            foreach ($courses as $course) {
                $course->schedules = $this->getSchedule($course->term, $course->nrc);
                $course->instructors = $this->getTeachers($course->term, $course->nrc);
                $course->attr = $this->getAttributes($course->term, $course->nrc);
            }
            return response()->json($courses);
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public function details(Request $request){
        try {
            $courseDetails=$this->getCourseDetails($request);
            if($courseDetails!=null){
                $courseDetails->restr=$this->getRestrictions($courseDetails->term,$courseDetails->nrc);
                $courseDetails->coreq=$this->getCoreq($courseDetails->term,$courseDetails->class,$courseDetails->course);
                $courseDetails->prereq=$this->getPrereq($courseDetails->term,$courseDetails->nrc);
                $courseDetails->programsmaxenrol=$this->getMaxEnrol($courseDetails->term,$courseDetails->nrc,$courseDetails->ptrm);
                $courseDetails->compl=$this->getComplementaries($courseDetails->term,$courseDetails->nrc);
                $courseDetails->master=[];
            }
            return response()->json($courseDetails);
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public function seatsAvail(Request $request){
        try{
            $seatsAvail=$this->getCourseSeatsAvail($request);
            return response()->json($seatsAvail);
        } catch(Exception $e){
            return $e->getMessage();
        }
    }

    private function getCourseSeatsAvail(Request $request){
        $nrc=$_GET['nrc'];
        $term=$_GET['term'];
        $ptrm=$_GET['ptrm'];
        return DB::table('car_view_swvcofe')
        ->select('swvcofe_seats_avail as seatsAvail')
        ->join('car_stvterm_oferta',function($join){
            $join->on('stvterm_oferta_term_code','=','swvcofe_term_code')
            ->on('swvcofe_ptrm_code','=','stvterm_oferta_ptrm_code');
        })
        ->whereRaw("stvterm_oferta_cart_visible='S'")
        ->where('swvcofe_nrc','=',$nrc)
        ->where('swvcofe_term_code','=',$term)
        ->where('swvcofe_ptrm_code','=',$ptrm)
        ->first();

    }

    private function getCourses(Request $request)
    { //Info básica por curso
        $term = $request->query('term');
        $ptrm = $request->query('ptrm');
        $campus = $request->query('campus');
        $prefix = $request->query('prefix');
        $attrs = $request->query('attrs');
        $nameInput = $request->query('nameInput');
        $timeStart = $request->query('timeStart');
        $offset = $request->query('offset');
        $limit = $request->query('limit');

        $query = DB::table('car_view_swvcofe')
            ->select(DB::raw("DISTINCT(swvcofe_nrc||swvcofe_term_code) as llave
        ,swvcofe_nrc as nrc
        ,swvcofe_subj_code as class
        ,swvcofe_crse_numb as course
        ,swvcofe_seq_num as section
        ,swvcofe_credit_hrs as credits
        ,swvcofe_crse_title as title
        ,swvcofe_max_enrl as maxEnrol
        ,swvcofe_enrl as enrolled
        ,swvcofe_term_code as term
        ,swvcofe_ptrm_code as ptrm
        ,stvterm_oferta_ptrm_desc as ptrmDesc
        ,swvcofe_seats_avail as seatsAvail
        ,swvcofe_camp_code as campus
        ,null as schedules
        ,null as instructors
        ,null as attr"))
            ->join('car_stvterm_oferta', function ($join) {
                $join->on('stvterm_oferta_term_code', '=', 'swvcofe_term_code')
                    ->on('swvcofe_ptrm_code', '=', 'stvterm_oferta_ptrm_code');
            })
            ->join('car_view_swvmeet', function ($join) {
                $join->on('swvmeet_term_code', '=', 'stvterm_oferta_term_code')
                    ->on('swvmeet_nrc', '=', 'swvcofe_nrc');
            })
            ->whereRaw("stvterm_oferta_cart_visible='S'");
        if ($term !== null && $term !== "") {
            $query->where('swvcofe_term_code', '=', $term);
        }
        if ($ptrm !== null && $ptrm !== "") {
            $query->where('swvcofe_ptrm_code', '=', $ptrm);
        }
        if ($campus !== null && $campus !== "") {
            $query->where('swvcofe_camp_code', '=', $campus);
        }
        if ($prefix !== null && $prefix !== "") {
            $query->where('swvcofe_subj_code', '=', $prefix);
        }
        if ($attrs !== null && $attrs !== "") { //Filtro por atributos
            $attrCont = sizeof(explode(',', $attrs));
            $query->whereRaw("(swvcofe_nrc,$attrCont) in (
				SELECT swvattr_nrc,count(swvattr_attr_code) 
				FROM car_view_swvattr
				WHERE swvattr_nrc = swvcofe_nrc
				AND swvattr_term_code=swvcofe_term_code
				AND swvattr_attr_code in ('$attrs')
				GROUP BY swvattr_nrc )");
        }
        if ($nameInput !== null && $nameInput !== "") { //Filtro por nombre, nrc o código del curso
            $query->whereRaw("swvcofe_nrc||''||SWVCOFE_SUBJ_CODE||''||SWVCOFE_CRSE_NUMB||''||SWVCOFE_CRSE_TITLE like '%" . $nameInput . "%'");
        }
        if ($timeStart !== null && $timeStart !== "") {
            $query->whereRaw("swvmeet_begin_time='" . $timeStart . "'");
        }
        $query->orderBy('swvcofe_subj_code', 'asc');
        $query->orderBy('swvcofe_crse_numb', 'asc');
        $query->orderBy('swvcofe_seq_num', 'asc');
        if (($offset !== null && $offset !== "") &&  //Cantidad de registros entre límite inferior y superior
            ($limit !== null && $limit !== "")
        ) {
            $query->offset($offset)
                ->limit($limit);
        }

        return $query->get();
    }

    private function getCourseDetails(Request $request){
        $term=$request->query('term');
        $ptrm=$request->query('ptrm');
        $nrc=$request->query('nrc');
    
        return DB::table('car_view_swvcofe')
        ->select(DB::raw("swvcofe_nrc as nrc 
        ,swvcofe_term_code as term 
        ,swvcofe_ptrm_code as ptrm
        ,swvcofe_subj_code as class
        ,swvcofe_crse_numb as course 
        ,null as compl
        ,null as master
        ,null as restr
        ,null as coreq
        ,null as prereq
        ,null as programsmaxenrol"))
        ->join('car_stvterm_oferta ',function($join){
            $join->on('stvterm_oferta_term_code','=','swvcofe_term_code')
            ->on('stvterm_oferta_ptrm_code','=','swvcofe_ptrm_code');
        })
        ->whereRaw("stvterm_oferta_cart_visible='S'")
        ->where('swvcofe_nrc','=',$nrc)
        ->where('swvcofe_ptrm_code','=',$ptrm)
        ->where('swvcofe_term_code','=',$term)
        ->first();
    }

    private function getSchedule($term, $nrc)
    { //Carga franjas

        return DB::table('car_view_swvmeet')
            ->select(DB::raw("swvmeet_begin_time as time_ini
                     ,swvmeet_end_time as time_fin
                     ,swvmeet_room_code as classroom
                     ,swvmeet_mon_day as L
                     ,swvmeet_tue_day as M
                     ,swvmeet_wed_day as I
                     ,swvmeet_thu_day as J
                     ,swvmeet_fri_day as V
                     ,swvmeet_sat_day as S
                     ,swvmeet_sun_day as D
                     ,swvmeet_start_date as date_ini
                     ,swvmeet_end_date as date_fin
                     ,swvmeet_bldg_desc as building
                     ,swvmeet_order_day as patron"))
            ->where('swvmeet_term_code', '=', $term)
            ->where('swvmeet_nrc', '=', $nrc)
            ->distinct()
            ->orderBy('swvmeet_start_date','asc')
            ->orderBy('swvmeet_order_day','asc')
            ->orderBy('swvmeet_begin_time','asc')
            ->get();
    }

    private function getTeachers($term, $nrc)
    { //Carga instructores
        return DB::table('car_view_swvprof')
            ->select('swvprof_nombre as name', 'swvprof_ind_princ as ind')
            ->where('swvprof_term_code', '=', $term)
            ->where('swvprof_nrc', '=', $nrc)
            ->get();
    }

    private function getAttributes($term, $nrc)
    { //Carga atributos por nrc

        return DB::table('car_view_swvattr')
            ->select('swvattr_attr_code as code')
            ->where('swvattr_term_code', '=', $term)
            ->where('swvattr_nrc', '=', $nrc)
            ->groupBy('swvattr_attr_code')
            ->get();
    }

    private function getRestrictions($term, $nrc)
    { //Carga restricciones

        $restrictions = DB::table('car_view_swvrest ')
            ->select(DB::raw("swvrest_tipo_rest,swvrest_rec_type, 
            swvrest_ind, 
            swvrest_desc_rest"))
            ->where('swvrest_term_code', '=', $term)
            ->where('swvrest_nrc', '=', $nrc)
            ->get();
        $restr = null;
        $restr_arr = [];
        foreach ($restrictions as $restriction) {
            if ($restriction->swvrest_rec_type == 1) {
                if (!is_null($restr)) {
                    array_push($restr_arr, $restr);
                }
                if ($restriction->swvrest_ind == 'I') {
                    $restriction->swvrest_ind = 'INCLUYE(SOLO)';
                } else if ($restriction->swvrest_ind == 'E') {
                    $restriction->swvrest_ind = 'EXCLUYE';
                }
                $restr = [
                    "type" => $restriction->swvrest_tipo_rest,
                    "ind" => utf8_encode($restriction->swvrest_ind),
                    "desc" => array()
                ];
            } else {
                if (!is_null($restr["desc"])) {
                    array_push($restr["desc"], $restriction->swvrest_desc_rest);
                }
            }
        }
        if (!is_null($restr)) array_push($restr_arr, $restr);

        return $restr_arr;
    }

    private function getCoreq($term, $subject, $number)
    { //Carga correquisitos

        return DB::table('car_view_swvcorr')
            ->select(DB::raw("swvcorr_subj_code_comp as subject, 
            swvcorr_crse_numb_comp as coursenumber, 
            swvcorr_name_crse_comp as title"))
            ->where('swvcorr_term_code', '=', $term)
            ->where('swvcorr_subj_code_mag', '=', $subject)
            ->where('swvcorr_crse_numb_mag', '=', $number)
            ->get();
    }

    private function getPrereq($term, $nrc)
    { //Carga prerrequisitos
        return DB::table('car_view_syvpreqp')
            ->select(DB::raw("syvpreqp_subj_crse_prerrq as code, 
            syvpreqp_subj_crse_prerrq_desc as descr"))
            ->where('syvpreqp_crn', '=', $nrc)
            ->where('syvpreqp_term_code', '=', $term)
            ->get();
    }

    private function getMaxEnrol($term, $nrc, $ptrm)
    { //Carga cupo por programa
        return DB::table('car_view_swvresv')
            ->select(DB::raw("swtresv_crn as nrc, 
            swtresv_program as program, 
            swtresv_max_enrl as maxEnrol, 
            swtresv_enrl as enrolled, 
            swtresv_seats_avail as seatsAvail"))
            ->where('swtresv_crn', '=', $nrc)
            ->where('swvresv_term_code', '=', $term)
            ->where('swtresv_ptrm_code', '=', $ptrm)
            ->get();
    }

    private function getComplementaries($term,$nrc){//Carga complementarias
            $courses=DB::table('car_view_swvcompl')
            ->select(DB::raw("swvcompl_nrc_compl as nrc,
            swvcofe_subj_code as class,
            swvcofe_crse_numb as course,
            swvcompl_secc_compl as section,
            swvcofe_credit_hrs as credits, 
            swvcompl_title_compl as title, 
            swvcofe_max_enrl as maxEnrol,
            swvcofe_enrl as enrolled,
            swvcofe_seats_avail as seatsAvail,
            swvcofe_ptrm_code as ptrm, 
            swvcofe_camp_code as campus, 
            swvcofe_term_code as term,
            null as schedules,
            null as instructors,
            '' as ptrmdesc,
            null as compl,
            null as attr,
            null as restr,
            null as coreq,
            null as prereq,
            null as master,
            null as programsMaxEnrol"))
            ->join('car_view_swvcofe',function($join){
                $join->on('swvcofe_nrc','=','swvcompl_nrc_compl')
                ->on('swvcofe_term_code','=','swvcompl_term_code');
            })
            ->where('swvcompl_term_code','=',$term)
            ->where('swvcompl_nrc_mag','=',$nrc)
            ->get();
            
            foreach($courses as $course){
                $course->schedules=$this->getSchedule($term,$course->nrc);
                $course->instructors=$this->getTeachers($term,$course->nrc);
                $course->compl=[];
                $course->attr=$this->getAttributes($term,$course->nrc);
                $course->restr=[];
                $course->coreq=[];
                $course->prereq=[];
                $course->master=[];
                $course->programsMaxEnrol=[];
            }
            return $courses;
    }
}
