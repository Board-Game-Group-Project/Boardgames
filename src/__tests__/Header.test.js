import React from 'react';
import { render, act } from '@testing-library/react';
import Header from '../../src/Components/Header/Header';

it('Does not show dropdown when mounted', () => {
  const { queryByTestId } = render(<Header />)

  const dropdown = queryByTestId('dropdown')

  expect(dropdown).not.toBeTruthy()

})