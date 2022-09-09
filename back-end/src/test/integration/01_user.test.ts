import chai from 'chai';
import chaiHttp from 'chai-http';
import requester from '../utilities/requester';
import UserMocks from '../mocks/user';
import UserModel from '../../app/model/user';
import { verifyToken } from '../utilities/auth';

chai.use(chaiHttp);
const { expect } = chai;
const { validUser, invalidUsers } = UserMocks;

describe('Teste das rotas de usuário', () => {

  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  describe('Testa rota de criação de usuário', () => {

    beforeEach(async () => {
      await UserModel.deleteMany({});
    });
  
    it('Cria usuário com sucesso', async () => {
      const response = await requester
        .post('/user/register')
        .send(validUser);
  
      expect(response).to.have.status(201);
      expect(response.body).to.have.keys(['_id', 'user']);
  
      const dbUser = await UserModel.findById(response.body['_id']);
      expect(dbUser).not.to.be.null;
    });
  
    it('Não permite a criação de usuários inválidos', async () => {
      const requestPromises = invalidUsers.map(async (user) => {
        const response = await requester
          .post('/user/register')
          .send(user);
    
        expect(response).not.to.have.status(201);
        expect(response.body).to.have.key('error');
    
        const dbUser = await UserModel.findOne({});
        expect(dbUser).to.be.null;
      });
  
      await Promise.all(requestPromises);
    });
  });
  
  describe('Testa rota de login', () => {

    beforeEach(async () => {
      await requester
        .post('/user/register')
        .send(validUser);
    });
    
    it('Faz o login de um usuário e retorna um token válido', async () => {
      const response = await requester
        .post('/user/login')
        .send(validUser);
  
      expect(response).to.have.status(200);
      expect(response.body).to.have.key('token');
  
      expect(verifyToken(response.body['token'])).to.be.true;
    });
  
    it('Não permite login com usuário inválido', async () => {
      const response = await requester
        .post('/user/login')
        .send(invalidUsers[0]);
  
      expect(response).not.to.have.status(200);
      expect(response.body).to.have.key('error');
    });
  });
  
  
  describe('Testa rota de autenticação de usuário por token', () => {
    
    beforeEach(async () => {
      await requester
        .post('/user/register')
        .send(validUser);
    });
  
    it('Retorna os dados do usuário referente ao token', async () => {
      const { body: { token } } = await requester
        .post('/user/login')
        .send(validUser);

      const response = await requester
        .get('/user/authenticate')
        .set('Authorization', token);

      expect(response).to.have.status(200);
      expect(response.body).to.have.keys(['id', 'user']);
      expect(response.body['user']).to.be.equal(validUser['user']);
    });
  });
});