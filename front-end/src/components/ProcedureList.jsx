import React, { useContext, useState } from 'react';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import 'moment/locale/pt-br';
import { ProcedureContext } from '../provider/Procedure';
import ErrorAlert from '../partials/ErrorAlert';
import PayInstallmentButton from '../partials/PayInstallmentButton';
import DeleteProcedureButton from '../partials/DeleteProcedureButton';
import SearchField from '../partials/SearchField';

const ProcedureList = () => {
  const { procedures } = useContext(ProcedureContext);
  const [ listError, setListError ] = useState();
  const [ filteredProcedures, setFilteredProcedures ] = useState(procedures);

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
        valueFormatter: (item) => `R$ ${item.value}`,
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
        sortComparator: (v1, v2) => {
          const date1 = moment(v1.paymentDates[v1.paid], 'DD/MM/YYYY');
          const date2 = moment(v2.paymentDates[v2.paid], 'DD/MM/YYYY');
          return date1 - date2;
        },
      },
    ),
    columnFieldGenerate('options', 'Opções', 150,
      {
        valueGetter: ({ row }) => row,
        renderCell: ({ row: p }) => (
          <>
            <PayInstallmentButton procedure={p} setError={setListError} />
            <DeleteProcedureButton procedure={p} setError={setListError} />
          </>
        ),
      },
    ),
  ];

  const rows = filteredProcedures.map((p) => ({ ...p, id: p._id }));

  return (
    <>
      <h2>Caderneta</h2>
      {
        listError && (
          <ErrorAlert content={listError} setContent={setListError} />
        )
      }
      <Box
        component="div"
        sx={{
          height: '450px',
          display: 'flex',
          flexDirection: 'column',
          '& .MuiTextField-root': { alignSelf: 'start', ml: 2, mb: 2 },
          '& .lateInstallmentRow': {
            bgcolor: '#fac3c3',
            '&:hover': { bgcolor: '#ebb2b2' },
          },
        }}
      >
        <SearchField
          arrayToSearch={procedures}
          fieldToSearch="client"
          setToResult={setFilteredProcedures}
          placeholder="Buscar por cliente..."
        />
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[ 10 ]}
          density="comfortable"
          disableColumnMenu
          disableSelectionOnClick
          getRowClassName={({ row: p }) => {
            const nextPaymentDate = getFormattedDate(p.paymentDates, p.paid);
            if (moment() > moment(nextPaymentDate, 'DD/MM/YYYY')) {
              return 'lateInstallmentRow';
            }
          }}
          initialState={{ sorting: { sortModel: [{
            field: 'nextInstallmentDate',
            sort: 'asc',
          }] } }}
        />
      </Box>
    </>
  );
};

export default ProcedureList;