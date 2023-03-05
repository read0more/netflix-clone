import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

it('Render App and check Hello World!', () => {
  render(<App />);
  expect(screen.getByText('Hello World!')).toBeInTheDocument();
});
