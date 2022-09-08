import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsJournalText } from 'react-icons/bs';
import { ExitToApp } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { UserContext } from '../provider/User';

const Header = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <Box component="header" sx={{
      backgroundColor: '#282c34',
      fontSize: 'calc(16px + 2vmin)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100px',
      '& svg': { marginRight: '15px' },
    }}>
      <BsJournalText />
      <span>Caderneta Online</span>
      <Button
        variant="text"
        endIcon={<ExitToApp />}
        disableElevation
        color="secondary"
        size="large"
        sx={{
          position: 'absolute',
          right: '10px',
          top: '35px',
        }}
        onClick={handleLogout}
      >
        Sair
      </Button>
    </Box>
  );
};

export default Header;