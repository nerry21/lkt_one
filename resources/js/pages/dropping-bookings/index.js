/**
 * Dropping Bookings — Information Page
 *
 * Handles real-time total estimation updates when the user
 * changes the fare amount or additional fare fields.
 */

function formatCurrency(amount) {
    if (!amount || amount <= 0) return '';
    return 'Rp ' + Math.floor(amount).toLocaleString('id-ID');
}


export default function initDroppingBookingsPage() {
    const fareInput          = document.querySelector('[data-fare-input]');
    const additionalFareInput= document.querySelector('[data-additional-fare-input]');
    const estimatedTotalInput= document.querySelector('[data-estimated-total-input]');

    function updateTotal() {
        const fare       = parseInt(fareInput?.value || '0', 10) || 0;
        const additional = parseInt(additionalFareInput?.value || '0', 10) || 0;
        const total      = fare + additional;

        if (estimatedTotalInput) {
            estimatedTotalInput.value = formatCurrency(total);
        }
    }

    fareInput?.addEventListener('input', updateTotal);
    additionalFareInput?.addEventListener('input', updateTotal);

    // Sync radio card selected states on change
    document.querySelectorAll('.regular-booking-radio input[type="radio"]').forEach((radio) => {
        radio.addEventListener('change', () => {
            const group = document.querySelectorAll(`.regular-booking-radio input[name="${radio.name}"]`);
            group.forEach((r) => {
                r.closest('.regular-booking-radio')?.classList.toggle('is-selected', r.checked);
            });
        });
    });
}
