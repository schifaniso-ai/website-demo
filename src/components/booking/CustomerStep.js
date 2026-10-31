import React, { useState } from 'react';

import {
  COUNTRIES,
  validateCustomer,
} from '../../booking/bookingUtils';
import { AlertCircle, ArrowLeft, ArrowRight } from './Icons';

export default function CustomerStep({ customer, onChange, onContinue, onBack }) {
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const errors = validateCustomer(customer);

  const showError = (field) =>
    (submitted || touched[field]) && errors[field] ? errors[field] : '';

  const update = (field, value) => {
    onChange({ ...customer, [field]: value });
  };

  const handleBlur = (field) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const firstError = Object.keys(errors)[0];
    if (firstError) {
      const field = document.getElementById(firstError);
      if (field) field.focus();
      return;
    }

    onContinue();
  };

  const fieldProps = (field) => ({
    id: field,
    name: field,
    'aria-invalid': showError(field) ? 'true' : undefined,
    'aria-describedby': showError(field) ? `${field}-error` : undefined,
    onBlur: () => handleBlur(field),
  });

  const renderError = (field) =>
    showError(field) ? (
      <span className="field-error" id={`${field}-error`}>
        <AlertCircle size={14} /> {showError(field)}
      </span>
    ) : null;

  return (
    <div className="booking-panel">
      <div className="panel-head">
        <span className="step-badge" aria-hidden="true">
          02
        </span>
        <div>
          <div className="step-kicker">Step 2 of 5</div>
          <h2>Who&rsquo;s travelling?</h2>
          <p>
            We use these details to prepare your booking and reach you if
            anything changes before the activity.
          </p>
        </div>
      </div>

      <form className="booking-form" onSubmit={handleSubmit} noValidate>
        <div className="form-section-label">
          <span>Lead traveller</span>
          <small>All fields marked * are required</small>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="firstName">
              First name <span className="req">*</span>
            </label>
            <input
              {...fieldProps('firstName')}
              type="text"
              autoComplete="given-name"
              value={customer.firstName}
              onChange={(event) => update('firstName', event.target.value)}
              placeholder="e.g. Amara"
            />
            {renderError('firstName')}
          </div>

          <div className="field">
            <label htmlFor="lastName">
              Last name <span className="req">*</span>
            </label>
            <input
              {...fieldProps('lastName')}
              type="text"
              autoComplete="family-name"
              value={customer.lastName}
              onChange={(event) => update('lastName', event.target.value)}
              placeholder="e.g. Ndlovu"
            />
            {renderError('lastName')}
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="email">
              Email address <span className="req">*</span>
            </label>
            <input
              {...fieldProps('email')}
              type="email"
              autoComplete="email"
              inputMode="email"
              spellCheck="false"
              value={customer.email}
              onChange={(event) => update('email', event.target.value)}
              placeholder="you@example.com"
            />
            {renderError('email')}
          </div>

          <div className="field">
            <label htmlFor="phone">
              Phone number <span className="req">*</span>
            </label>
            <input
              {...fieldProps('phone')}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={customer.phone}
              onChange={(event) => update('phone', event.target.value)}
              placeholder="+263 77 123 4567"
            />
            {renderError('phone')}
          </div>
        </div>

        <div className="field">
          <label htmlFor="country">
            Country of residence <span className="req">*</span>
          </label>
          <select
            {...fieldProps('country')}
            autoComplete="country-name"
            value={customer.country}
            onChange={(event) => update('country', event.target.value)}
          >
            <option value="">Select your country</option>
            {COUNTRIES.map((country) => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
          </select>
          {renderError('country')}
        </div>

        <div className="field">
          <div className="label-row">
            <label htmlFor="requests">Special requests or additional information</label>
            <span className="optional">Optional</span>
          </div>
          <textarea
            {...fieldProps('requests')}
            rows="4"
            maxLength="500"
            value={customer.requests}
            onChange={(event) => update('requests', event.target.value)}
            placeholder="Dietary needs, accessibility requirements, a birthday we should know about…"
          />
          <div className="field-foot">
            <span>We will pass this to your local guide.</span>
            <span>{customer.requests.length}/500</span>
          </div>
        </div>

        <div className="booking-actions">
          <button type="button" className="link-back" onClick={onBack}>
            <ArrowLeft size={16} /> Back to activity details
          </button>
          <button type="submit" className="btn">
            Continue to review <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
