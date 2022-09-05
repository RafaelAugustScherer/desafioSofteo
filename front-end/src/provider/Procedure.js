import React from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { calculatePaymentDates } from '../utilities/date';

export const ProcedureContext = createContext();

const ProcedureProvider = ({ children }) => {
  const { REACT_APP_SERVER } = process.env;
  const [cookies] = useCookies(['caderneta-token']);
  const [procedures, setProcedures] = useState([]);

  const fetchProcedures = async () => {
    const response = await axios.get(
      `${REACT_APP_SERVER}/procedure`,
      { headers: { 'Authorization': cookies['caderneta-token'] } },
    );

    setProcedures(response.data);
  };

  const addProcedure = async (data) => {
    const paymentDates = calculatePaymentDates(data.installments);

    const payload = { ...data, paymentDates };
    const updatedProcedures = [...procedures, {...payload, paid: 0}];

    console.log(payload);
    const response = await axios.post(
      `${REACT_APP_SERVER}/procedure`,
      payload,
      { headers: { 'Authorization': cookies['caderneta-token'] } },
    ).catch(({ response }) => response.data);

    if (!response.error) setProcedures(updatedProcedures);
    return response;
  };

  const payInstallment = async (installmentId) => {
    const procedure = procedures.find(({ _id }) => _id === installmentId);
    const paid = procedure.paid + 1;

    const response = await axios.patch(
      `${REACT_APP_SERVER}/procedure`,
      { id: installmentId, paid },
      { headers: { 'Authorization': cookies['caderneta-token'] } },
    ).catch(({ response }) => response.data);

    if (!response.error) {
      const updatedProcedures = procedures.map((p) => {
        if (p._id === installmentId) p.paid = paid;
        return p;
      });
      setProcedures(updatedProcedures);
    }
    return response;
  };

  useEffect(() => {
    if (cookies['caderneta-token']) fetchProcedures();
  }, []);

  const value = {
    procedures,
    addProcedure,
    payInstallment,
  };

  return (
    <ProcedureContext.Provider value={value}>
      { children }
    </ProcedureContext.Provider>
  );
};

ProcedureProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default ProcedureProvider;