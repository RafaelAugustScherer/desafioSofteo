import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import UserProvider from './provider/User';

const App = () => {
  const [cookies, setCookie] = useCookies(['caderneta-user']);

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
