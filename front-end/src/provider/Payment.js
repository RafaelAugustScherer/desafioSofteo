import React from 'react';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

export const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = () => {
    const storagePayments = localStorage.getItem('caderneta-payments');
    if (storagePayments) {
      setPayments(JSON.parse(storagePayments));
    }
  };

  const addPayment = (data) => {
    const nextPaymentDate = new Date();
    nextPaymentDate.setDate(nextPaymentDate.getDate() + 30);
    const newPayment = {
      ...data,
      paid: 0,
      nextPaymentDate,
    };
    const updatedPayments = [...payments, newPayment];

    localStorage.setItem(
      'caderneta-payments',
      JSON.stringify(updatedPayments),
    );
    setPayments(updatedPayments);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const value = {
    payments,
    addPayment,
  };

  return (
    <PaymentContext.Provider value={value}>
      { children }
    </PaymentContext.Provider>
  );
};

PaymentProvider.propTypes = {
  children: PropTypes.element,
};

export default PaymentProvider;