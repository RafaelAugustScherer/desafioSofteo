import { Box } from '@mui/material';
import React from 'react';
import { BsJournalText } from 'react-icons/bs';

const Header = () => (
  <Box component="header" sx={{
    backgroundColor: '#282c34',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'calc(16px + 2vmin)',
    color: 'white',
    minWidth: '100%',
    '& svg': { marginRight: '15px' },
  }}>
    <BsJournalText />
    <p>Caderneta Online</p>
  </Box>
);

export default Header;