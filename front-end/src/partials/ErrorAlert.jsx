import { Alert, AlertTitle } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const ErrorAlert = ({ content, setContent }) => (
  <Alert severity="error" onClose={() => setContent()}>
    <AlertTitle>Erro</AlertTitle>
    { content }
  </Alert>
);

ErrorAlert.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func,
};

export default ErrorAlert;