<section class="regular-booking-stepper" aria-label="Tahapan pemesanan dropping">
    @foreach ($steps as $step)
        <article class="regular-booking-step is-{{ $step['status'] }}">
            <span class="regular-booking-step-number" aria-hidden="true">
                {{ str_pad((string) $step['number'], 2, '0', STR_PAD_LEFT) }}
            </span>

            <div class="regular-booking-step-copy">
                <h2>{{ $step['title'] }}</h2>
                <p>{{ $step['description'] }}</p>
            </div>
        </article>
    @endforeach
</section>
