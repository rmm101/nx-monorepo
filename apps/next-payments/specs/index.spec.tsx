import React from 'react';
import { screen, render } from '@testing-library/react';
import * as utils from '@react-monorepo/utils';

import Home from '../pages';

// Mock getCurrentTime
jest.mock('@react-monorepo/utils', () => ({
  getCurrentTime: jest.fn(),
}));

describe('Home', () => {
  it('renders the Home component', () => {
    render(<Home />);
    expect(screen.getByText('Home page')).toBeTruthy();
  });

  it('displays the current time', () => {
    // Set up the mock return value
    const mockedGetCurrentTime = utils.getCurrentTime as jest.Mock;
    mockedGetCurrentTime.mockReturnValue('12:00:00 PM');

    render(<Home />);
    expect(screen.getByText('Current time: 12:00:00 PM')).toBeTruthy();

    // Restore the original implementation
    mockedGetCurrentTime.mockRestore();
  });
});
