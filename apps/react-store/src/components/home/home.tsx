import { getCurrentTime } from '@react-monorepo/utils';

const Home = () => (
  <div>
    <h1>Home page</h1>
    <span>Current time: {getCurrentTime()}</span>
  </div>
);

export default Home;
