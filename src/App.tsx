import React from 'react';
import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'src/pages/home';
import './App.scss';
import { useTheme } from './contexts/theme/theme.context';
import { Navbar } from '@components/navabr';
import Flourish from '@pages/flurish.page';
import ForceDirectedChart from '@pages/force-directed.page';
import FlourishChart from '@components/charts/flourish-chart';
import routes from './routes';
// import LineChartAm from '@components/charts/line-chart-am/line-chart-am.component';
import DoughnutAm from '@pages/doughhnutam.page';
// import { AMChartDataGenerator } from './utils';
import LineChartAmPage from '@pages/line-chart-am.page';

const hideNavbar = [
  '/linechart',
  '/forcedirectedchart',
  '/flourishchart',
  '/doughnut',
];
// const customData = AMChartDataGenerator('am_linearea')

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
        element={
          <FlourishChart
            dataId='11160304'
            customOptions={{ windowHeight: true }}
          />
        }
      />
      <Route path={routes.linechart} element={<LineChartAmPage />} />
      <Route path={routes.flourish} element={<Flourish />} />
      <Route path={routes.doughnutam} element={<DoughnutAm />} />
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
        <div id={'chartEvents'}></div>
        <div id={'chartEventsListen'}></div>
      </main>
    </BrowserRouter>
  );
};

export default App;
1;
