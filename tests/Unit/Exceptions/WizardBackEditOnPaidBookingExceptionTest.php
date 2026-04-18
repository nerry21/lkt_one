<?php

namespace Tests\Unit\Exceptions;

use App\Exceptions\WizardBackEditOnPaidBookingException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Tests\TestCase;

class WizardBackEditOnPaidBookingExceptionTest extends TestCase
{
    public function test_render_returns_409_json_when_request_wants_json(): void
    {
        $exception = new WizardBackEditOnPaidBookingException(
            bookingId: 42,
            bookingCode: 'RBK-260420-ABCD',
            category: 'Regular',
        );

        $request = Request::create('/dashboard/regular-bookings/review', 'POST');
        $request->headers->set('Accept', 'application/json');

        $response = $exception->render($request);

        $this->assertSame(409, $response->getStatusCode());
        $body = json_decode($response->getContent(), true);
        $this->assertSame('wizard_back_edit_paid_blocked', $body['error']);
        $this->assertSame(42, $body['booking_id']);
        $this->assertSame('RBK-260420-ABCD', $body['booking_code']);
        $this->assertSame('Regular', $body['category']);
    }

    public function test_render_returns_redirect_back_when_request_does_not_want_json(): void
    {
        $exception = new WizardBackEditOnPaidBookingException(
            bookingId: 42,
            bookingCode: 'RBK-260420-ABCD',
            category: 'Regular',
        );

        $request = Request::create('/dashboard/regular-bookings/review', 'POST');

        $response = $exception->render($request);

        $this->assertInstanceOf(RedirectResponse::class, $response);
        $errors = session('errors');
        $this->assertNotNull($errors);
        $this->assertTrue($errors->has('wizard_back_edit_blocked'));
    }

    public function test_exception_preserves_constructor_params(): void
    {
        $exception = new WizardBackEditOnPaidBookingException(
            bookingId: 99,
            bookingCode: 'RBK-X',
            category: 'Package',
        );

        $this->assertSame(99, $exception->bookingId);
        $this->assertSame('RBK-X', $exception->bookingCode);
        $this->assertSame('Package', $exception->category);
    }
}
