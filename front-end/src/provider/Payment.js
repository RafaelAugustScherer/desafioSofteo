import { createContext, useEffect, useState } from 'react';

export const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = () => {
    const storagePayments = localStorage.getItem('caderneta-payments');
    if (storagePayments) {
      setPayments(JSON.parse(storagePayments));
    }
  }

  const addPayment = (data) => {
    const newPayment = { ...data, paid: 0, nextPayment: new Date() + 30 };
    const updatedPayments = [...payments, newPayment];

    localStorage.setItem(
      'caderneta-payments',
      JSON.stringify(updatedPayments)
    );
    setPayments(updatedPayments);
  }

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

export default PaymentProvider