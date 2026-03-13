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
                        <h1>Edit Driver</h1>
                        <p>Perbarui data driver operasional.</p>
                    </div>
                </header>

                <form method="POST" action="{{ route('admin.drivers.update', $driver->id) }}">
                    @csrf
                    @method('PUT')
                    @include('admin.drivers.partials.form', ['driver' => $driver])
                </form>
            </div>
        </article>
    </section>
@endsection
