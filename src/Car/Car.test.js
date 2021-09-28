import { render, screen } from '@testing-library/react';
import Car from './Car';

test('renders learn react link', () => {
  render(<Car />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
