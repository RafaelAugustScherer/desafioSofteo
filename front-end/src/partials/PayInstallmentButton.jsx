import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { ProcedureContext } from '../provider/Procedure';

const PayInstallmentButton = ({ procedure, setError }) => {
  const { payInstallment } = useContext(ProcedureContext);

  const payInstallmentHandler = async (installmentId) => {
    const response = await payInstallment(installmentId);
    if (response.error) setError(response.error);
  };

  return (
    <Button
      variant="contained"
      size="small"
      disabled={procedure.paid === procedure.installments}
      onClick={() => payInstallmentHandler(procedure._id)}
    >
      Pagar parcela
    </Button>
  );
};

PayInstallmentButton.propTypes = {
  procedure: PropTypes.object,
  setError: PropTypes.func,
};

export default PayInstallmentButton;