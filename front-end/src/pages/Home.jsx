import { Box } from '@mui/material';
import React from 'react';
import Invoice from '../components/Invoice';
import ProcedureForm from '../components/ProcedureForm';
import ProcedureList from '../components/ProcedureList';
import ProcedureProvider from '../provider/Procedure';

const Home = () => {
  return (
    <Box mx={4}>
      <ProcedureProvider>
        <ProcedureForm />
        <ProcedureList />
        <Invoice />
      </ProcedureProvider>
    </Box>
  );
};

export default Home;