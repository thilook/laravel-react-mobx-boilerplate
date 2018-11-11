<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateUserAPIRequest;
use App\Http\Requests\API\UpdateUserAPIRequest;
use App\Jobs\ProcessInviteEmails;
use App\Models\Invite;
use App\Models\User;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Spatie\Permission\Models\Role;
use App\Mail\UserInvite;
use Response;

/**
 * Class UserController
 * @package App\Http\Controllers\API
 */

class UserAPIController extends AppBaseController
{
    /** @var  UserRepository */
    private $userRepository;

    public function __construct(UserRepository $userRepo)
    {
        $this->userRepository = $userRepo;
    }

    /**
     * Display a listing of the User.
     * GET|HEAD /users
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $this->userRepository->pushCriteria(new RequestCriteria($request));
        $this->userRepository->pushCriteria(new LimitOffsetCriteria($request));
        $users = \App\User::all();
        $res = [];
        foreach ($users as $user) {
            $obj = $user;
            $obj['roles'] = $user->getRoleNames();
            array_push($res, $obj);
        }

        return $this->sendResponse($res, 'Users retrieved successfully');
    }

    /**
     * Store a newly created User in storage.
     * POST /users
     *
     * @param CreateUserAPIRequest $request
     *
     * @return Response
     */
    public function store(CreateUserAPIRequest $request)
    {
        $input = $request->all();

        $users = $this->userRepository->create($input);

        return $this->sendResponse($users->toArray(), 'User saved successfully');
    }

    /**
     * Display the specified User.
     * GET|HEAD /users/{id}
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        /** @var User $user */
        //$user = $this->userRepository->findWithoutFail($id);
        $user = \App\User::query()->findOrFail($id);

        if (empty($user)) {
            return $this->sendError('User not found');
        }
        $obj = $user;
        $obj['roles'] = $user->getRoleNames();


        return $this->sendResponse($obj->toArray(), 'User retrieved successfully');
    }

    /**
     * Update the specified User in storage.
     * PUT/PATCH /users/{id}
     *
     * @param  int $id
     * @param UpdateUserAPIRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateUserAPIRequest $request)
    {
        $input = $request->all();

        /** @var User $user */
        $user = \App\User::query()->findOrFail($id);
        if (empty($user)) {
            return $this->sendError('User not found');
        }
        $roles = [];
        foreach ($input['roles'] as $role) {
            $r = Role::findById($role['value']);
            array_push($roles, $r);
        }

        $user->syncRoles($roles);

        $user = $this->userRepository->update($input, $id);

        return $this->sendResponse($user->toArray(), 'User updated successfully');
    }

    /**
     * Remove the specified User from storage.
     * DELETE /users/{id}
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        /** @var User $user */
        $user = $this->userRepository->findWithoutFail($id);

        if (empty($user)) {
            return $this->sendError('User not found');
        }

        $user->delete();

        return $this->sendResponse($id, 'User deleted successfully');
    }


    public function sendInvite(Request $request)
    {
        $input = $request->all();

        foreach ($input['emails'] as $email) {
            $old_invite = Invite::where('email', $email)->first();
            if (empty($old_invite)) {
                $invite = new Invite();
                $invite->email = $email;
                $invite->token = str_random(32);
                $invite->expires_at =  Carbon::now()->addDays(2);
                $invite->save();
                if (empty($invite)) {
                    return $this->sendError('Wasn`t able to send invite');
                }
                ProcessInviteEmails::dispatch($invite);
            }else {
                $old_invite->expires_at = Carbon::now()->addDays(2);
                $old_invite->save();
                ProcessInviteEmails::dispatch($old_invite);
            }
        }

        return $this->sendResponse($input, 'Invites sent successfully');
    }

    public function checkInvite(Request $request) {
        $input = $request->all();
        $invite = Invite::find($input['token']);

        if (empty($invite)) {
            return $this->sendError('Wasn`t able to send invite');
        }

        return $this->sendResponse($invite->toArray(), 'Invites sent successfully');

    }


    public function listPending(Request $request) {
        $invites = Invite::where('accepted', false)->get();

        if (empty($invites)) {
            return $this->sendError('Wasn`t able to send invite');
        }

        return $this->sendResponse($invites->toArray(), 'Invites sent successfully');

    }

    public function changePassword(Request $request)
    {
        $input = $request->all();
        $user = $request->user('api');
        if (isset($input['oldPassword'])) {
            $check = Auth::guard('web')->attempt([
                'email' => $user->email,
                'password' => $input['oldPassword']
            ]);

            if ($check && isset($input['newPassword'])) {
                $user->password = bcrypt($input['newPassword']);
                $user->save();
                return $this->sendResponse($user->toArray(), 'Password changed successfully');
            }

            return $this->sendError('Wrong password');
        }
        return $this->sendError('Password not sent');
    }
}
