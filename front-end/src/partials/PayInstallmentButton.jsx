import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import { ProcedureContext } from '../provider/Procedure';

const PayInstallmentButton = ({ procedure, setError }) => {
  const { payInstallment } = useContext(ProcedureContext);

  const payInstallmentHandler = async (procedureId) => {
    const response = await payInstallment(procedureId);
    if (response.error) setError(response.error);
  };

  return (
    <Tooltip title="Pagar parcela">
      <span>
        <IconButton
          aria-label="Pagar parcela"
          disabled={procedure.paid === procedure.installments}
          onClick={() => payInstallmentHandler(procedure._id)}
          sx={{ color: '#118c4f' }}
        >
          <AttachMoney />
        </IconButton>
      </span>
    </Tooltip>
  );
};

PayInstallmentButton.propTypes = {
  procedure: PropTypes.object,
  setError: PropTypes.func,
};

export default PayInstallmentButton;