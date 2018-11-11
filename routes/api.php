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

Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::resource('permissions', 'PermissionAPIController');

    Route::resource('roles', 'RoleAPIController');

    Route::resource('users', 'UserAPIController');
    Route::get('users/invites', 'UserAPIController@listPending');
    Route::post('users/invite', 'UserAPIController@sendInvite');
    Route::post('users/change_password', 'UserAPIController@changePassword');
});





