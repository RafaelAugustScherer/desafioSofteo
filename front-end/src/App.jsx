import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import UserProvider from './provider/User';

const App = () => {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
};

export default App;
