import { render, screen } from '@testing-library/react';
import Slider from './Slider';

test('renders learn react link', () => {
  render(<Slider />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
