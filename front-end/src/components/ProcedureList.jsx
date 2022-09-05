import React, { useContext, useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { ProcedureContext } from '../provider/Procedure';
import ErrorAlert from './ErrorAlert';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import PayInstallmentButton from './PayInstallmentButton';

const ProcedureList = () => {
  const { procedures } = useContext(ProcedureContext);
  const [ listError, setListError ] = useState();

  const getFormattedDate = (paymentDates, paid) => (
    moment(paymentDates[ paid ], 'DD/MM/YYYY').format('L')
  );

  const calculateInstallment = (total, entry, installments) => (
    ((total - entry) / installments).toFixed(2).split('.').join(',')
  );

  const columnFieldGenerate = (field, headerName, minWidth, otherProps) => (
    { field, headerName, minWidth, flex: 1, ...otherProps }
  );

  const columns = [
    columnFieldGenerate('client', 'Cliente', 120),
    columnFieldGenerate('procedure', 'Procedimento', 150),
    columnFieldGenerate('total', 'Total', 100,
      {
        valueFormatter: (item) => `R$ ${item.value}`,
      },
    ),
    columnFieldGenerate('entry', 'Entrada', 100,
      {
        valueFormatter: (item) => `R$ ${item.entry}`,
      },
    ),
    columnFieldGenerate('installment', 'Valor da Parcela', 130,
      {
        valueGetter: ({ row }) => row,
        valueFormatter: ({ value: p }) => `R$ ${calculateInstallment(p.total, p.entry, p.installments)}`,
      },
    ),
    columnFieldGenerate('paidInstallments', 'Parcelas Pagas', 140,
      {
        valueGetter: ({ row }) => row,
        valueFormatter: ({ value: p }) => `${p.paid}/${p.installments}`,
      },
    ),
    columnFieldGenerate('nextInstallmentDate', 'Próxima Parcela', 130, 
      {
        valueGetter: ({ row }) => row,
        valueFormatter: ({ value: p }) => getFormattedDate(p.paymentDates, p.paid),
      },
    ),
    columnFieldGenerate('options', 'Opções', 150,
      {
        valueGetter: ({ row }) => row,
        renderCell: ({ row: p }) => <PayInstallmentButton procedure={p} setError={setListError} />,
      },
    ),
  ];

  const rows = procedures.map((p) => ({ ...p, id: p._id }));

  return (
    <>
      <h2>Caderneta</h2>
      {
        listError && (
          <ErrorAlert content={listError} setContent={setListError} />
        )
      }
      <Box component="div" sx={{ height: '400px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[ 10 ]}
          density="comfortable"
          disableColumnMenu
        />
      </Box>
    </>
  );
};

export default ProcedureList;