import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders KÈNE AUDIT title', () => {
  render(<App />);
  const titleElement = screen.getByText(/KÈNE/i);
  expect(titleElement).toBeInTheDocument();
});
