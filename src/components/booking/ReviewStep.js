import React, { useState } from 'react';

import {
  formatDateLong,
  formatMoney,
  formatPartySize,
  getBookingTotal,
} from '../../booking/bookingUtils';
import { AlertCircle, ArrowLeft, ArrowRight, Check } from './Icons';

export default function ReviewStep({
  activity,
  booking,
  onTermsChange,
  onContinue,
  onEdit,
  onBack,
}) {
  const [termsError, setTermsError] = useState(false);
  const total = getBookingTotal(activity, booking.participants);
  const { customer } = booking;

  const handleContinue = () => {
    if (!booking.termsAccepted) {
      setTermsError(true);
      const checkbox = document.getElementById('terms');
      if (checkbox) checkbox.focus();
      return;
    }

    setTermsError(false);
    onContinue();
  };

  return (
    <div className="booking-panel">
      <div className="panel-head">
        <span className="step-badge" aria-hidden="true">
          03
        </span>
        <div>
          <div className="step-kicker">Step 3 of 5</div>
          <h2>Review your booking</h2>
          <p>
            Check the details below before continuing to the payment page.
            Anything can still be edited at this stage.
          </p>
        </div>
      </div>

      <div className="review-stack">
        <section className="review-block" aria-labelledby="review-activity-title">
          <div className="review-block-head">
            <div>
              <div className="review-kicker">Your experience</div>
              <h3 id="review-activity-title">{activity.title}</h3>
            </div>
            <button
              type="button"
              className="edit-link"
              onClick={() => onEdit('details')}
            >
              Edit
            </button>
          </div>

          <div className="review-activity">
            <div className="review-activity-media">
              <img
                src={activity.image}
                alt={activity.imageAlt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="review-activity-copy">
              <p>{activity.desc}</p>
              <dl className="review-info-grid">
                <div>
                  <dt>Date</dt>
                  <dd>{formatDateLong(booking.date)}</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{booking.time} CAT</dd>
                </div>
                <div>
                  <dt>Participants</dt>
                  <dd>{formatPartySize(booking.participants)}</dd>
                </div>
                <div>
                  <dt>Price per person</dt>
                  <dd>{formatMoney(activity.price)}</dd>
                </div>
              </dl>
              <div className="review-total-inline">
                <span>Activity total</span>
                <strong>{formatMoney(total)}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="review-block" aria-labelledby="review-customer-title">
          <div className="review-block-head">
            <div>
              <div className="review-kicker">Lead traveller</div>
              <h3 id="review-customer-title">
                {customer.firstName} {customer.lastName}
              </h3>
            </div>
            <button
              type="button"
              className="edit-link"
              onClick={() => onEdit('customer')}
            >
              Edit
            </button>
          </div>

          <dl className="review-customer-grid">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${customer.email}`}>{customer.email}</a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{customer.phone}</dd>
            </div>
            <div>
              <dt>Country of residence</dt>
              <dd>{customer.country}</dd>
            </div>
            <div className="full">
              <dt>Special requests</dt>
              <dd>{customer.requests.trim() || 'None provided'}</dd>
            </div>
          </dl>
        </section>
      </div>

      <div className={`terms-box${termsError ? ' has-error' : ''}`}>
        <label className="checkbox-row" htmlFor="terms">
          <input
            id="terms"
            type="checkbox"
            checked={booking.termsAccepted}
            onChange={(event) => {
              onTermsChange(event.target.checked);
              if (event.target.checked) setTermsError(false);
            }}
            aria-invalid={termsError ? 'true' : undefined}
            aria-describedby={termsError ? 'terms-error' : undefined}
          />
          <span className="checkbox-copy">
            <span className="checkbox-tick" aria-hidden="true">
              <Check size={13} />
            </span>
            I have read and accept the booking terms and conditions, including
            the cancellation policy.
          </span>
        </label>

        <details className="terms-disclosure">
          <summary>Read the booking terms</summary>
          <div>
            <p>
              Payment is taken in full at checkout. This website is a frontend
              demo, so no real payment will be processed and no money will
              leave your account.
            </p>
            <p>
              For a live booking, free cancellation would apply up to 48 hours
              before departure. Participants should arrive 15 minutes before
              their slot and follow all safety instructions from the guide.
            </p>
          </div>
        </details>

        {termsError && (
          <p className="field-error" id="terms-error" role="alert">
            <AlertCircle size={15} /> Please accept the booking terms before
            continuing.
          </p>
        )}
      </div>

      <div className="booking-actions">
        <button type="button" className="link-back" onClick={onBack}>
          <ArrowLeft size={16} /> Back to customer details
        </button>
        <button type="button" className="btn" onClick={handleContinue}>
          Continue to payment <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
