import { render, screen } from '@testing-library/react';
import Cars from './Cars';

test('renders learn react link', () => {
  render(<Cars />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
