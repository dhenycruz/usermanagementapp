import sinon from 'sinon';
import { expect } from 'chai';
import UserModel from '../../../../backend/src/models/userModel';
import userService from '../../../../backend/src/services/userService';

const users = require('../../../data-user.json');

interface User {
  id_user: number,
  name: string,
  email: string
}

interface ServiceError {
  error: string;
}

describe('Testando a camada Service', () => {
  describe('Testando o método getUsers', () => {
    describe('Se houver usuários salvos no banco', () => {
      before(() => {
        sinon.stub(UserModel.prototype, 'getUsers').resolves({ totalRows: 7, getAllUsers: users });
      });

      after(() => { sinon.restore(); });

      it('Retorna um array de objetos', async () => {
        const take = 6;
        const skip = 0;
        const result = await userService.getUsers(take, skip);
        expect(result).to.be.eql({ totalRows: 7, getAllUsers: users });
      });
    });

    describe('Se não houver usuários salvos no banco', () => {
      const usersReturn: User[] = [];
      before(() => {
        sinon.stub(UserModel.prototype, 'getUsers').resolves({ totalRows: 0, getAllUsers: usersReturn });
      });

      after(() => { sinon.restore(); });

      it('Retorna um array vazio', async () => {
        const take = 6;
        const skip = 0;
        const result = await userService.getUsers(take, skip);
        console.log(result);
        expect(result).to.be.a('object');
        expect(result.getAllUsers.length).to.be.equal(0);
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

  describe('Testando o método getUserByQuery', () => {
    describe('Se encontrar algum usuário que contém a query no seu nome ou email', () => {
      const user = {
        "id_user": 5,
        "name": "Eduardo",
        "email": "eduardo@email.com"
      };

      before(() => {
        sinon.stub(UserModel.prototype, 'getUserByQuery').resolves({ totalRows: 1, getAllUsers: [user] })
      });
      after(() => { sinon.restore(); });

      it('Retorna um objeto com o total de usuários correspondentes a query e array com esses usuários', async () => {
        const take = 6;
        const skip = 0;
        const query = 'edu';

        const result = await userService.getUserByQuery(take, skip, query);
        expect(result).to.be.eql({ totalRows: 1, getAllUsers: [user] });
      });
    });

    describe('Se não encontrar nenhum usuário', () => {
      before(() => {
        sinon.stub(UserModel.prototype, 'getUserByQuery').resolves({ totalRows: 0, getAllUsers: [] })
      });
      after(() => { sinon.restore(); });

      it('Retorna um objeto com o total de usuários correspondentes a zero e um array vazio', async () => {
        const take = 6;
        const skip = 0;
        const query = 'edu';

        const result = await userService.getUserByQuery(take, skip, query);
        expect(result).to.be.eql({ totalRows: 0, getAllUsers: [] });
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

      const user = {
        id_user: 1,
        name: 'Juliano Alves',
        email: 'juliano@email.com',
      }

      before(() => {
        sinon.stub(UserModel.prototype, 'create').resolves(user);
      });

      after(() => { sinon.restore(); });

      it('Retorna um objeto com dados do usuário e seu novo id', async () => {
        const result = await userService.create(userBody);
        expect(result).to.be.eql(user);
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

      const user = {
        id_user: 6,
        name: 'Dheniarley Cruz',
        email: 'dheny@email.com'
      }

      before(() => {
        sinon.stub(UserModel.prototype, 'getUser').resolves(user);
        sinon.stub(UserModel.prototype, 'update').resolves(user);
      });

      after(() => { sinon.restore(); });

      it('Retorna o novo objeto do usuário com seus dados atualizados', async () => {
        const result = await userService.update(id, userBody);
        expect(result).to.be.a('object');
        expect(result).to.be.eql(user);
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
        expect(result).to.be.null;
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
