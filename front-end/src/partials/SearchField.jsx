import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchField = ({ arrayToSearch, fieldToSearch, setToResult, placeholder }) => {
  const [filter, setFilter] = useState('');

  const applyFilter = () => (
    setToResult(arrayToSearch.filter((i) => (
      i[fieldToSearch].toLowerCase().includes(filter.toLowerCase())
    )))
  );

  useEffect(() => applyFilter(), [arrayToSearch, filter]);
  
  return (
    <TextField
        variant="standard"
        placeholder={placeholder}
        onChange={({ target }) => setFilter(target.value)}
        value={filter}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
  );
};

SearchField.propTypes = {
  arrayToSearch: PropTypes.array,
  fieldToSearch: PropTypes.string,
  setToResult: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchField;