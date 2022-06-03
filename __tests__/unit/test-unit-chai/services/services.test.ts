import sinon from 'sinon';
import { expect } from 'chai';
import UserModel from '../../../../backend/src/models/userModel';
import userService from '../../../../backend/src/services/userService';
import { User } from '../../../../backend/src/interfaces/userInterface';

const users = require('../../../data-user.json');

interface UserID extends User{
  id_user: number,
}

interface ServiceError {
  error: string;
}

describe('Testando a camada Service', () => {
  describe('Testando o método getUsers', () => {
    describe('Se houver usuários salvos no banco', () => {
      before(() => {
        sinon.stub(UserModel.prototype, 'getUsers').resolves(users);
      });

      after(() => { sinon.restore(); });

      it('Retorna um array de objetos', async () => {
        const result = await userService.getUsers();
        expect(result).to.be.eql(users);
      });
    });

    describe('Se não houver usuários salvos no banco', () => {
      const usersReturn: UserID[] = [];
      before(() => {
        sinon.stub(UserModel.prototype, 'getUsers').resolves(usersReturn);
      });

      after(() => { sinon.restore(); });

      it('Retorna um array vazio', async () => {
        const result = await userService.getUsers();
        expect(result).to.be.a('array');
        expect(result.length).to.be.equal(0);
      });
    });
  });

  describe('Testando o método getUser', () => {
    describe('Se houver algum usuário com o mesmo id passado', () => {
      before(() => {
        sinon.stub(UserModel.prototype, 'getUser').resolves(users[0]);
      });

      after(() => { sinon.restore(); });

      const id = 1;

      it('Retorna um objeto com os dados desse usuário', async () => {
        const result = await userService.getUser(id);
        expect(result).to.be.eql(users[0]);
      });
    });

    describe('Se não houver um usuário com o mesmo id passado', () => {
      before(() => {
        sinon.stub(UserModel.prototype, 'getUser').resolves(null);
      });

      after(() => { sinon.restore(); });

      const id = 1;

      it('Retorna null', async () => {
        const result = await userService.getUser(id);
        expect(result).to.be.null;
      });
    });
  });

  describe('Testando o método verifyEmailExists', () => {
    describe('Se houver algum usuário com o mesmo email passado', () => {
      before(() => {
        sinon.stub(UserModel.prototype, 'getUserByEmail').resolves(users[1]);
      });

      after(() => { sinon.restore(); });

      const email = 'pedroa@pedro.com';

      it('Retorna true case encontre um usuário com o mesmo email passado', async () => {
        const result = await userService.verifyEmailExists(email);
        expect(result).to.be.eql(true);
      });
    });

    describe('Se não houver algum usuário com o email passado', () => {
      before(() => {
        sinon.stub(UserModel.prototype, 'getUserByEmail').resolves(null);
      });

      after(() => { sinon.restore(); });

      const email = 'dheniarley@email.com';

      it('Retorna false caso não encontre algum usuário com o email passado', async () => {
        const result = await userService.verifyEmailExists(email);
        expect(result).to.be.false;
      });
    });
  });

  describe('Testando o método create', async () => {
    describe('Se o usuário for cadastrado com sucesso', () => {
      const userBody = {
        name: 'Juliano Alves',
        email: 'juliano@email.com',
        password: 'minhasenha',
      };

      before(() => {
        sinon.stub(UserModel.prototype, 'create').resolves({ id_user: 1, ...userBody });
      });

      after(() => { sinon.restore(); });

      it('Retorna um objeto com dados do usuário e seu novo id', async () => {
        const result = await userService.create(userBody);
        expect(result).to.be.eql({ id_user: 1, ...userBody });
      });
    });

    describe('Se req.body seja passado com alguma falha nas exigências passadas para o zod', () => {
      const userBody = {
        name: 'Dh',
        email: 'dheniarley@email.com',
        password: 'minha123',
      };

      it('Retorna um objeto com dados do erro', async () => {
        const result = await userService.create(userBody);
        expect(result).to.be.a('object');
        expect(result).to.be.eql({ error: 'User name must be 5 or more characters.' });
      });
    });
  });

  describe('Testando o método update', () => {
    describe('Se o update do usuário for realizado com sucesso', () => {
      const id = 6;
      const userBody = {
        name: 'Dheniarley',
        email: 'dheny@email.com',
        password: '123senha',
      };

      before(() => {
        sinon.stub(UserModel.prototype, 'getUser').resolves({ id_user: id,
          ...{
            name: 'Dheniarley Cruz',
            email: 'dheniarley@gmail.com',
            password: 'minhasenha',
          } });
        sinon.stub(UserModel.prototype, 'update').resolves({ id_user: id, ...userBody });
      });

      after(() => { sinon.restore(); });

      it('Retorna o novo objeto do usuário com seus dados atualizados', async () => {
        const result = await userService.update(id, userBody);
        expect(result).to.be.a('object');
      });
    });

    describe('Caso não encontre o usuário que será atualizdo', () => {
      const id = 5;
      const userBody = {
        name: 'Dheniarley',
        email: 'dheny@email.com',
        password: '123senha',
      };

      before(() => {
        sinon.stub(UserModel.prototype, 'getUser').resolves(null);
      });

      after(() => { sinon.restore(); });

      it('Se não encontrar o usuário deverá retorna false', async () => {
        const result = await userService.update(id, userBody);
        expect(result).to.be.false;
      });
    });

    describe('Se req.body seja passado com alguma falha nas exigências passadas para o zod', () => {
      const id = 5;
      const userBody = {
        name: 'Dh',
        email: 'dheniarley@email.com',
        password: 'minha123',
      };

      before(() => {
        sinon.stub(UserModel.prototype, 'getUser').resolves(users[5]);
      });

      after(() => {
        sinon.restore();
      });

      it('Retorna um objeto com dados do erro', async () => {
        const result = await userService.update(id, userBody);
        expect(result).to.be.a('object');
        expect(result).to.be.eql({ error: 'User name must be 5 or more characters.' });
      });
    });
  });

  describe('Testando o método delete', () => {
    describe('Se o usuário for deletado com sucesso', () => {
      const id = 2;
      const user = {
        id_user: 2,
        name: 'Juliana Brandes',
        email: 'juju@email.com',
        password: 'senha123',
      };

      before(() => {
        sinon.stub(UserModel.prototype, 'getUser').resolves(user);
        sinon.stub(UserModel.prototype, 'delete').resolves(user);
      });

      after(() => {
        sinon.restore();
      });

      it('caso o usuário seja deletado com sucesso o retorno séra um objeto desse usuário deletado', async () => {
        const result = await userService.delete(id);
        expect(result).to.be.a('object');
      });
    });

    describe('Caso não encontre o usuário que será deletado', () => {
      const id = 5;

      before(() => {
        sinon.stub(UserModel.prototype, 'getUser').resolves(null);
      });

      after(() => { sinon.restore(); });

      it('Se não encontrar o usuário deverá retorna false', async () => {
        const result = await userService.delete(id);
        expect(result).to.be.false;
      });
    });
  });

  describe('Testando o método validateEmail', () => {
    it('Se passa um email inválido, o método retorna false', async () => {
      const result = await userService.validateEmail('dhenyemail.com');
      expect(result).to.be.false;
    });
    it('Caso passe um email válido, o método retorna true', async () => {
      const result = await userService.validateEmail('dheniarley@email.com');
      expect(result).to.be.true;
    });
  });
});
