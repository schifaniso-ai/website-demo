import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.history.pushState({}, '', '/');
});

test('renders the hero headline on the home page', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: /smoke that thunders/i })
  ).toBeInTheDocument();
});

test('main navigation links to every page', () => {
  render(<App />);

  expect(screen.getAllByRole('link', { name: 'Home' })[0]).toHaveAttribute(
    'href',
    '/'
  );
  expect(screen.getAllByRole('link', { name: 'About' })[0]).toHaveAttribute(
    'href',
    '/about'
  );
  expect(
    screen.getAllByRole('link', { name: 'Activities' })[0]
  ).toHaveAttribute('href', '/activities');
  expect(screen.getAllByRole('link', { name: 'Contact' })[0]).toHaveAttribute(
    'href',
    '/contact'
  );
});

test('renders the About page with the site navigation', () => {
  window.history.pushState({}, '', '/about');
  render(<App />);

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /travel with the people who live here/i,
    })
  ).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'Home' })[0]).toHaveAttribute(
    'href',
    '/'
  );
});

test('renders the Activities page', () => {
  window.history.pushState({}, '', '/activities');
  render(<App />);

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /adrenaline, water and wild country/i,
    })
  ).toBeInTheDocument();
});

test('renders the Contact page with its enquiry form', () => {
  window.history.pushState({}, '', '/contact');
  render(<App />);

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /tell us where you want to go/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /send enquiry/i })
  ).toBeInTheDocument();
});

test('confirms a contact enquiry after submission', () => {
  window.history.pushState({}, '', '/contact');
  render(<App />);

  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { value: 'A Traveller' },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'traveller@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/message/i), {
    target: { value: 'We would like to see the falls and Chobe.' },
  });
  fireEvent.click(screen.getByRole('button', { name: /send enquiry/i }));

  expect(
    screen.getByRole('heading', { name: /message received/i })
  ).toBeInTheDocument();
});
