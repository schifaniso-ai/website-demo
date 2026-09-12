import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the hero headline', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: /smoke that thunders/i })
  ).toBeInTheDocument();
});