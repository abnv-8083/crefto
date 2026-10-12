import React, { useState } from 'react';
import { Home } from './pages/Home/Home';
import { Loading } from './components/Loading/Loading';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loading onFinish={() => setIsLoading(false)} duration={4000} />}
      <Home />
    </>
  );
};

export default App;
