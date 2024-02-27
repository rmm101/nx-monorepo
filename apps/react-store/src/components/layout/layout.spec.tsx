import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Layout from './layout';

describe('Layout', () => {
  it('renders the Layout component', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    expect(screen.getByText('101 Ways')).toBeTruthy();
  });
});
