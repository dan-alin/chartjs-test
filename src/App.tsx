import React from 'react';
import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@views/home';
// import Carousel from '@views/carousel';
import './App.scss';

const RoutesComponent: FC = () => {
  return (
    <Routes>
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
