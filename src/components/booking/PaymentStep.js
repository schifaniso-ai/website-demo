import React, { useEffect, useRef, useState } from 'react';

import {
  formatMoney,
  formatPartySize,
  getBookingTotal,
} from '../../booking/bookingUtils';
import {
  AlertCircle,
  ArrowLeft,
  Info,
  Lock,
  ShieldCheck,
} from './Icons';

function PayPalMark() {
  return (
    <span className="paypal-wordmark" role="img" aria-label="PayPal">
      <span className="paypal-pay" aria-hidden="true">
        Pay
      </span>
      <span className="paypal-pal" aria-hidden="true">
        Pal
      </span>
    </span>
  );
}

export default function PaymentStep({
  activity,
  booking,
  onSuccess,
  onBackToReview,
}) {
  const [status, setStatus] = useState('idle');
  const timerRef = useRef(null);
  const total = getBookingTotal(activity, booking.participants);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    []
  );

  const startPayment = () => {
    if (status === 'processing') return;
    setStatus('processing');

    timerRef.current = window.setTimeout(() => {
      const declined = Math.random() < 0.18;

      if (declined) {
        setStatus('failed');
        return;
      }

      onSuccess();
    }, 2200);
  };

  const goBack = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    onBackToReview();
  };

  return (
    <div className="booking-panel payment-panel">
      <div className="panel-head">
        <span className="step-badge" aria-hidden="true">
          04
        </span>
        <div>
          <div className="step-kicker">Step 4 of 5</div>
          <h2>Complete your payment</h2>
          <p>
            Review the amount below and continue with PayPal. This checkout is a
            demonstration and is not connected to a live payment provider.
          </p>
        </div>
      </div>

      <div className="demo-strip">
        <Info size={17} />
        <p>
          <strong>Demo mode.</strong> No PayPal login, card details or real
          payment are collected. The payment is simulated entirely in this
          browser.
        </p>
      </div>

      <div className="payment-card">
        <div className="payment-card-head">
          <div className="payment-method">
            <PayPalMark />
            <div>
              <strong>PayPal</strong>
              <span>Fast, secure online payment</span>
            </div>
          </div>
          <span className="payment-selected">
            <span className="payment-selected-dot" aria-hidden="true" />
            Selected
          </span>
        </div>

        <div className="payment-amount-block">
          <span>Amount due</span>
          <strong aria-live="polite">{formatMoney(total)}</strong>
          <small>
            {formatPartySize(booking.participants)} ×{' '}
            {formatMoney(activity.price)} · {activity.title}
          </small>
        </div>

        {status === 'failed' && (
          <div className="payment-error" role="alert">
            <AlertCircle size={20} />
            <div>
              <h3>Payment could not be completed</h3>
              <p>
                This demo payment was declined. No money has been taken and your
                booking is still here. You can try again or return to the
                summary.
              </p>
            </div>
          </div>
        )}

        {status === 'processing' ? (
          <div className="payment-processing" role="status" aria-live="polite">
            <span className="booking-spinner" aria-hidden="true" />
            <div>
              <strong>Processing your payment…</strong>
              <span>Connecting to PayPal (demo). Please keep this page open.</span>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="btn payment-pay-btn"
            onClick={startPayment}
          >
            <Lock size={16} />
            {status === 'failed' ? 'Try payment again' : 'Pay with PayPal'}
          </button>
        )}

        <p className="payment-disclaimer">
          You would normally be taken to PayPal to approve this payment. No
          credentials or card details are collected or stored on this site.
        </p>

        <div className="secure-row">
          <span>
            <Lock size={14} /> Secure checkout
          </span>
          <span>
            <ShieldCheck size={14} /> Buyer protection (demo)
          </span>
          <span>
            <Lock size={14} /> 256-bit SSL
          </span>
        </div>
      </div>

      <div className="booking-actions payment-actions">
        <button
          type="button"
          className="link-back"
          onClick={goBack}
          disabled={status === 'processing'}
        >
          <ArrowLeft size={16} /> Return to booking summary
        </button>
        <span className="payment-total-note">
          Total payable <strong>{formatMoney(total)}</strong>
        </span>
      </div>
    </div>
  );
}
