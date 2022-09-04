import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const UserProvider = () => {
  const { REACT_APP_SERVER } = process.env;
  const [cookies, setCookie] = useCookies(['caderneta-token']);
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

      if (authStatus) {
        navigate('/');
        return;
      }
    }

    if (AUTH_PAGES.includes(location.pathname)) return;

    navigate('/login');
  };

  const login = async (user, password) => {
    const response = await axios.post(
      `${REACT_APP_SERVER}/user/login`,
      { user, password },
    ).catch(({ response }) => response.data);

    if (response.error) return response;

    const { token } = response.data;
    const tokenExpirationDate = new Date();
    tokenExpirationDate.setDate(tokenExpirationDate.getDate() + 2);
    setCookie(
      'caderneta-token', token, { expires: tokenExpirationDate },
    );
    authenticate(token);
    
    return response;
  };

  const register = async (user, password) => {
    const response = await axios.post(
      `${REACT_APP_SERVER}/user/register`,
      { user, password },
    ).catch(({ response }) => response.data);
    
    return response;
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