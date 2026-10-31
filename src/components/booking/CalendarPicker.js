import React, { useEffect, useMemo, useState } from 'react';

import { parseISODate, toISODate } from '../../booking/bookingUtils';
import { ArrowLeft, ArrowRight } from './Icons';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function monthStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export default function CalendarPicker({
  selectedDate,
  onSelect,
  minDate,
  maxDate,
  describedBy,
}) {
  const min = parseISODate(minDate);
  const max = parseISODate(maxDate);
  const selected = parseISODate(selectedDate);
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const [viewMonth, setViewMonth] = useState(() =>
    monthStart(selected || min || todayStart)
  );

  useEffect(() => {
    if (selectedDate) {
      const next = parseISODate(selectedDate);
      if (next) setViewMonth(monthStart(next));
    }
  }, [selectedDate]);

  const cells = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const leading = (new Date(year, month, 1).getDay() + 6) % 7;
    const totalDays = new Date(year, month + 1, 0).getDate();
    const result = Array.from({ length: 42 }, () => null);

    for (let day = 1; day <= totalDays; day += 1) {
      const date = new Date(year, month, day);
      result[leading + day - 1] = {
        date,
        iso: toISODate(date),
      };
    }

    return result;
  }, [viewMonth]);

  const minMonth = min ? monthStart(min) : null;
  const maxMonth = max ? monthStart(max) : null;
  const prevDisabled = !minMonth || viewMonth <= minMonth;
  const nextDisabled = !maxMonth || viewMonth >= maxMonth;

  const monthLabel = new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    year: 'numeric',
  }).format(viewMonth);

  return (
    <div className="calendar-card">
      <div className="calendar-head">
        <button
          type="button"
          className="calendar-nav"
          onClick={() =>
            setViewMonth(
              new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1)
            )
          }
          disabled={prevDisabled}
          aria-label="Previous month"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="calendar-month" aria-live="polite">
          {monthLabel}
        </div>
        <button
          type="button"
          className="calendar-nav"
          onClick={() =>
            setViewMonth(
              new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1)
            )
          }
          disabled={nextDisabled}
          aria-label="Next month"
        >
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="calendar-weekdays" aria-hidden="true">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-grid" aria-describedby={describedBy}>
        {cells.map((cell, index) => {
          if (!cell) {
            return <span className="calendar-spacer" key={`blank-${index}`} />;
          }

          const isDisabled =
            (min && cell.date < min) || (max && cell.date > max);
          const isSelected = cell.iso === selectedDate;
          const isToday = cell.date.getTime() === todayStart.getTime();
          const label = new Intl.DateTimeFormat('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(cell.date);

          return (
            <button
              type="button"
              className={[
                'calendar-day',
                isSelected ? 'selected' : '',
                isToday ? 'today' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              key={cell.iso}
              disabled={Boolean(isDisabled)}
              aria-pressed={isSelected}
              aria-label={isDisabled ? `${label}, unavailable` : `Select ${label}`}
              onClick={() => onSelect(cell.iso)}
            >
              {cell.date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
