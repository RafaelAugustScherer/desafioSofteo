import React from 'react';
import PaymentForm from '../components/PaymentForm';
import PaymentList from '../components/PaymentList';
import PaymentProvider from '../provider/Payment';

const Home = () => {

  return (
    <div>
      <PaymentProvider>
        <PaymentForm />
        <PaymentList />
      </PaymentProvider>
    </div>
  );
};

export default Home;