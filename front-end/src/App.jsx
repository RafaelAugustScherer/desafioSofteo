import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import UserProvider from './provider/User';

const App = () => {
  return (
    <UserProvider>
      <Header />
      <div className="App">
        <Outlet />
      </div>
    </UserProvider>
  );
};

export default App;
