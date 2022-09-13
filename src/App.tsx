import React from 'react';
import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'src/pages/home';
import './App.scss';
import { useTheme } from './contexts/theme/theme.context';
import { Navbar } from '@components/navabr';
import LibTest from '@pages/libtest.page';
import ForceDirectedChart from '@pages/forceDirected.page';
import FlourishChart from '@components/charts/flourish-chart';

const RoutesComponent: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/forcedirectedchart' element={<ForceDirectedChart />} />
      <Route
        path='/flourishchart'
        element={<FlourishChart dataId='11160304' />}
      />
      <Route path='/libtest' element={<LibTest />} />
    </Routes>
  );
};

const App: FC = () => {
  const { theme } = useTheme();
  return (
    <BrowserRouter>
      <main style={{ ...(theme as React.CSSProperties) }}>
        {' '}
        <Navbar />
        <RoutesComponent />
      </main>
    </BrowserRouter>
  );
};

export default App;
1;
