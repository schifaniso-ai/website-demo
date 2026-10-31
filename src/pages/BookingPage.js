import React, { useState } from 'react';
import { Navigate, Link, useNavigate, useParams } from 'react-router-dom';

import BookingDetailsStep from '../components/booking/BookingDetailsStep';
import BookingProgress from '../components/booking/BookingProgress';
import ConfirmationStep from '../components/booking/ConfirmationStep';
import CustomerStep from '../components/booking/CustomerStep';
import PaymentStep from '../components/booking/PaymentStep';
import PriceSummary from '../components/booking/PriceSummary';
import ReviewStep from '../components/booking/ReviewStep';
import { Lock } from '../components/booking/Icons';
import { getActivity } from '../data/activities';
import usePageMeta from '../hooks/usePageMeta';
import {
  createBookingReference,
  createEmptyBooking,
  clearDraft,
  getBookingWindow,
  readDraft,
  resolveBookingStep,
  writeDraft,
} from '../booking/bookingUtils';

function getInitialBooking(activityId, stepParam) {
  const saved = readDraft(activityId);

  // A new visit to the activity, rather than a refresh of the confirmation
  // screen, should start a fresh booking once the previous one is complete.
  if (saved && saved.paymentStatus === 'success' && !stepParam) {
    clearDraft(activityId);
    return createEmptyBooking(activityId);
  }

  return saved || createEmptyBooking(activityId);
}

export function BookingRoute() {
  const { activityId } = useParams();
  return <BookingPage key={activityId} />;
}

function BookingPage() {
  const { activityId, step: stepParam } = useParams();
  const navigate = useNavigate();
  const activity = getActivity(activityId);
  const requestedStep = stepParam || 'details';

  const [booking, setBooking] = useState(() =>
    getInitialBooking(activityId, stepParam)
  );

  const safeStep = resolveBookingStep(requestedStep, booking);

  const pageTitles = {
    details: activity ? `Book ${activity.title}` : 'Book an activity',
    customer: 'Customer information',
    review: 'Review your booking',
    payment: 'Payment',
    confirmation: 'Booking confirmed',
  };

  usePageMeta(
    `${pageTitles[requestedStep] || 'Booking'} | The African Carnival`,
    'Book a Victoria Falls activity with The African Carnival. A frontend demo of a secure booking and PayPal checkout flow.'
  );

  if (!activity) {
    return <Navigate to="/activities" replace />;
  }

  if (requestedStep !== safeStep) {
    return <Navigate to={`/book/${activity.id}/${safeStep}`} replace />;
  }

  const updateBooking = (patch) => {
    setBooking((previous) => {
      const next =
        typeof patch === 'function' ? patch(previous) : { ...previous, ...patch };
      writeDraft(next);
      return next;
    });
  };

  const goToStep = (step) => {
    navigate(`/book/${activity.id}/${step}`);
  };

  const handleLeave = () => {
    clearDraft(activity.id);
  };

  const handlePaymentSuccess = () => {
    const paidBooking = {
      ...booking,
      paymentStatus: 'success',
      paymentMethod: 'PayPal (Demo)',
      reference: createBookingReference(),
      paidAt: new Date().toISOString(),
    };

    writeDraft(paidBooking);
    setBooking(paidBooking);
    navigate(`/book/${activity.id}/confirmation`, { replace: true });
  };

  const { minDate, maxDate } = getBookingWindow();

  const heroContent = {
    details: {
      eyebrow: `Victoria Falls · ${activity.duration}`,
      title: (
        <>
          Book <em>{activity.title}</em>
        </>
      ),
      intro:
        'Choose your date, departure time and group size. Your total updates automatically as you plan.',
    },
    customer: {
      eyebrow: 'Your booking · Customer information',
      title: (
        <>
          Who&rsquo;s <em>travelling?</em>
        </>
      ),
      intro:
        'Tell us who the booking is for and how we can reach you if anything changes before the day.',
    },
    review: {
      eyebrow: 'Your booking · Review',
      title: (
        <>
          One last <em>look</em>.
        </>
      ),
      intro:
        'Check the activity, date and traveller details below, then continue to the demo checkout.',
    },
    payment: {
      eyebrow: 'Your booking · Payment',
      title: (
        <>
          Pay <em>securely</em>.
        </>
      ),
      intro:
        'A simulated PayPal checkout. No login, card details or real payment are required.',
    },
    confirmation: {
      eyebrow: 'The African Carnival · Confirmation',
      title: (
        <>
          You&rsquo;re <em>going</em>.
        </>
      ),
      intro:
        'Your demo payment is complete. Everything you need for the day is below.',
    },
  }[requestedStep];

  return (
    <div className="booking-page">
      <section className="booking-hero">
        <div className="wrap booking-hero-inner">
          <div className="booking-hero-top">
            <Link
              className="booking-back"
              to="/activities#activities"
              onClick={safeStep === 'confirmation' ? handleLeave : undefined}
            >
              <span aria-hidden="true">←</span> All activities
            </Link>
            <span className="secure-pill">
              <Lock size={13} /> Secure booking
            </span>
          </div>

          <div className="booking-hero-copy">
            <div className="eyebrow">{heroContent.eyebrow}</div>
            <h1>{heroContent.title}</h1>
            <p>{heroContent.intro}</p>
          </div>

          <BookingProgress
            currentStep={requestedStep}
            onNavigate={safeStep === 'confirmation' ? null : goToStep}
          />
        </div>
      </section>

      <div className={`booking-body${safeStep === 'confirmation' ? ' is-confirmation' : ''}`}>
        <div className="wrap">
          {safeStep === 'confirmation' ? (
            <ConfirmationStep
              activity={activity}
              booking={booking}
              onLeave={handleLeave}
            />
          ) : (
            <div className="booking-layout">
              <div className="booking-main" key={safeStep}>
                {safeStep === 'details' && (
                  <BookingDetailsStep
                    activity={activity}
                    booking={booking}
                    minDate={minDate}
                    maxDate={maxDate}
                    onUpdate={updateBooking}
                    onContinue={() => goToStep('customer')}
                  />
                )}

                {safeStep === 'customer' && (
                  <CustomerStep
                    customer={booking.customer}
                    onChange={(customer) => updateBooking({ customer })}
                    onContinue={() => goToStep('review')}
                    onBack={() => goToStep('details')}
                  />
                )}

                {safeStep === 'review' && (
                  <ReviewStep
                    activity={activity}
                    booking={booking}
                    onTermsChange={(termsAccepted) =>
                      updateBooking({ termsAccepted })
                    }
                    onContinue={() => goToStep('payment')}
                    onEdit={goToStep}
                    onBack={() => goToStep('customer')}
                  />
                )}

                {safeStep === 'payment' && (
                  <PaymentStep
                    activity={activity}
                    booking={booking}
                    onSuccess={handlePaymentSuccess}
                    onBackToReview={() => goToStep('review')}
                  />
                )}
              </div>

              <div className="booking-side">
                <PriceSummary
                  activity={activity}
                  booking={booking}
                  variant={safeStep === 'payment' ? 'payment' : 'default'}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
