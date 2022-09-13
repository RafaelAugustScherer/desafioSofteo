import React from 'react';
import { Circle } from '@mui/icons-material';
import { Box } from '@mui/material';

const ProcedureListFooter = () => {
  const statusCaption = [
    { status: 'Pago', color: '#b8fcca' },
    { status: 'Em dia', color: '#f7f7f7' },
    { status: 'Atrasado', color: '#fac3c3' },
  ];

  return (
    <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
      Status:
      {
        statusCaption.map(({ status, color }) => (
          <Box
            key={`procedure-list-footer-${status}`}
            sx={{ ml: 3, display: 'flex', 'alignItems': 'center' }}
          >
            <Circle
              sx={{ color, mr: 1 }}
            />
            {status}
          </Box>
        ))
      }
    </Box>
  );
};

export default ProcedureListFooter;