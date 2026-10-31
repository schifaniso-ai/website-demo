import React from 'react';

import { BOOKING_STEPS } from '../../booking/bookingUtils';
import { Check } from './Icons';

export default function BookingProgress({ currentStep, onNavigate }) {
  const currentIndex = BOOKING_STEPS.findIndex(
    (step) => step.key === currentStep
  );

  return (
    <nav className="booking-progress-wrap" aria-label="Booking progress">
      <ol className="booking-progress">
        {BOOKING_STEPS.map((step, index) => {
          const state =
            index < currentIndex
              ? 'complete'
              : index === currentIndex
                ? 'current'
                : 'upcoming';
          const canNavigate = index < currentIndex && onNavigate;

          return (
            <li className={`progress-step ${state}`} key={step.key}>
              <button
                type="button"
                className="progress-button"
                aria-current={state === 'current' ? 'step' : undefined}
                aria-label={
                  state === 'complete'
                    ? `${step.label}, completed. Return to this step`
                    : state === 'current'
                      ? `${step.label}, current step`
                      : `${step.label}, upcoming`
                }
                disabled={!canNavigate}
                onClick={() => canNavigate && onNavigate(step.key)}
              >
                <span className="progress-dot" aria-hidden="true">
                  {state === 'complete' ? <Check size={13} /> : index + 1}
                </span>
                <span className="progress-label">
                  <span className="label-full">{step.label}</span>
                  <span className="label-short">{step.shortLabel}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
