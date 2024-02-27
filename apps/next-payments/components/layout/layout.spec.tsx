import { render, screen } from '@testing-library/react';

import Layout from './layout';

describe('Layout', () => {
  it('renders the Layout component', () => {
    render(
      <Layout>
        <div>Test Child</div>
      </Layout>
    );
    expect(screen.getByText('Test Child')).toBeTruthy();
    expect(screen.getByText('101 Ways')).toBeTruthy();
  });
});
