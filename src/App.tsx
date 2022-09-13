import React from 'react';
import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'src/pages/home';
import './App.scss';
import { useTheme } from './contexts/theme/theme.context';
import { Navbar } from '@components/navabr';
import LibTest from '@pages/libtest.page';
import ForceDirectedChart from '@pages/force-directed.page';
import FlourishChart from '@components/charts/flourish-chart';
import AmCharts from '@pages/amcharts.page';
import routes from './routes';
import LineChartAm from '@components/charts/line-chart-am/line-chart-am.component';

const hideNavbar = ['/linechart', '/forcedirectedchart', '/flourishchart'];

const RoutesComponent: FC = () => {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route
        path={routes.forcedirectedchart}
        element={<ForceDirectedChart />}
      />
      <Route
        path={routes.flourishchart}
        element={<FlourishChart dataId='11160304' />}
      />
      <Route path={routes.linechart} element={<LineChartAm />} />
      <Route path={routes.flourish} element={<LibTest />} />
      <Route path={routes.amcharts} element={<AmCharts />} />
    </Routes>
  );
};

const App: FC = () => {
  const { theme } = useTheme();
  const pathname = window.location.pathname;
  const showNavbar = !hideNavbar.includes(pathname);
  return (
    <BrowserRouter>
      <main style={{ ...(theme as React.CSSProperties) }}>
        {' '}
        {showNavbar && <Navbar />}
        <RoutesComponent />
      </main>
    </BrowserRouter>
  );
};

export default App;
1;
