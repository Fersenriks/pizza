import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Cart from './pages/Cart';
import HomePage from './pages/HomePage';
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
            <Route path={'/cart'} element={<Cart />} />
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
