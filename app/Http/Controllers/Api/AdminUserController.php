<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminUser\StoreAdminUserRequest;
use App\Http\Requests\AdminUser\UpdateAdminUserRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AdminUserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $page = max(1, (int) $request->query('page', 1));
        $limit = max(1, (int) $request->query('limit', 10));
        $actor = $this->actor($request);

        $items = $this->filteredQuery($request)
            ->orderByRaw("case role when 'Super Admin' then 0 when 'Admin' then 1 else 2 end")
            ->orderBy('nama')
            ->forPage($page, $limit)
            ->get()
            ->map(fn (User $user) => $this->payload($user, $actor))
            ->values();

        return response()->json($items);
    }

    public function count(Request $request): JsonResponse
    {
        return response()->json([
            'count' => $this->filteredQuery($request)->count(),
        ]);
    }

    public function show(Request $request, string $adminUser): JsonResponse
    {
        $actor = $this->actor($request);

        return response()->json($this->payload($this->findUser($adminUser), $actor));
    }

    public function store(StoreAdminUserRequest $request): JsonResponse
    {
        $actor = $this->actor($request);
        $validated = $request->validated();

        $this->ensureCanAssignRole($actor, $validated['role']);

        $user = User::query()->create([
            'nama' => trim($validated['nama']),
            'username' => $validated['username'],
            'email' => trim($validated['email']),
            'password' => $validated['password'],
            'role' => $validated['role'],
        ]);

        return response()->json($this->payload($user->fresh(), $actor), 201);
    }

    public function update(UpdateAdminUserRequest $request, string $adminUser): JsonResponse
    {
        $actor = $this->actor($request);
        $item = $this->findUser($adminUser);
        $validated = $request->validated();

        $this->ensureCanManageTarget($actor, $item);
        $this->ensureCanAssignRole($actor, $validated['role']);

        if ($item->isSuperAdmin() && $validated['role'] !== 'Super Admin' && $this->superAdminCount() <= 1) {
            throw new HttpException(422, 'Minimal harus ada satu akun Super Admin.');
        }

        $item->fill([
            'nama' => trim($validated['nama']),
            'username' => $validated['username'],
            'email' => trim($validated['email']),
            'role' => $validated['role'],
        ]);

        if (filled($validated['password'] ?? null)) {
            $item->password = $validated['password'];
        }

        $item->save();

        return response()->json($this->payload($item->fresh(), $actor));
    }

    public function destroy(Request $request, string $adminUser): JsonResponse
    {
        $actor = $this->actor($request);
        $item = $this->findUser($adminUser);

        if ($actor->id === $item->id) {
            throw new HttpException(422, 'Akun yang sedang login tidak bisa dihapus.');
        }

        $this->ensureCanManageTarget($actor, $item);

        if ($item->isSuperAdmin() && $this->superAdminCount() <= 1) {
            throw new HttpException(422, 'Minimal harus ada satu akun Super Admin.');
        }

        $item->delete();

        return response()->json(['message' => 'Akun berhasil dihapus']);
    }

    protected function actor(Request $request): User
    {
        $user = $request->user();

        if (! $user instanceof User) {
            throw new HttpException(403, 'Akses ditolak');
        }

        return $user;
    }

    protected function filteredQuery(Request $request): Builder
    {
        $search = trim((string) $request->query('search', ''));

        return User::query()->when($search !== '', function (Builder $query) use ($search) {
            $query->where(function (Builder $subQuery) use ($search) {
                $subQuery
                    ->where('nama', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('role', 'like', "%{$search}%");
            });
        });
    }

    protected function findUser(string $id): User
    {
        $user = User::query()->find($id);

        if (! $user) {
            throw new HttpException(404, 'Akun tidak ditemukan');
        }

        return $user;
    }

    protected function ensureCanAssignRole(User $actor, string $role): void
    {
        if ($role === 'Super Admin' && ! $actor->isSuperAdmin()) {
            throw new HttpException(403, 'Hanya Super Admin yang dapat menetapkan role Super Admin.');
        }
    }

    protected function ensureCanManageTarget(User $actor, User $target): void
    {
        if ($target->isSuperAdmin() && ! $actor->isSuperAdmin()) {
            throw new HttpException(403, 'Hanya Super Admin yang dapat mengelola akun Super Admin.');
        }
    }

    protected function superAdminCount(): int
    {
        return User::query()->where('role', 'Super Admin')->count();
    }

    protected function canManage(User $actor, User $target): bool
    {
        if ($target->isSuperAdmin() && ! $actor->isSuperAdmin()) {
            return false;
        }

        return $actor->isAdmin();
    }

    protected function canDelete(User $actor, User $target): bool
    {
        if (! $this->canManage($actor, $target)) {
            return false;
        }

        if ($actor->id === $target->id) {
            return false;
        }

        if ($target->isSuperAdmin() && $this->superAdminCount() <= 1) {
            return false;
        }

        return true;
    }

    protected function payload(User $user, User $actor): array
    {
        return [
            'id' => $user->id,
            'nama' => $user->nama,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role,
            'password_mask' => '********',
            'password_note' => 'Password disimpan terenkripsi dan tidak dapat ditampilkan kembali.',
            'created_at' => optional($user->created_at)?->toISOString(),
            'is_current_user' => $actor->id === $user->id,
            'can_edit' => $this->canManage($actor, $user),
            'can_delete' => $this->canDelete($actor, $user),
        ];
    }
}
