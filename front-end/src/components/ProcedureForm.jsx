import React, { useContext, useState } from 'react';
import { Box, Button, FormControl, InputAdornment, InputLabel, TextField, MenuItem, FilledInput } from '@mui/material';
import { ProcedureContext } from '../provider/Procedure';
import ErrorAlert from '../partials/ErrorAlert';

const ProcedureForm = () => {
  const INITIAL_DATA = {
    client: '',
    procedure: '',
    total: '',
    entry: 0,
    installments: '1',
  };
  const [ formData, setFormData ] = useState(INITIAL_DATA);
  const [ formError, setFormError ] = useState();
  const { addProcedure } = useContext(ProcedureContext);

  const handleInput = ({ target: { id, name, value } }) => (
    setFormData({ ...formData, [ id || name ]: value })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    const response = await addProcedure(formattedData);
    if (response.error) setFormError(response.error);
    setFormData(INITIAL_DATA);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root, & .MuiFormControl-root': { m: 2, width: '25ch' },
        }}
        mx={5}
      >
        <h2>Inserir nova consulta</h2>
        {
          formError && (
            <ErrorAlert content={formError} setContent={setFormError} />
          )
        }
        <TextField
          id="client"
          label="Cliente"
          placeholder="Rogério"
          onChange={handleInput}
          value={formData.client}
          margin="normal"
          variant="filled"
          required
        />
        <TextField
          id="procedure"
          label="Procedimento"
          placeholder="Tratamento de canal"
          onChange={handleInput}
          value={formData.procedure}
          margin="normal"
          variant="filled"
          required
        />
        <FormControl variant="filled" margin="normal" required>
          <InputLabel htmlFor="total">Valor Total</InputLabel>
          <FilledInput
            type="number"
            id="total"
            onChange={handleInput}
            value={formData.total}
            label="Valor Total"
            placeholder="0"
            startAdornment={
              <InputAdornment position="start">
                R$
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="filled" margin="normal" required>
          <InputLabel htmlFor="entry">Entrada</InputLabel>
          <FilledInput
            type="number"
            id="entry"
            onChange={handleInput}
            value={formData.entry}
            label="Entrada"
            placeholder="0"
            startAdornment={
              <InputAdornment position="start">
                R$
              </InputAdornment>
            }
            required
          />
        </FormControl>
        <TextField
          id="installments"
          name="installments"
          select
          label="Parcelas"
          value={formData.installments}
          variant="filled"
          onChange={handleInput}
        >
          {[ ...Array(36).keys() ].map((key) => {
            const value = key + 1;
            return (<MenuItem
              key={`payment-option-${value}`}
              value={value}
            >
              {value}x
            </MenuItem>);
          })}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 2 }}
        >
          Inserir na caderneta
        </Button>
      </Box>
    </>
  );
};

export default ProcedureForm;