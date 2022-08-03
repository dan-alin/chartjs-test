import React from 'react';
import type { FC } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Home from '@views/home';
// import Carousel from '@views/carousel';
import { useIdleTimer } from 'react-idle-timer';

const RoutesComponent: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onIdle = () => {
    if (location.pathname === '/' || location.pathname === '/video') return;
    navigate('/');
  };

  useIdleTimer({
    onIdle,
    timeout: 1000 * 60,
    promptTimeout: 0,
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
      'visibilitychange',
    ],
    immediateEvents: [],
    debounce: 0,
    throttle: 0,
    eventsThrottle: 200,
    element: document,
    startOnMount: true,
    startManually: false,
    stopOnIdle: false,
    crossTab: false,
    syncTimers: 0,
  });

  return (
    <Routes>
      {/*
      <Route
        path='/'
        // element={<Carousel lockbody={true} />}
        element={<ScreenSaver lockbody={false} />}
      />
      */}
      <Route path='/' element={<Home />} />
    </Routes>
  );
};

const App: FC = () => (
  <BrowserRouter>
    <main>
      <RoutesComponent />
    </main>
  </BrowserRouter>
);

export default App;
