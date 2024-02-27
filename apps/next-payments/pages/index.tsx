import { useEffect, useState } from 'react';

import { getCurrentTime } from '@react-monorepo/utils';

const Home = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    setTime(getCurrentTime());
  }, []);

  return (
    <div>
      <h1>Home page</h1>
      <span>Current time: {time}</span>
    </div>
  );
};

export default Home;
