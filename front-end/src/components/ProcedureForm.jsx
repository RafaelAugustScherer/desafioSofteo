import React, { useContext, useState } from 'react';
import { ProcedureContext } from '../provider/Procedure';

const ProcedureForm = () => {
  const INITIAL_DATA = {
    client: '',
    procedure: '',
    total: '',
    entry: '',
    installments: '1',
  };
  const [formData, setFormData] = useState(INITIAL_DATA);
  const { addProcedure } = useContext(ProcedureContext);

  const handleInput = ({ target: { id, value } }) => (
    setFormData({ ...formData, [id]: value })
  );

  const handleSubmit = () => {
    const formattedData = {
      ...formData,
      entry: +formData.entry,
      total: +formData.total,
      installments: +formData.installments,
    };

    if (formattedData.entry > formattedData.total) {
      alert('Valor da entrada maior que o total!');
      return;
    }
    
    addProcedure(formattedData);
    setFormData(INITIAL_DATA);
  };

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
        <label htmlFor="procedure">Procedimento: </label>
        <input
          type="text"
          id="procedure"
          name="procedure"
          onChange={handleInput}
          value={formData.procedure}
        />
        <label htmlFor="total">Valor Total: </label>
        <input
          type="number"
          id="total"
          name="total"
          onChange={handleInput}
          value={formData.total}
        />
        <label htmlFor="entry">Entrada: </label>
        <input
          type="number"
          id="entry"
          name="entry"
          onChange={handleInput}
          value={formData.entry}
        />
        <label htmlFor="installments">Parcelas: </label>
        <select
          id="installments"
          name="installments"
          onChange={handleInput}
          value={formData.installments}
        >
          { [...Array(36).keys()].map((key) => {
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
  );
};

export default ProcedureForm;