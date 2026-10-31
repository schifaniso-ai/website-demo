import { act, fireEvent, render, screen } from '@testing-library/react';

import App from '../App';

const ACTIVITY_ID = 'whitewater-rafting';
const DRAFT_KEY = `ac-booking:${ACTIVITY_ID}`;

function renderAt(path) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

function chooseFirstAvailableDay() {
  const day = screen
    .getAllByRole('button', { name: /^Select / })
    .find((button) => !button.disabled);

  expect(day).toBeTruthy();
  fireEvent.click(day);
}

function fillCustomer() {
  fireEvent.change(screen.getByLabelText(/first name/i), {
    target: { value: 'Amara' },
  });
  fireEvent.change(screen.getByLabelText(/last name/i), {
    target: { value: 'Ndlovu' },
  });
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: 'amara@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/phone number/i), {
    target: { value: '+263 77 123 4567' },
  });
  fireEvent.change(screen.getByLabelText(/country of residence/i), {
    target: { value: 'Zimbabwe' },
  });
}

function readyDraft(overrides = {}) {
  return {
    activityId: ACTIVITY_ID,
    date: '2030-06-12',
    time: '07:00',
    participants: 2,
    customer: {
      firstName: 'Amara',
      lastName: 'Ndlovu',
      email: 'amara@example.com',
      phone: '+263 77 123 4567',
      country: 'Zimbabwe',
      requests: '',
    },
    termsAccepted: true,
    paymentStatus: 'pending',
    paymentMethod: '',
    reference: '',
    paidAt: '',
    ...overrides,
  };
}

beforeEach(() => {
  window.sessionStorage.clear();
  window.history.pushState({}, '', '/');
  jest.restoreAllMocks();
  jest.useRealTimers();
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

test('completes every booking step and reaches the confirmation screen', () => {
  renderAt('/activities');

  fireEvent.click(
    screen.getByRole('link', { name: /book whitewater rafting now/i })
  );

  expect(
    screen.getByRole('heading', { name: /choose your date and time/i })
  ).toBeInTheDocument();

  // Required date and time are enforced.
  fireEvent.click(
    screen.getByRole('button', { name: /continue to customer details/i })
  );
  expect(screen.getByText(/choose a booking date/i)).toBeInTheDocument();
  expect(
    screen.getByText(/choose an available time slot/i)
  ).toBeInTheDocument();

  chooseFirstAvailableDay();
  fireEvent.click(screen.getByRole('button', { name: /07:00/ }));
  fireEvent.click(
    screen.getByRole('button', { name: /continue to customer details/i })
  );

  expect(
    screen.getByRole('heading', { level: 2, name: /travelling/i })
  ).toBeInTheDocument();

  fillCustomer();
  fireEvent.click(screen.getByRole('button', { name: /continue to review/i }));

  expect(
    screen.getByRole('heading', { name: /review your booking/i })
  ).toBeInTheDocument();
  expect(screen.getByText('Amara Ndlovu')).toBeInTheDocument();

  // Terms must be accepted before payment.
  fireEvent.click(
    screen.getByRole('button', { name: /continue to payment/i })
  );
  expect(
    screen.getByText(/please accept the booking terms before continuing/i)
  ).toBeInTheDocument();

  fireEvent.click(screen.getByRole('checkbox'));
  fireEvent.click(
    screen.getByRole('button', { name: /continue to payment/i })
  );

  expect(
    screen.getByRole('heading', { name: /complete your payment/i })
  ).toBeInTheDocument();

  jest.spyOn(Math, 'random').mockReturnValue(0.9);
  jest.useFakeTimers();

  fireEvent.click(screen.getByRole('button', { name: /pay with paypal/i }));
  expect(screen.getByText(/processing your payment/i)).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(2300);
  });

  jest.useRealTimers();

  expect(
    screen.getByRole('heading', { name: /booking confirmed/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/successful \(demo\)/i)).toBeInTheDocument();
  expect(screen.getByText('PayPal (Demo)')).toBeInTheDocument();
  expect(screen.getByText(/no email has been sent/i)).toBeInTheDocument();
  expect(screen.getAllByText(/^AC-[A-Z2-9]{6}$/).length).toBeGreaterThan(0);

  fireEvent.click(
    screen.getByRole('button', { name: /view booking details/i })
  );
  expect(
    screen.getByText(/victoria falls adventure hub, parkway/i)
  ).toBeInTheDocument();

  fireEvent.click(
    screen.getByRole('link', { name: /return to activities/i })
  );
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /adrenaline, water and wild country/i,
    })
  ).toBeInTheDocument();
  expect(window.sessionStorage.getItem(DRAFT_KEY)).toBeNull();
});

test('shows a declined demo payment and allows a retry', () => {
  window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(readyDraft()));
  renderAt(`/book/${ACTIVITY_ID}/payment`);

  expect(
    screen.getByRole('heading', { name: /complete your payment/i })
  ).toBeInTheDocument();
  expect(screen.getAllByText('$370').length).toBeGreaterThan(0);

  jest
    .spyOn(Math, 'random')
    .mockReturnValueOnce(0.1)
    .mockReturnValue(0.9);
  jest.useFakeTimers();

  fireEvent.click(screen.getByRole('button', { name: /pay with paypal/i }));

  act(() => {
    jest.advanceTimersByTime(2300);
  });

  expect(
    screen.getByText(/payment could not be completed/i)
  ).toBeInTheDocument();

  fireEvent.click(
    screen.getByRole('button', { name: /try payment again/i })
  );

  act(() => {
    jest.advanceTimersByTime(2300);
  });

  jest.useRealTimers();

  expect(
    screen.getByRole('heading', { name: /booking confirmed/i })
  ).toBeInTheDocument();
  expect(screen.getAllByText(/^AC-[A-Z2-9]{6}$/).length).toBeGreaterThan(0);
});

test('restores the booking draft after a page refresh', () => {
  const { unmount } = renderAt(`/book/${ACTIVITY_ID}`);

  chooseFirstAvailableDay();
  fireEvent.click(screen.getByRole('button', { name: /07:00/ }));
  fireEvent.click(
    screen.getByRole('button', { name: /increase participants/i })
  );
  fireEvent.click(
    screen.getByRole('button', { name: /continue to customer details/i })
  );

  fillCustomer();
  fireEvent.click(screen.getByRole('button', { name: /continue to review/i }));

  expect(screen.getByText('Amara Ndlovu')).toBeInTheDocument();

  unmount();
  renderAt(`/book/${ACTIVITY_ID}/review`);

  expect(
    screen.getByRole('heading', { name: /review your booking/i })
  ).toBeInTheDocument();
  expect(screen.getByText('Amara Ndlovu')).toBeInTheDocument();
  expect(screen.getAllByText(/07:00/).length).toBeGreaterThan(0);
  expect(screen.getAllByText('$370').length).toBeGreaterThan(0);
});

test('redirects a deep link to payment when no booking data exists', async () => {
  renderAt(`/book/${ACTIVITY_ID}/payment`);

  expect(
    await screen.findByRole('heading', {
      name: /choose your date and time/i,
    })
  ).toBeInTheDocument();
});
