@extends('layouts.dashboard')

@section('content')
    @include('admin.masters._styles')

    <section class="admin-master-page">
        @if ($errors->any())
            <div class="admin-master-alert admin-master-alert--error">{{ implode(' ', $errors->all()) }}</div>
        @endif

        <article class="admin-master-panel">
            <div class="admin-master-panel-body">
                <header class="admin-master-header">
                    <div>
                        <h1>Tambah Kendaraan</h1>
                        <p>Tambahkan armada baru ke master kendaraan.</p>
                    </div>
                </header>

                <form method="POST" action="{{ route('admin.vehicles.store') }}">
                    @csrf
                    @include('admin.vehicles.partials.form')
                </form>
            </div>
        </article>
    </section>
@endsection
