import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertTitle } from '@mui/material';
import { UserContext } from '../provider/User';

const Login = () => {
  const [formData, setFormData] = useState({
    user: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(false);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInput = ({ target: { id, value } }) => (
    setFormData({ ...formData, [id]: value })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(formData.user, formData.password);
    if (response.error) setLoginError(response.error);
    else navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      {
        loginError && (
          <Alert severity="error" onClose={() => setLoginError(false)}>
            <AlertTitle>Erro</AlertTitle>
            { loginError }
          </Alert>
        )
      }
      <label htmlFor="user">Usuário: </label>
      <input
        type="text"
        id="user"
        name="user"
        onChange={handleInput}
        value={formData.user}
        required
      />
      <label htmlFor="password">Senha: </label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handleInput}
        value={formData.password}
        required
      />
      <button type="submit">Entrar</button>
      Não tem conta ainda? <a href="/register">Clique aqui para se cadastrar</a>
    </form>
  );
};

export default Login;