import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './Header';
import LinkList from "./LinkList"
import LinkCreate from './LinkCreate';
import './../styles/App.css';


const App = () => {
  return (
    <div className='center w85'>
      <Header />
      
      <div className='ph3 pv1 background-gray'>
        <Routes>
          <Route path="/" element={<LinkList />} />
          <Route path="/create" element={<LinkCreate/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
