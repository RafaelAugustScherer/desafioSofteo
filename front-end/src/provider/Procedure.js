import React from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';
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
    const paymentDates = data.installments === 0
      ? [moment().format('L')]
      : calculatePaymentDates(data.installments);
    const payload = { ...data, paymentDates };
    
    const response = await axios.post(
      `${REACT_APP_SERVER}/procedure`,
      payload,
      { headers: { 'Authorization': cookies['caderneta-token'] } },
      ).catch(({ response }) => response.data);
      
    if (!response.error) {
      const updatedProcedures = [...procedures, {...payload, _id: response.data._id, paid: 0}];

      setProcedures(updatedProcedures);
    }
    return response;
  };

  const deleteProcedure = async (procedureId) => {

    const response = await axios.delete(
      `${REACT_APP_SERVER}/procedure`,
      { 
        headers: { 'Authorization': cookies['caderneta-token'] },
        data: { id: procedureId },
      },
    ).catch(({ response }) => response.data);

    if (!response.error) {
      const updatedProcedures = procedures.filter((p) => p._id !== procedureId);
      setProcedures(updatedProcedures);
    }
    return response;
  };

  const payInstallment = async (procedureId) => {
    const procedure = procedures.find(({ _id }) => _id === procedureId);
    const paid = procedure.paid + 1;

    const response = await axios.patch(
      `${REACT_APP_SERVER}/procedure`,
      { id: procedureId, paid },
      { headers: { 'Authorization': cookies['caderneta-token'] } },
    ).catch(({ response }) => response.data);

    if (!response.error) {
      const updatedProcedures = procedures.map((p) => {
        if (p._id === procedureId) p.paid = paid;
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
    deleteProcedure,
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