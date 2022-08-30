import { useContext, useState } from 'react';
import { PaymentContext } from '../provider/Payment';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    client: '',
    value: '',
    paymentMethod: '0'
  });
  const { addPayment } = useContext(PaymentContext);

  const handleInput = ({ target: { id, value } }) => (
    setFormData({ ...formData, [id]: value })
  );

  const handleSubmit = () => (
    addPayment({
      ...formData,
      paymentMethod: +formData.paymentMethod,
    })
  );

  return (
    <form>
        <h2>Inserir nova consulta</h2>
        <label htmlFor="client">Cliente: </label>
        <input
          type="text"
          id="client"
          name="client"
          onChange={handleInput}
          value={formData.client}
        />
        <label htmlFor="value">Valor: </label>
        <input
          type="number"
          id="value"
          name="value"
          onChange={handleInput}
          value={formData.value}
        />
        <label htmlFor="paymentMethod">Forma de pagamento: </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          onChange={handleInput}
          value={formData.paymentMethod}
        >
          <option value="0">À vista</option>
          { [...Array(12).keys()].map((key) => {
            const value = key + 1;
            return (<option
              key={`payment-option-${value}`}
              value={value}
            >
              {value}x
            </option>);
          }) }
        </select>
        <button
          type="button"
          onClick={handleSubmit}
        >
          Inserir na Caderneta
        </button>
      </form>
  )
}

export default PaymentForm;