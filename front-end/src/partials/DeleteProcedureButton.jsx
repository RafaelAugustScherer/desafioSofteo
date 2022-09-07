import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { ProcedureContext } from '../provider/Procedure';
import ConfirmationDialog from './ConfirmationDialog';

const DeleteProcedureButton = ({ procedure, setError }) => {
  const { deleteProcedure } = useContext(ProcedureContext);
  const [ procedureToDelete, setProcedureToDelete ] = useState(null);
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);

  const onDialogConfirm = async () => {
    const response = await deleteProcedure(procedureToDelete);
    if (response.error) setError(response.error);
  };

  const deleteProcedureHandler = (procedureId) => {
    setProcedureToDelete(procedureId);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    if (!isDialogOpen) setProcedureToDelete(null);
  }, [ isDialogOpen ]);

  return (
    <>
      <ConfirmationDialog
        title="Tem certeza que deseja apagar o procedimento?"
        message="O procedimento será apagado da lista e não será incluído no cálculo de faturamento!"
        confirmationColor="#f75252"
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onConfirm={onDialogConfirm}
      />
      <Tooltip title="Apagar procedimento">
        <IconButton
          aria-label="Apagar procedimento"
          onClick={() => deleteProcedureHandler(procedure._id)}
          sx={{ color: '#f75252' }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </>
  );
};

DeleteProcedureButton.propTypes = {
  procedure: PropTypes.object,
  setError: PropTypes.func,
};

export default DeleteProcedureButton;