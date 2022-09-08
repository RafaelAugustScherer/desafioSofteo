import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import InvoiceForm from '../partials/InvoiceForm';

const Invoice = () => {
  const [ invoice, setInvoice ] = useState({
    received: 0,
    unreceived: 0,
  });

  const convertNumberToBRL = (number) => (
    `R$ ${String(number.toFixed(2)).split('.').join(',')}`
  );

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mx: 5,
    }}>
      <h2>Calcular Faturamento</h2>
      <InvoiceForm setInvoice={setInvoice} />
      <List sx={{
        width: 'min(720px, 100%)',
        bgcolor: '#fff5f5',
        borderRadius: '10px',
        mt: 3,
      }}>
        <ListItem>
          <ListItemText>
            Pagamentos Recebidos (Líquido): {convertNumberToBRL(invoice.received)}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Pagamentos Atrasados: {convertNumberToBRL(invoice.unreceived)}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Faturamento Total (Bruto): {convertNumberToBRL(invoice.received + invoice.unreceived)}
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );
};

export default Invoice;