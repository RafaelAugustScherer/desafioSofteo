import PaymentForm from '../components/PaymentForm';
import PaymentProvider from '../provider/Payment';

const Home = () => {

  return (
    <div>
      <PaymentProvider>
        <PaymentForm />
      </PaymentProvider>
    </div>
  );
};

export default Home;