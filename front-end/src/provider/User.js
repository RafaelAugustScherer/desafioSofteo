import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const UserProvider = (props) => {
  const [cookies, setCookie] = useCookies(['caderneta-user']);
  const [user, setUser] = useState(cookies['caderneta-user']);
  const location = useLocation();
  const navigate = useNavigate();

  const switchPageIfUnauthorized = async () => {
    const AUTHORIZED_PAGES = ['/login', '/register'];
    
    if (
      !cookies['caderneta-user']
      && !AUTHORIZED_PAGES.includes(location.pathname)
    ) {
      navigate('/login');
    }
  };

  const login = (user, password) => {
    setUser(user);
    setCookie('caderneta-user', user, { maxAge: 86400 });
    navigate('/');
  };

  const register = (user, password) => {
    navigate('/login');
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