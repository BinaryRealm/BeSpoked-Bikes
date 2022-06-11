/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import React from 'react';
import SearchPage from './SearchPage';
import '@testing-library/jest-dom';

test('Search page properly displayed', () => {
  render(<SearchPage />);
  const Button = screen.getByText('Search');
  expect(Button).toBeInTheDocument();
  const Input = screen.getByTestId('input-field');
  expect(Input).toBeInTheDocument();
});
