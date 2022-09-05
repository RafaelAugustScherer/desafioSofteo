import React, { useContext, useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { ProcedureContext } from '../provider/Procedure';
import ErrorAlert from './ErrorAlert';

const ProcedureList = () => {
  const { procedures, payInstallment } = useContext(ProcedureContext);
  const [listError, setListError] = useState();

  const getFormattedDate = (paymentDates, paid) => (
    moment(paymentDates[paid], 'DD/MM/YYYY').format('L')
  );

  const calculateInstallment = (total, entry, installments) => (
    ((total - entry) / installments).toFixed(2)
  );

  const payInstallmentHandler = async (installmentId) => {
    const response = await payInstallment(installmentId);
    if (response.error) setListError(response.error);
  };

  return (
    <>
    <h2>Caderneta</h2>
    {
      listError && (
      <ErrorAlert content={listError} setContent={setListError} />
      )
    }
    <table>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Procedimento</th>
          <th>Total</th>
          <th>Entrada</th>
          <th>Valor da Parcela</th>
          <th>Parcelas Pagas</th>
          <th>Próxima parcela</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
      {procedures.map((p, k) => (
        <tr key={`${p.client}-${k}`}>
          <td>{p.client}</td>
          <td>{p.procedure}</td>
          <td>R$ {p.total}</td>
          <td>R$ {p.entry}</td>
          <td>R$ {calculateInstallment(p.total, p.entry, p.installments)}</td>
          <td>{p.paid}/{p.installments}</td>
          <td>{getFormattedDate(p.paymentDates, p.paid)}</td>
          <td><button
            type="button"
            disabled={p.paid === p.installments}
            onClick={() => payInstallmentHandler(p._id)}
          >
            Pagar parcela
          </button></td>
        </tr>
      ))}
      </tbody>
    </table>
    </>
  );
};

export default ProcedureList;