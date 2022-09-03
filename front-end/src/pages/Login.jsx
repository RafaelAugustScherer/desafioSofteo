import { Alert, AlertTitle } from '@mui/material';
import React, { useContext, useState } from 'react';
import { UserContext } from '../provider/User';

const Login = () => {
  const [formData, setFormData] = useState({
    user: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(false);
  const { login } = useContext(UserContext);

  const handleInput = ({ target: { id, value } }) => (
    setFormData({ ...formData, [id]: value })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(formData.user, formData.password);
    if (!response) setLoginError(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {
        loginError && (
          <Alert severity="error" onClose={() => setLoginError(false)}>
            <AlertTitle>Erro</AlertTitle>
            Usuário ou senha inválidos
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
    </form>
  );
};

export default Login;