import { ReactNode } from 'react';

import { Header } from '@react-monorepo/next-components';

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
