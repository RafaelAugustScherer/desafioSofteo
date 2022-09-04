import moment from 'moment';
import 'moment/locale/pt-br';

const calculatePaymentDates = (months) => {
  const dateRef = moment();

  const dates = [];
  while (dates.length < months) {
    dateRef.add(1, 'M');
    dates.push(dateRef.format('L'));
  }
  
  return dates;
};

export {
  calculatePaymentDates,
};