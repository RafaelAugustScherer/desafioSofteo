import { useContext } from 'react';
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
          <th>Total (R$)</th>
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
          <td>{p.total}</td>
          <td>{p.paid}/{p.installments}</td>
          <td>{getFormattedDate(new Date(p.nextPaymentDate))}</td>
          <td></td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default PaymentList;