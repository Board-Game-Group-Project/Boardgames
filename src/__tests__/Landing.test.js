import React from 'react';
import { render, act } from '@testing-library/react';
import Landing from '../../src/Components/Landing/Landing';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { players } from './__data__/testData';

it('Renders out a post widget', async () => {
  const player = players[0];
  jest
    .spyOn(axios, 'get')
    .mockImplementation(() => Promise.resolve({ data: player }));
});
