import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  formatMoney,
  formatPartySize,
  getBookingTotal,
  getTimePeriod,
} from '../../booking/bookingUtils';
import CalendarPicker from './CalendarPicker';
import {
  AlertCircle,
  ArrowRight,
  Clock,
  Info,
  Minus,
  Plus,
  Users,
} from './Icons';

export default function BookingDetailsStep({
  activity,
  booking,
  minDate,
  maxDate,
  onUpdate,
  onContinue,
}) {
  const [submitted, setSubmitted] = useState(false);
  const dateError = submitted && !booking.date ? 'Choose a booking date.' : '';
  const timeError = submitted && !booking.time ? 'Choose an available time slot.' : '';
  const total = getBookingTotal(activity, booking.participants);

  const handleContinue = () => {
    setSubmitted(true);
    if (!booking.date || !booking.time) return;
    onContinue();
  };

  const changeParticipants = (amount) => {
    const next = Math.min(
      activity.maxParticipants,
      Math.max(1, booking.participants + amount)
    );
    onUpdate({ participants: next });
  };

  return (
    <div className="booking-panel">
      <div className="panel-head">
        <span className="step-badge" aria-hidden="true">
          01
        </span>
        <div>
          <div className="step-kicker">Step 1 of 5</div>
          <h2>Choose your date and time</h2>
          <p>
            Pick the day that suits your trip and the departure that fits your
            plans. We will hold your place while you complete the booking.
          </p>
        </div>
      </div>

      <div className="activity-intro">
        <div className="activity-intro-media">
          <img
            src={activity.image}
            alt={activity.imageAlt}
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="activity-intro-copy">
          <div className="activity-intro-top">
            <div>
              <div className="eyebrow">Victoria Falls · {activity.duration}</div>
              <h3>{activity.title}</h3>
            </div>
            <div className="activity-from">
              <span>From</span>
              <strong>{formatMoney(activity.price)}</strong>
              <span>per person</span>
            </div>
          </div>
          <p>{activity.desc}</p>
          <div className="activity-pills">
            <span>{activity.durationLong}</span>
            <span>{activity.tagline}</span>
            <span>Max {activity.maxParticipants} guests</span>
          </div>
        </div>
      </div>

      <div className="booking-split">
        <div className="calendar-column">
          <div className="subsection-head">
            <h3>Select a date</h3>
            <span>Available up to 12 months ahead</span>
          </div>
          <CalendarPicker
            selectedDate={booking.date}
            onSelect={(date) => onUpdate({ date })}
            minDate={minDate}
            maxDate={maxDate}
            describedBy={dateError ? 'date-error' : undefined}
          />
          {dateError && (
            <p className="field-error" id="date-error" role="alert">
              <AlertCircle size={15} /> {dateError}
            </p>
          )}
        </div>

        <div className="time-column">
          <div className="subsection-head">
            <h3>Select a time</h3>
            <span>Times shown in CAT</span>
          </div>
          <div className="slot-panel">
            <div className="slot-panel-head">
              <Clock size={17} />
              <span>Available departures</span>
            </div>
            <div className="slot-grid" role="group" aria-label="Available time slots">
              {activity.times.map((time) => {
                const isSelected = booking.time === time;
                return (
                  <button
                    type="button"
                    className={`slot-btn${isSelected ? ' selected' : ''}`}
                    key={time}
                    aria-pressed={isSelected}
                    onClick={() => onUpdate({ time })}
                  >
                    <span className="slot-time">{time}</span>
                    <span className="slot-period">{getTimePeriod(time)}</span>
                  </button>
                );
              })}
            </div>
            {timeError && (
              <p className="field-error" role="alert">
                <AlertCircle size={15} /> {timeError}
              </p>
            )}
            <p className="slot-note">
              Departure times are local. Please arrive 15 minutes before your
              slot.
            </p>
          </div>

          {activity.seasonNote && (
            <p className="season-note">
              <Info size={16} /> {activity.seasonNote}
            </p>
          )}
        </div>
      </div>

      <div className="guest-panel">
        <div className="guest-copy">
          <h3>
            <Users size={18} /> Participants
          </h3>
          <p>
            Price is per participant. This activity takes up to{' '}
            {activity.maxParticipants} guests.
          </p>
        </div>
        <div className="guest-controls">
          <div className="stepper" role="group" aria-label="Number of participants">
            <button
              type="button"
              onClick={() => changeParticipants(-1)}
              disabled={booking.participants <= 1}
              aria-label="Decrease participants"
            >
              <Minus size={16} />
            </button>
            <div className="stepper-value" aria-live="polite">
              <strong>{booking.participants}</strong>
              <span>{booking.participants === 1 ? 'guest' : 'guests'}</span>
            </div>
            <button
              type="button"
              onClick={() => changeParticipants(1)}
              disabled={booking.participants >= activity.maxParticipants}
              aria-label="Increase participants"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="guest-total">
            <span>
              {formatPartySize(booking.participants)} ×{' '}
              {formatMoney(activity.price)}
            </span>
            <strong>{formatMoney(total)}</strong>
          </div>
        </div>
      </div>

      <div className="booking-actions">
        <Link className="link-back" to="/activities#activities">
          ← Back to activities
        </Link>
        <button type="button" className="btn" onClick={handleContinue}>
          Continue to customer details <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
