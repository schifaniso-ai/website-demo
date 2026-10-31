import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  formatDateLong,
  formatMoney,
  formatPartySize,
  getBookingTotal,
} from '../../booking/bookingUtils';
import {
  CalendarIcon,
  Check,
  Clock,
  Lock,
  Mail,
  MapPin,
  Users,
} from './Icons';

export default function ConfirmationStep({ activity, booking, onLeave }) {
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef(null);
  const total = getBookingTotal(activity, booking.participants);
  const fullName = `${booking.customer.firstName} ${booking.customer.lastName}`.trim();

  useEffect(() => {
    if (!showDetails || !detailsRef.current) return;
    if (typeof detailsRef.current.scrollIntoView === 'function') {
      detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showDetails]);

  return (
    <div className="confirmation">
      <div className="confirmation-hero">
        <div className="success-burst" aria-hidden="true">
          <span className="success-ring success-ring-one" />
          <span className="success-ring success-ring-two" />
          <span className="success-check">
            <Check size={36} />
          </span>
        </div>
        <div className="eyebrow">You&rsquo;re going</div>
        <h2>Booking Confirmed!</h2>
        <p className="confirmation-lede">
          Thank you, {booking.customer.firstName}. Your place on{' '}
          <strong>{activity.title}</strong> is reserved. We can&rsquo;t wait to
          see you at Victoria Falls.
        </p>
        <div className="booking-ref">
          <span>Booking reference</span>
          <strong>{booking.reference}</strong>
        </div>
      </div>

      <div className="confirmation-grid">
        <section className="confirmation-card" aria-labelledby="confirmed-activity">
          <div className="confirmation-activity">
            <img
              src={activity.image}
              alt={activity.imageAlt}
              loading="eager"
              decoding="async"
            />
            <div>
              <div className="eyebrow">Your activity</div>
              <h3 id="confirmed-activity">{activity.title}</h3>
              <span>{activity.tagline}</span>
            </div>
          </div>

          <dl className="confirmation-facts">
            <div>
              <dt>
                <CalendarIcon size={15} /> Date
              </dt>
              <dd>{formatDateLong(booking.date)}</dd>
            </div>
            <div>
              <dt>
                <Clock size={15} /> Time
              </dt>
              <dd>{booking.time} CAT</dd>
            </div>
            <div>
              <dt>
                <Users size={15} /> Participants
              </dt>
              <dd>{formatPartySize(booking.participants)}</dd>
            </div>
            <div>
              <dt>Lead traveller</dt>
              <dd>{fullName}</dd>
            </div>
          </dl>
        </section>

        <section className="confirmation-card payment-receipt" aria-labelledby="payment-receipt-title">
          <div className="receipt-head">
            <div>
              <div className="eyebrow">Payment</div>
              <h3 id="payment-receipt-title">Receipt</h3>
            </div>
            <span className="paid-badge">
              <Check size={13} /> Paid in full
            </span>
          </div>

          <dl className="receipt-lines">
            <div>
              <dt>Total amount paid</dt>
              <dd>{formatMoney(total)}</dd>
            </div>
            <div>
              <dt>Payment method</dt>
              <dd>{booking.paymentMethod || 'PayPal (Demo)'}</dd>
            </div>
            <div>
              <dt>Payment status</dt>
              <dd className="receipt-success">Successful (Demo)</dd>
            </div>
            <div>
              <dt>Reference</dt>
              <dd>{booking.reference}</dd>
            </div>
          </dl>

          <p className="receipt-secure">
            <Lock size={14} /> Simulated payment. No real charge was made.
          </p>
        </section>
      </div>

      <div className="confirmation-email">
        <Mail size={20} />
        <p>
          A booking confirmation email would normally be sent to{' '}
          <strong>{booking.customer.email}</strong>. This is a demo
          experience, so no email has been sent.
        </p>
      </div>

      <div className="confirmation-actions">
        <button
          type="button"
          className="btn"
          onClick={() => setShowDetails((current) => !current)}
          aria-expanded={showDetails}
          aria-controls="booking-details"
        >
          {showDetails ? 'Hide Booking Details' : 'View Booking Details'}
        </button>
        <Link
          className="btn btn-secondary-light"
          to="/activities"
          onClick={onLeave}
        >
          Return to Activities
        </Link>
        <Link className="btn btn-secondary-light" to="/" onClick={onLeave}>
          Return to Home
        </Link>
      </div>

      {showDetails && (
        <section
          className="confirmation-extra"
          id="booking-details"
          ref={detailsRef}
          aria-label="Full booking details"
        >
          <div className="confirmation-extra-head">
            <div className="eyebrow">Full details</div>
            <h3>Everything for your day</h3>
          </div>

          <div className="confirmation-extra-grid">
            <dl>
              <div>
                <dt>Booking reference</dt>
                <dd>{booking.reference}</dd>
              </div>
              <div>
                <dt>Lead traveller</dt>
                <dd>{fullName}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{booking.customer.email}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{booking.customer.phone}</dd>
              </div>
              <div>
                <dt>Country of residence</dt>
                <dd>{booking.customer.country}</dd>
              </div>
            </dl>

            <dl>
              <div>
                <dt>
                  <MapPin size={14} /> Meeting point
                </dt>
                <dd>{activity.meetingPoint}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{activity.durationLong}</dd>
              </div>
              <div>
                <dt>Departure</dt>
                <dd>
                  {formatDateLong(booking.date)} at {booking.time} CAT
                </dd>
              </div>
              <div>
                <dt>Special requests</dt>
                <dd>{booking.customer.requests.trim() || 'None provided'}</dd>
              </div>
            </dl>
          </div>

          <div className="confirmation-extra-note">
            <strong>What&rsquo;s included</strong>
            <ul>
              {activity.includes.map((item) => (
                <li key={item}>
                  <Check size={14} /> {item}
                </li>
              ))}
            </ul>
            <p>
              Please arrive 15 minutes before your departure time and bring
              comfortable shoes, sun protection and a water bottle.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
