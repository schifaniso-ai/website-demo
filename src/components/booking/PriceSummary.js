import React from 'react';

import {
  formatDateShort,
  formatMoney,
  formatPartySize,
  getBookingTotal,
} from '../../booking/bookingUtils';
import { CalendarIcon, Clock, Lock, Users } from './Icons';

export default function PriceSummary({ activity, booking, variant = 'default' }) {
  const total = getBookingTotal(activity, booking.participants);
  const dateLabel = formatDateShort(booking.date);
  const isPayment = variant === 'payment';

  return (
    <aside className="booking-summary" aria-label="Booking summary">
      <div className="summary-media">
        <img src={activity.image} alt={activity.imageAlt} loading="lazy" decoding="async" />
        <span className="summary-tag">{activity.tagline}</span>
      </div>

      <div className="summary-body">
        <div className="eyebrow summary-eyebrow">Your booking</div>
        <h2>{activity.title}</h2>
        <p className="summary-desc">{activity.desc}</p>

        <dl className="summary-lines">
          <div>
            <dt>
              <CalendarIcon size={15} /> Date
            </dt>
            <dd className={!dateLabel ? 'muted' : undefined}>
              {dateLabel || 'Choose a date'}
            </dd>
          </div>
          <div>
            <dt>
              <Clock size={15} /> Time
            </dt>
            <dd className={!booking.time ? 'muted' : undefined}>
              {booking.time ? `${booking.time} CAT` : 'Choose a time'}
            </dd>
          </div>
          <div>
            <dt>
              <Users size={15} /> Guests
            </dt>
            <dd>{formatPartySize(booking.participants)}</dd>
          </div>
          <div>
            <dt>Price per person</dt>
            <dd>{formatMoney(activity.price)}</dd>
          </div>
        </dl>

        <div className="summary-total" aria-live="polite">
          <span>Total</span>
          <strong>{formatMoney(total)}</strong>
        </div>

        {isPayment ? (
          <p className="summary-note summary-secure">
            <Lock size={14} /> Demo checkout. No real charge will be made.
          </p>
        ) : (
          <p className="summary-note">
            No payment needed until the final step. Free cancellation up to 48
            hours before departure.
          </p>
        )}
      </div>
    </aside>
  );
}
