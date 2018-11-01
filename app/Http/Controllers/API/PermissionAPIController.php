<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePermissionAPIRequest;
use App\Http\Requests\API\UpdatePermissionAPIRequest;
use App\Models\Permission;
use App\Repositories\PermissionRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission as PermissionFacade;
use Response;

/**
 * Class PermissionController
 * @package App\Http\Controllers\API
 */

class PermissionAPIController extends AppBaseController
{
    /** @var  PermissionRepository */
    private $permissionRepository;

    public function __construct(PermissionRepository $permissionRepo)
    {
        $this->permissionRepository = $permissionRepo;
    }

    /**
     * Display a listing of the Permission.
     * GET|HEAD /permissions
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $this->permissionRepository->pushCriteria(new RequestCriteria($request));
        $this->permissionRepository->pushCriteria(new LimitOffsetCriteria($request));
        $permissions = $this->permissionRepository->all();

        return $this->sendResponse($permissions->toArray(), 'Permissions retrieved successfully');
    }

    /**
     * Store a newly created Permission in storage.
     * POST /permissions
     *
     * @param CreatePermissionAPIRequest $request
     *
     * @return Response
     */
    public function store(CreatePermissionAPIRequest $request)
    {
        $input = $request->all();

        $permission =  PermissionFacade::create(['name' => $input['name']]);

        if (!empty( $input['roles'])) { //If one or more role is selected
            foreach ( $input['roles'] as $role) {
                $r = Role::where('id', '=', $role['value'])->firstOrFail(); //Match input role to db record

                $permission = PermissionFacade::where('name', '=', $input['name'])->first(); //Match input //permission to db record
                $r->givePermissionTo($permission);
            }
        }

        //$permissions = $this->permissionRepository->create($input);

        return $this->sendResponse($permission->toArray(), 'Permission saved successfully');
    }

    /**
     * Display the specified Permission.
     * GET|HEAD /permissions/{id}
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        /** @var Permission $permission */
        $permission = $this->permissionRepository->findWithoutFail($id);

        if (empty($permission)) {
            return $this->sendError('Permission not found');
        }

        return $this->sendResponse($permission->toArray(), 'Permission retrieved successfully');
    }

    /**
     * Update the specified Permission in storage.
     * PUT/PATCH /permissions/{id}
     *
     * @param  int $id
     * @param UpdatePermissionAPIRequest $request
     *
     * @return Response
     */
    public function update($id, UpdatePermissionAPIRequest $request)
    {
        $input = $request->all();

        /** @var Permission $permission */
        $permission = $this->permissionRepository->findWithoutFail($id);

        if (empty($permission)) {
            return $this->sendError('Permission not found');
        }

        $permission = $this->permissionRepository->update($input, $id);

        return $this->sendResponse($permission->toArray(), 'Permission updated successfully');
    }

    /**
     * Remove the specified Permission from storage.
     * DELETE /permissions/{id}
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        /** @var Permission $permission */

        $permission = PermissionFacade::findOrFail($id);

        if (empty($permission)) {
            return $this->sendError('Permission not found');
        }

        //Make it impossible to delete this specific permission
        if ($permission->name == "Administer roles & permissions") {
            return $this->sendError('Permission not found');
        }

        $permission->delete();

        return $this->sendResponse($id, 'Permission deleted successfully');

//        return redirect()->route('permissions.index')
//            ->with('flash_message',
//                'Permission deleted!');
//
//        $permission = $this->permissionRepository->findWithoutFail($id);
//
//        if (empty($permission)) {
//            return $this->sendError('Permission not found');
//        }
//
//        $permission->delete();
//
//        return $this->sendResponse($id, 'Permission deleted successfully');
    }
}
