import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const UserProvider = () => {
  const { REACT_APP_SERVER } = process.env;
  const [cookies, setCookie, removeCookie] = useCookies(['caderneta-token']);
  const [user, setUser] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const authenticate = async (token) => {
    try {
      const response = await axios.get(
        `${REACT_APP_SERVER}/user/authenticate`,
        { headers:  { 'Authorization': token || cookies['caderneta-token'] } },
      );
      setUser(response.data);
      return true;
    } catch (e) {
      return false;
    }
  };

  const switchPageIfUnauthorized = async () => {
    const AUTH_PAGES = ['/login', '/register'];
    
    if (cookies['caderneta-token']) {
      const authStatus = await authenticate();
      if (authStatus && AUTH_PAGES.includes(location.pathname)) {
        navigate('/');
        return;
      }
    }
    
    removeCookie('caderneta-token');
    navigate('/login');
  };

  const login = async (user, password) => {
    try {
      console.log(user, password);
      const { data: { token } } = await axios.post(
        `${REACT_APP_SERVER}/user/login`,
        { user, password },
      );
      setCookie('caderneta-token', token, { maxAge: 86400 });
      authenticate(token);
      navigate('/');
    } catch (e) {
      return false;
    }
  };

  const register = async () => {
    try {
      await axios.post(
        `${REACT_APP_SERVER}/user/register`,
        { user, password },
      );
      navigate('/login');
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    switchPageIfUnauthorized();
  }, []);

  const value = {
    user,
    login,
    register,
  };

  return (
    <UserContext.Provider value={value}>
      <Outlet />
    </UserContext.Provider>
  );
};

export default UserProvider;