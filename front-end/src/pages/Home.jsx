import React from 'react';
import Invoice from '../components/Invoice';
import ProcedureForm from '../components/ProcedureForm';
import ProcedureList from '../components/ProcedureList';
import ProcedureProvider from '../provider/Procedure';

const Home = () => {

  return (
    <div>
      <ProcedureProvider>
        <ProcedureForm />
        <ProcedureList />
        <Invoice />
      </ProcedureProvider>
    </div>
  );
};

export default Home;