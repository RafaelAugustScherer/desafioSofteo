import React, { useContext, useState } from 'react';
import { UserContext } from '../provider/User';

const Login = () => {
  const [formData, setFormData] = useState({
    user: '',
    password: '',
  });
  const { login } = useContext(UserContext);

  const handleInput = ({ target: { id, value } }) => (
    setFormData({ ...formData, [id]: value })
  );

  const handleSubmit = () => (
    login(formData.user, formData.password)
  );

  return (
    <form>
      <label htmlFor="user">Usuário: </label>
      <input
        type="text"
        id="user"
        name="user"
        onChange={handleInput}
        value={formData.user}
      />
      <label htmlFor="password">Senha: </label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handleInput}
        value={formData.password}
      />
      <button type="button" onClick={handleSubmit}>Entrar</button>
    </form>
  );
};

export default Login;