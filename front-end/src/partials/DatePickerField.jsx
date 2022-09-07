import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField } from '@mui/material';

const DatePickerField = ({ date, setDate, ...props }) => (
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <DatePicker
      value={date}
      onChange={(newDate) => setDate(newDate)}
      renderInput={(params) => <TextField {...params} />}
      { ...props }
    />
  </LocalizationProvider>
);

DatePickerField.propTypes = {
  label: PropTypes.string,
  date: PropTypes.object,
  setDate: PropTypes.func,
  props: PropTypes.object,
};

export default DatePickerField;