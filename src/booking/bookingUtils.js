export const BOOKING_STEPS = [
  { key: 'details', label: 'Activity Details', shortLabel: 'Details' },
  { key: 'customer', label: 'Customer Information', shortLabel: 'Customer' },
  { key: 'review', label: 'Review Booking', shortLabel: 'Review' },
  { key: 'payment', label: 'Payment', shortLabel: 'Payment' },
  { key: 'confirmation', label: 'Confirmation', shortLabel: 'Confirmed' },
];

export const STEP_KEYS = BOOKING_STEPS.map((step) => step.key);

const DRAFT_PREFIX = 'ac-booking:';

export const COUNTRIES = [
  'Argentina',
  'Australia',
  'Austria',
  'Belgium',
  'Botswana',
  'Brazil',
  'Canada',
  'Chile',
  'China',
  'Czechia',
  'Denmark',
  'Egypt',
  'Ethiopia',
  'Finland',
  'France',
  'Germany',
  'Ghana',
  'Greece',
  'Hong Kong',
  'India',
  'Indonesia',
  'Ireland',
  'Israel',
  'Italy',
  'Japan',
  'Kenya',
  'Malawi',
  'Malaysia',
  'Mexico',
  'Morocco',
  'Mozambique',
  'Namibia',
  'Netherlands',
  'New Zealand',
  'Nigeria',
  'Norway',
  'Philippines',
  'Poland',
  'Portugal',
  'Rwanda',
  'Saudi Arabia',
  'Singapore',
  'South Africa',
  'South Korea',
  'Spain',
  'Sweden',
  'Switzerland',
  'Tanzania',
  'Thailand',
  'Turkey',
  'Uganda',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Zambia',
  'Zimbabwe',
  'Other',
].sort((a, b) => a.localeCompare(b));

export function createEmptyBooking(activityId) {
  return {
    activityId,
    date: '',
    time: '',
    participants: 1,
    customer: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      requests: '',
    },
    termsAccepted: false,
    paymentStatus: 'pending',
    paymentMethod: '',
    reference: '',
    paidAt: '',
  };
}

export function getDraftKey(activityId) {
  return `${DRAFT_PREFIX}${activityId}`;
}

export function readDraft(activityId) {
  if (typeof window === 'undefined' || !window.sessionStorage) return null;

  try {
    const raw = window.sessionStorage.getItem(getDraftKey(activityId));
    if (!raw) return null;

    const saved = JSON.parse(raw);
    if (!saved || saved.activityId !== activityId) return null;

    const empty = createEmptyBooking(activityId);
    return {
      ...empty,
      ...saved,
      activityId,
      customer: { ...empty.customer, ...(saved.customer || {}) },
    };
  } catch (error) {
    return null;
  }
}

export function writeDraft(booking) {
  if (typeof window === 'undefined' || !window.sessionStorage) return;

  try {
    window.sessionStorage.setItem(
      getDraftKey(booking.activityId),
      JSON.stringify(booking)
    );
  } catch (error) {
    // A full or unavailable storage quota should not stop the booking flow.
  }
}

export function clearDraft(activityId) {
  if (typeof window === 'undefined' || !window.sessionStorage) return;

  try {
    window.sessionStorage.removeItem(getDraftKey(activityId));
  } catch (error) {
    // Nothing to do if storage is unavailable.
  }
}

export function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseISODate(value) {
  if (!value) return null;
  const parts = value.split('-').map(Number);
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    return null;
  }
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

export function addDays(date, amount) {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + amount);
  return next;
}

export function getBookingWindow() {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return {
    minDate: toISODate(addDays(start, 1)),
    maxDate: toISODate(addDays(start, 365)),
  };
}

export function formatDateLong(value) {
  const date = parseISODate(value);
  if (!date) return null;

  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatDateShort(value) {
  const date = parseISODate(value);
  if (!date) return null;

  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatMoney(amount) {
  return `$${Number(amount).toLocaleString('en-US')}`;
}

export function formatPartySize(count) {
  return `${count} ${count === 1 ? 'guest' : 'guests'}`;
}

export function getTimePeriod(time) {
  const hour = Number(time.split(':')[0]);
  if (hour < 10) return 'Morning';
  if (hour < 12) return 'Late morning';
  if (hour < 16) return 'Afternoon';
  return 'Evening';
}

export function getBookingTotal(activity, participants) {
  if (!activity) return 0;
  return activity.price * participants;
}

export function isDetailsValid(booking) {
  return Boolean(booking.date && booking.time);
}

export function validateCustomer(customer) {
  const errors = {};
  const firstName = (customer.firstName || '').trim();
  const lastName = (customer.lastName || '').trim();
  const email = (customer.email || '').trim();
  const phone = (customer.phone || '').trim();

  if (!firstName) {
    errors.firstName = 'Enter your first name.';
  } else if (firstName.length < 2) {
    errors.firstName = 'Please use at least 2 characters.';
  }

  if (!lastName) {
    errors.lastName = 'Enter your last name.';
  } else if (lastName.length < 2) {
    errors.lastName = 'Please use at least 2 characters.';
  }

  if (!email) {
    errors.email = 'Enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  const digits = phone.replace(/[^\d]/g, '');
  if (!phone) {
    errors.phone = 'Enter your phone number.';
  } else if (!/^[+()\d\s-]+$/.test(phone) || digits.length < 7) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!customer.country) {
    errors.country = 'Select your country of residence.';
  }

  return errors;
}

export function isCustomerValid(customer) {
  return Object.keys(validateCustomer(customer)).length === 0;
}

export function resolveBookingStep(step, booking) {
  if (!STEP_KEYS.includes(step)) return 'details';

  if (step === 'customer' && !isDetailsValid(booking)) {
    return 'details';
  }

  if (['review', 'payment', 'confirmation'].includes(step)) {
    if (!isDetailsValid(booking)) return 'details';
    if (!isCustomerValid(booking.customer)) return 'customer';
  }

  if (step === 'payment') {
    if (booking.paymentStatus === 'success') return 'confirmation';
    if (!booking.termsAccepted) return 'review';
  }

  if (step === 'confirmation' && booking.paymentStatus !== 'success') {
    if (!booking.termsAccepted) return 'review';
    return 'payment';
  }

  return step;
}

export function createBookingReference() {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let reference = '';

  for (let i = 0; i < 6; i += 1) {
    reference += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return `AC-${reference}`;
}
