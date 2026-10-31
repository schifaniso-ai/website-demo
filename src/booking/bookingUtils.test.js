import {
  createBookingReference,
  createEmptyBooking,
  formatMoney,
  formatPartySize,
  getBookingTotal,
  getBookingWindow,
  getTimePeriod,
  resolveBookingStep,
  validateCustomer,
} from './bookingUtils';

const activity = { price: 185 };
const validCustomer = {
  firstName: 'Amara',
  lastName: 'Ndlovu',
  email: 'amara@example.com',
  phone: '+263 77 123 4567',
  country: 'Zimbabwe',
  requests: '',
};

test('calculates the booking total from price and participants', () => {
  expect(getBookingTotal(activity, 1)).toBe(185);
  expect(getBookingTotal(activity, 3)).toBe(555);
  expect(getBookingTotal(null, 3)).toBe(0);
});

test('formats money, party sizes and time periods', () => {
  expect(formatMoney(1234)).toBe('$1,234');
  expect(formatPartySize(1)).toBe('1 guest');
  expect(formatPartySize(4)).toBe('4 guests');
  expect(getTimePeriod('07:00')).toBe('Morning');
  expect(getTimePeriod('11:00')).toBe('Late morning');
  expect(getTimePeriod('14:00')).toBe('Afternoon');
  expect(getTimePeriod('18:30')).toBe('Evening');
});

test('validates required customer information', () => {
  expect(validateCustomer(validCustomer)).toEqual({});
  expect(validateCustomer(validCustomer).email).toBeUndefined();

  const invalid = validateCustomer({
    ...validCustomer,
    firstName: '',
    email: 'not-an-email',
    phone: '123',
    country: '',
  });

  expect(invalid.firstName).toMatch(/enter your first name/i);
  expect(invalid.email).toMatch(/valid email/i);
  expect(invalid.phone).toMatch(/valid phone/i);
  expect(invalid.country).toMatch(/select your country/i);
});

test('guards later steps until details, customer information and terms are complete', () => {
  const empty = createEmptyBooking('whitewater-rafting');
  expect(resolveBookingStep('customer', empty)).toBe('details');
  expect(resolveBookingStep('review', empty)).toBe('details');

  const details = {
    ...empty,
    date: '2026-12-01',
    time: '07:00',
    customer: validCustomer,
  };

  expect(resolveBookingStep('customer', details)).toBe('customer');
  expect(resolveBookingStep('payment', details)).toBe('review');
  expect(resolveBookingStep('confirmation', details)).toBe('review');

  const reviewed = { ...details, termsAccepted: true };
  expect(resolveBookingStep('payment', reviewed)).toBe('payment');
  expect(resolveBookingStep('confirmation', reviewed)).toBe('payment');

  const paid = { ...reviewed, paymentStatus: 'success' };
  expect(resolveBookingStep('payment', paid)).toBe('confirmation');
  expect(resolveBookingStep('confirmation', paid)).toBe('confirmation');
});

test('generates a demo booking reference and a forward booking window', () => {
  const reference = createBookingReference();
  expect(reference).toMatch(/^AC-[A-HJ-NP-Z2-9]{6}$/);

  const { minDate, maxDate } = getBookingWindow();
  expect(minDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(maxDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(new Date(minDate).getTime()).toBeGreaterThan(Date.now());
  expect(new Date(maxDate).getTime()).toBeGreaterThan(new Date(minDate).getTime());
});
