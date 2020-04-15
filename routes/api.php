<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/
//'cors','api-guard'
Route::group(['middleware' => ['cors']], function () {
    Route::get('courses','CourseController@index');
    Route::get('courseDetails','CourseController@details');
    Route::get('courseSeatsAvail','CourseController@seatsAvail');
    Route::get('attributes','AttributeController@index');
    Route::get('campus','CampusController@index');
    Route::get('programs','ProgramController@index');
    Route::get('ptrms','PtrmController@index');
    Route::get('terms','TermController@index');
});