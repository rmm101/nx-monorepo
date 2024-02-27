import { createBrowserRouter } from 'react-router-dom';

import Layout from './layout/layout';
import Home from './home/home';
import Products from './products/products';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products',
        element: <Products />,
      },
    ],
  },
]);

export default router;
