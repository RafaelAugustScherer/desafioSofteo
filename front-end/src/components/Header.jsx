import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BsJournalText } from 'react-icons/bs';
import { ExitToApp } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { UserContext } from '../provider/User';

const Header = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <Grid container component="header" sx={{
      bgcolor: '#282c34',
      fontSize: 'calc(16px + 2vmin)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100px',
      '& svg': { marginRight: '15px' },
    }}>
      <Grid item xs></Grid>
      <Grid item xs={7}>
        <BsJournalText />
        <span>Caderneta Online</span>
      </Grid>
      <Grid item xs>
        {
          location.pathname === '/' && (
            <Button
              variant="contained"
              endIcon={<ExitToApp />}
              disableElevation
              color="secondary"
              size="large"
              onClick={handleLogout}
            >
              Sair
            </Button>
          )
        }
      </Grid>
    </Grid>
  );
};

export default Header;