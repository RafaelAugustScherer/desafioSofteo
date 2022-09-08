import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, FormControlLabel, Checkbox, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

const ProcedureListFilters = ({ arrayToFilter, setResultArray }) => {
  const [ includePaidProcedures, setIncludePaidProcedures ] = useState(false);
  const [clientFilter, setClientFilter] = useState('');

  const applyFilters = () => {
    const filteredByPaidProcedures = includePaidProcedures
      ? arrayToFilter
      : arrayToFilter.filter(({ paymentDates, paid }) => paid < paymentDates.length);

    const filteredByClientName = filteredByPaidProcedures
      .filter(({ client }) => client.toLowerCase().includes(clientFilter.toLowerCase()));
    
    setResultArray(filteredByClientName);
  };

  useEffect(() => {
    applyFilters();
  }, [arrayToFilter, includePaidProcedures, clientFilter]);
  
  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      mx: 1,
    }}>
      <TextField
        variant="standard"
        placeholder="Buscar cliente..."
        onChange={({ target }) => setClientFilter(target.value)}
        value={clientFilter}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <FormControlLabel
        control={<Checkbox />}
        onChange={() => setIncludePaidProcedures(!includePaidProcedures)}
        checked={includePaidProcedures}
        label="Incluir procedimentos pagos"
      />
    </Box>
  );
};

ProcedureListFilters.propTypes = {
  arrayToFilter: PropTypes.array,
  setResultArray: PropTypes.func,
};

export default ProcedureListFilters;