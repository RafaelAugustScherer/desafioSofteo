userId = new ObjectId();

db.users.insertOne({
  _id: userId,
  user: 'Érika',
  password: 'e10adc3949ba59abbe56e057f20f883e',
});

db.procedures.insertMany([
  {
    userId,
    client: 'Neymar Jr.',
    procedure: 'Tratamento de canal',
    total: 300,
    entry: 50,
    installments: 12,
    paid: 0,
    paymentDates: [
        "02/09/2022", "02/10/2022", "02/11/2022",
        "02/12/2022", "02/01/2023", "02/02/2023",
        "02/03/2023", "02/04/2023", "02/05/2023",
        "02/06/2023", "02/07/2023", "02/08/2023"
    ],
  },
  {
    userId,
    client: 'Roberta Sandra',
    procedure: 'Limpeza dentária',
    total: 200,
    entry: 0,
    installments: 6,
    paid: 0,
    paymentDates: [
        "02/09/2022", "02/10/2022", "02/11/2022",
        "02/12/2022", "02/01/2023", "02/02/2023",
    ],
  }
]);