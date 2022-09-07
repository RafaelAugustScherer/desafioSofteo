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
    <>
      <h2>Calcular Faturamento</h2>
      <InvoiceForm setInvoice={setInvoice} />
      <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <List sx={{ width: 'min(720px, 100%)', bgcolor: '#fff5f5' }}>
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
    </>
  );
};

export default Invoice;