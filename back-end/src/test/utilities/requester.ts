import chai from 'chai';
import chaiHttp from 'chai-http';
import App from '../../app/app';

chai.use(chaiHttp);
const requester = chai.request(App).keepOpen();

export default requester;
