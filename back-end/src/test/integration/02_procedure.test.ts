import chai from 'chai';
import chaiHttp from 'chai-http';
import { Types } from 'mongoose';
import requester from '../utilities/requester';
import UserMocks from '../mocks/user';
import ProcedureMocks from '../mocks/procedure';
import ProcedureModel from '../../app/model/procedure';
import UserModel from '../../app/model/user';
import Procedure from '../../app/interface/Procedure';

chai.use(chaiHttp);
const { expect } = chai;
const { validUser } = UserMocks;
const { validProcedure, invalidProcedures } = ProcedureMocks;

describe('Teste das rotas de procedimento', () => {
  const testUser2 = { ...validUser, user: 'TestUser2' };
  let token: string;
  let token2: string;

  const createProcedure = (data: Partial<Procedure>, tkn: string) => (
    requester
    .post('/procedure')
    .send(data)
    .set('Authorization', tkn)
  );

  before(async () => {
    const createUsersPromises = [validUser, testUser2].map(async (user) => {
      await requester
        .post('/user/register')
        .send(user);

      const response = await requester
        .post('/user/login')
        .send(user);

      return response.body['token'];
    });

    [token, token2] = await Promise.all(createUsersPromises);
  });

  beforeEach(async () => {
    await ProcedureModel.deleteMany({});
  });

  describe('Testa rota de criação de procedimento', () => {

    beforeEach(async () => {
      await ProcedureModel.deleteMany({});
    });
  
    it('Cria procedimento com sucesso', async () => {
      const response = await createProcedure(validProcedure, token);
  
      expect(response).to.have.status(201);
      expect(response.body).to.contain.keys(['_id', 'paid', ...Object.keys(validProcedure)]);
  
      const dbProcedure = await ProcedureModel.findById(response.body['_id']);
      expect(dbProcedure).not.to.be.null;
    });
  
    it('Não permite a criação de procedimentos inválidos', async () => {
      const requestPromises = invalidProcedures.map(async (procedure) => {
        const response = await createProcedure(procedure, token);
    
        expect(response).not.to.have.status(201);
        expect(response.body).to.have.key('error');
    
        const dbProcedure = await ProcedureModel.findOne({});
        expect(dbProcedure).to.be.null;
      });
  
      await Promise.all(requestPromises);
    });

    it('Não permite a criação de um procedimento de usuário inexistente', async () => {
      const testUser3 = { ...validUser, user: 'TestUser3' };
      await requester
        .post('/user/register')
        .send(testUser3);

      const { body: { token: mockToken } } = await requester  
        .post('/user/login')
        .send(testUser3);

      await UserModel.deleteOne({ user: testUser3.user });

      const response = await createProcedure(validProcedure, mockToken);
  
      expect(response).not.to.have.status(201);
      expect(response.body).to.have.key('error');
  
      const dbProcedures = await ProcedureModel.find({});
      expect(dbProcedures).to.have.length(0);
    });
  });

  describe('Testa rota de leitura de procedimento', () => {

    beforeEach(async () => {
      await ProcedureModel.deleteMany({});
    });
  
    it('Lê os procedimentos criados com sucesso', async () => {
      for (let i = 0; i <= 2; i += 1) {
        await createProcedure(validProcedure, token);
      }

      const response = await requester
        .get('/procedure')
        .set('Authorization', token);
  
      expect(response).to.have.status(200);
      expect(response.body).to.have.length(3);

      response.body.map((p: Procedure) => {
        expect(p).to.contain.keys(['_id', 'paid', ...Object.keys(validProcedure)]);
      });
    });
  
    it('Não traz procedimentos referentes a outros usuários', async () => {
      await createProcedure(validProcedure, token);

      const response = await requester
        .get('/procedure')
        .set('Authorization', token2);
    
        expect(response).to.have.status(200);
        expect(response.body).to.have.length(0);
    });
  });

  describe('Testa rota de edição de procedimento', () => {

    beforeEach(async () => {
      await ProcedureModel.deleteMany({});
    });
    
    it('É possível pagar a parcela de um procedimento', async () => {
      const { body: { _id: procedureId } } = await createProcedure(validProcedure, token);

      const response = await requester
        .patch('/procedure')
        .send({ id: procedureId, paid: 1 })
        .set('Authorization', token);

      expect(response).to.have.status(200);
      expect(response.body).to.contain.keys(['_id', 'paid', ...Object.keys(validProcedure)]);
      expect(response.body['paid']).to.be.equal(1);   
    });

    it('Não é possível pagar a parcela de um procedimento não existente', async () => {
      const mockId = new Types.ObjectId();

      const response = await requester
        .patch('/procedure')
        .send({ id: mockId, paid: 1 })
        .set('Authorization', token);

        expect(response).not.to.have.status(200);
        expect(response.body).to.have.key('error');
    });

    it('Não é possível pagar a parcela de um procedimento que não está vinculado ao usuário', async () => {
      const { body: { _id: procedureId } } = await createProcedure(validProcedure, token);

      const response = await requester
        .patch('/procedure')
        .send({ id: procedureId, paid: 1 })
        .set('Authorization', token2);

      expect(response).not.to.have.status(200);
      expect(response.body).to.have.key('error');
    });
  });

  describe('Testa a rota de exclusão de procedimento', () => {

    it('É possível excluir um procedimento', async () => {
      const { body: { _id: procedureId } } = await createProcedure(validProcedure, token);

      const response = await requester
        .delete('/procedure')
        .send({ id: procedureId })
        .set('Authorization', token);

      expect(response).to.have.status(204);

      const dbProcedures = await ProcedureModel.find({});
      expect(dbProcedures).to.have.length(0);
    });

    it('Não é possível excluir procedimentos inexistentes', async () => {
      const mockId = new Types.ObjectId();
      
      const response = await requester
        .delete('/procedure')
        .send({ id: mockId })
        .set('Authorization', token);

      expect(response).not.to.have.status(204);
    });

    it('Não é possível excluir um procedimento que não está vinculado ao usuário', async () => {
      const { body: { _id: procedureId } } = await createProcedure(validProcedure, token);

      const response = await requester
        .delete('/procedure')
        .send({ id: procedureId })
        .set('Authorization', token2);

      expect(response).not.to.have.status(204);

      const dbProcedures = await ProcedureModel.find({});
      expect(dbProcedures).to.have.length(1);
    });
  });
});