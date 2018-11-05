<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/email', function () {
    $invite = App\Models\Invite::find(6);
    \App\Jobs\ProcessInviteEmails::dispatch($invite);
    $email = new \App\Mail\UserInvite($invite);
    //\Illuminate\Support\Facades\Mail::to($invite['email'])->send($email);
    return new App\Mail\UserInvite($invite);
});

Route::pattern('url', '.*');

Route::get('/{url?}', function () {
    return view('welcome');
});