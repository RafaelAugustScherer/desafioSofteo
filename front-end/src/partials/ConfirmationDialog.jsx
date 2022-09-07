import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ConfirmationDialog = ({ title, message, confirmationColor, isOpen, setIsOpen, onConfirm }) => (
  <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => setIsOpen(false)}
        autoFocus
        sx={{ color: '#000000' }}
        >
          Fechar
      </Button>
      <Button
        onClick={() => onConfirm()}
        sx={{ color: '#ffffff', bgcolor: confirmationColor }}
      >
        Confirmar
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmationDialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmationColor: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationDialog;