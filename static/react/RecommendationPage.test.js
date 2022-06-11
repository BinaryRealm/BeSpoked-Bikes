/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import RecommendationPage from './RecommendationPage';

test('Recommendation page properly displayed', () => {
  render(<RecommendationPage />);
  const Button = screen.getByText('Click Me!');
  expect(Button).toBeInTheDocument();
  const Input1 = screen.getByTestId('cuisines');
  expect(Input1).toBeInTheDocument();
  const Input2 = screen.getByTestId('dish_types');
  expect(Input2).toBeInTheDocument();
});
