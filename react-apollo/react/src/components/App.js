import React, { Component } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Header from './Header';
import Login from './Login'
import Search from './Search';
import LinkCreate from './LinkCreate';
import './../styles/App.css';
import LinkList from './LinkList';


const App = () => {
  return (
    <div className='center w85'>
      <Header />
      
      <div className='ph3 pv1 background-gray'>
        <Routes>
          <Route path="/" element={<Navigate replace to="/new/1" />} />
          <Route path="/create" element={<LinkCreate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path='/top' element={<LinkList />} />
          <Route path='/new/:page' element={<LinkList />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
