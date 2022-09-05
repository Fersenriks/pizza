import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Index from './pages/Cart';
import HomePage from './pages/Home';
import NotFound from './components/NotFound';

import './scss/app.scss';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/cart'} element={<Index />} />
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
