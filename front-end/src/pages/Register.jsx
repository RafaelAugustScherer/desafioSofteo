import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../provider/User';
import ErrorAlert from '../components/ErrorAlert';

const Register = () => {
  const [formData, setFormData] = useState({
    user: '',
    password: '',
  });
  const [registerError, setRegisterError] = useState();
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInput = ({ target: { id, value } }) => (
    setFormData({ ...formData, [id]: value })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register(formData.user, formData.password);
    
    if (response.error) setRegisterError(response.error);
    else navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      {
        registerError && (
          <ErrorAlert content={registerError} setContent={setRegisterError} />
        )
      }
      <label htmlFor="user">Usuário: </label>
      <input
        type="text"
        id="user"
        name="user"
        onChange={handleInput}
        value={formData.user}
        minLength="5"
        required
      />
      <label htmlFor="password">Senha: </label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handleInput}
        value={formData.password}
        minLength="6"
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default Register;