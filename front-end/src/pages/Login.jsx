import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UserContext } from '../provider/User';
import ErrorAlert from '../components/ErrorAlert';

const Login = () => {
  const [formData, setFormData] = useState({
    user: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(false);
  const [ showPassword, setShowPassword ] = useState();
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '720px',
      }}
      mx={5}
    >
      <h2>Formulário de login</h2>
      {
        loginError && (
          <ErrorAlert content={loginError} setContent={setLoginError} />
        )
      }
      <TextField
        id="user"
        label="Usuário"
        onChange={handleInput}
        value={formData.user}
        fullWidth
        margin="normal"
      />
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel htmlFor="password">Senha</InputLabel>
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          id="password"
          onChange={handleInput}
          value={formData.password}
          label="Senha"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="mudar visibilidade da senha"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
      >
        Entrar
      </Button>
      <Box component="p" sx={{ fontWeight: 'bold' }}>
      Não tem conta ainda? <a href="/register">Clique aqui para se cadastrar</a>
      </Box>
    </Box>
  );
};

export default Login;