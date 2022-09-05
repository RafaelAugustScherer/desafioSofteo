import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UserContext } from '../provider/User';
import ErrorAlert from '../components/ErrorAlert';

const Register = () => {
  const [ formData, setFormData ] = useState({
    user: '',
    password: '',
  });
  const [ registerError, setRegisterError ] = useState();
  const [ showPassword, setShowPassword ] = useState();
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInput = ({ target: { id, value } }) => (
    setFormData({ ...formData, [ id ]: value })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register(formData.user, formData.password);

    if (response.error) setRegisterError(response.error);
    else navigate('/login');
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
      <h2>Formulário de cadastro</h2>
      {
        registerError && (
          <ErrorAlert content={registerError} setContent={setRegisterError} />
        )
      }
      <TextField
        id="user"
        label="Usuário"
        onChange={handleInput}
        value={formData.user}
        inputProps={{ minLength: 5 }}
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
          inputProps={{ minLength: 6 }}
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
        Cadastrar
      </Button>
      <Box component="p" sx={{ fontWeight: 'bold' }}>
        Já tem um cadastro? <a href="/login">Faça o login</a>
      </Box>
    </Box>
  );
};

export default Register;