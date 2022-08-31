import React, { useContext } from 'react';
import { PaymentContext } from '../provider/Payment';

const PaymentList = () => {
  const { payments } = useContext(PaymentContext);

  const getFormattedDate = (date) => (
    date.toLocaleDateString('pt-BR')
  );

  return (
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
      {payments.map((p, k) => (
        <tr key={`${p.client}-${k}`}>
          <td>{p.client}</td>
          <td>{p.procedure}</td>
          <td>R$ {p.total}</td>
          <td>R$ {p.entry}</td>
          <td>R$ {(p.total - p.entry) / p.installments}</td>
          <td>{p.paid}/{p.installments}</td>
          <td>{getFormattedDate(new Date(p.nextPaymentDate))}</td>
          <td><button
            type="button"
            disabled={p.paid === p.installments}
          >
            Pagar parcela
          </button></td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default PaymentList;