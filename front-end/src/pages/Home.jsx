import React from 'react';
import ProcedureForm from '../components/ProcedureForm';
import ProcedureList from '../components/ProcedureList';
import ProcedureProvider from '../provider/Procedure';

const Home = () => {

  return (
    <div>
      <ProcedureProvider>
        <ProcedureForm />
        <ProcedureList />
      </ProcedureProvider>
    </div>
  );
};

export default Home;