import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Box, FormControlLabel, Checkbox, Button } from '@mui/material';
import { ProcedureContext } from '../provider/Procedure';
import DatePickerField from './DatePickerField';

const InvoiceForm = ({ setInvoice }) => {
  const [startDate, setStartDate] = useState(moment().startOf('month'));
  const [endDate, setEndDate] = useState(moment().endOf('month'));
  const [allPeriods, setAllPeriods] = useState(false);
  const [futurePayments, setFuturePayments] = useState(false);
  const { procedures } = useContext(ProcedureContext);
  
  const calculateInstallment = (total, entry, installments) => (
    installments === 0
      ? total
      : (total - entry) / installments
  );

  const isDateWithinPeriod = (date) => (
    allPeriods ? true : (date >= startDate && date <= endDate)
  );

  const getProcedureTotalByPeriod = (procedure) => {
    const { total, entry, paid, paymentDates, installments } = procedure;
    const installmentValue = calculateInstallment(total, entry, installments);

    let paidTotal = entry;
    let unpaidTotal = 0;
    paymentDates.forEach((dateString, dateIndex) => {
      const date = moment(dateString, 'DD/MM/YYYY');

      if (isDateWithinPeriod(date)) {
        if (dateIndex < paid || installments === 0) paidTotal += +installmentValue;
        else if (date < moment()) unpaidTotal += +installmentValue;
        else if (futurePayments) paidTotal += +installmentValue;
      }
    });

    return { paidTotal, unpaidTotal };
  };

  const calculateInvoice = () => {
    let receivedTotal = 0;
    let unreceivedTotal = 0;

    procedures.forEach((p) => {
      const { paidTotal, unpaidTotal } = getProcedureTotalByPeriod(p);
      receivedTotal += paidTotal;
      unreceivedTotal += unpaidTotal;
    }, 0);

    setInvoice({ received: receivedTotal, unreceived: unreceivedTotal });
  };

  useEffect(() => {
    procedures && calculateInvoice();
  }, [procedures]);
  
  return (
    <Box component="form" sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& .MuiBox-root > *': {
        mx: 2,
        my: 2,
      },
    }}>
      <Box>
        <DatePickerField
          label="Data de in??cio"
          date={startDate}
          setDate={setStartDate}
          disabled={allPeriods}
        />
        <DatePickerField
          label="Data final"
          date={endDate}
          setDate={setEndDate}
          disabled={allPeriods}
        />
      </Box>
      <Box sx={{ textAlign: 'left' }}>
        <FormControlLabel
          control={<Checkbox />}
          onChange={() => setAllPeriods(!allPeriods)}
          checked={allPeriods}
          label="Todos os per??odos"
        />
        <FormControlLabel
          control={<Checkbox />}
          onChange={() => setFuturePayments(!futurePayments)}
          checked={futurePayments}
          label="Incluir pagamentos futuros (n??o efetuados)"
        />
      </Box>
      <Button
        variant="contained"
        size="large"
        onClick={calculateInvoice}
        fullWidth
      >
        Calcular
      </Button>
    </Box>
  );
};

InvoiceForm.propTypes = {
  setInvoice: PropTypes.func,
};

export default InvoiceForm;