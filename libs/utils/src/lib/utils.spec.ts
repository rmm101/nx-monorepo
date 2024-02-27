import { getCurrentTime } from './utils';

describe('getCurrentTime', () => {
  it('returns the current time', () => {
    // Mock the Date object
    const fixedDate = new Date('2023-01-01T12:00:00');
    jest
      .spyOn(global, 'Date')
      .mockImplementation(() => fixedDate as unknown as Date);

    expect(getCurrentTime()).toBe(fixedDate.toLocaleTimeString());

    // Restore the original implementation
    jest.restoreAllMocks();
  });
});
