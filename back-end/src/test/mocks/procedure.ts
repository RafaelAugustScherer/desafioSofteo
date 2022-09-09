const validProcedure = {
  client: 'Neymar Jr.',
  procedure: 'Tratamento de canal',
  total: 300,
  entry: 50,
  installments: 12,
  paymentDates: [
    '02/09/2022', '02/10/2022', '02/11/2022',
    '02/12/2022', '02/01/2023', '02/02/2023',
    '02/03/2023', '02/04/2023', '02/05/2023',
    '02/06/2023', '02/07/2023', '02/08/2023',
  ],
};

const invalidProcedures = [
  {
    client: 'Neymar Jr.',
    total: 300,
    entry: 50,
    installments: 12,
    paymentDates: [
      '02/09/2022', '02/10/2022', '02/11/2022',
      '02/12/2022', '02/01/2023', '02/02/2023',
      '02/03/2023', '02/04/2023', '02/05/2023',
      '02/06/2023', '02/07/2023', '02/08/2023',
    ],
  },
  {
    client: 'Neymar Jr.',
    procedure: 'Tratamento de canal',
    total: 300,
    entry: 50,
    installments: 40,
    paymentDates: [
      '02/09/2022', '02/10/2022', '02/11/2022',
      '02/12/2022', '02/01/2023', '02/02/2023',
      '02/03/2023', '02/04/2023', '02/05/2023',
      '02/06/2023', '02/07/2023', '02/08/2023',
    ],
  },
];

export default {
  validProcedure,
  invalidProcedures,
};