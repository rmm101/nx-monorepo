import { AppProps } from 'next/app';

import './styles.css';
import Layout from '../components/layout/layout';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default CustomApp;
