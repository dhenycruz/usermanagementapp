import * as sinon from 'sinon';
import UserModel from '../../../../backend/src/models/userModel';
import chai from 'chai';
import chaiHttp = require('chai-http');
import App from '../../../../backend/src/';

chai.use(chaiHttp);
const { expect } = chai;

const users = require('../../../data-user.json');

describe('Testando a camada Controller', () => {
  describe('Testando o endpoint get /users/:id', () => {
    describe('Quando existe um usuário equivalente ao id passado', () => {
      const id = 1;
      const user = {
        id_user: 1,
        name: 'Dheniarley Cruz',
        email: 'dheniarley@gmail.com',
        password: 'minhasenha'
      }
      
      before(() => {
        sinon.stub(UserModel.prototype, 'getUser').resolves(user);
      });

      after(() => { sinon.restore(); });

      it('Retorna um objeto com os dados desse usuário.', async () => {
        await chai.request(App.getApp())
          .get(`/users/${id}`)
          .then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.eql(user);
          });
      });
    });

    describe('Quando não existe um usuário com id especifícado', () => {
      const id = 2;

      before(() => {
        sinon.stub(UserModel.prototype, 'getUser').resolves(null);
      });

      after(() => { sinon.restore(); });

      it('Retorna status 404 e com o body com objeto de error', async () => {
        await chai.request(App.getApp())
          .get(`/users/${id}`)
          .then((res) => {
            expect(res.status).to.be.equal(404);
            expect(res.body).to.be.eql({ error: 'User not found.'});
          });
      });
    });

    describe('Quando ocorre algum erro no sevidor', () => {
      const id = 2;
      const error = new Error('Internal Server Error')
      before(() => { sinon.stub(UserModel.prototype, 'getUser').throws(error) });
      after(() => { sinon.restore(); });
      
      it('Retorna status 500 e o objeto com message do erro', async () => {
        await chai.request(App.getApp())
        .get(`/users/${id}`)
        .then((res) => {
          expect(res.status).to.be.equal(500);
        });
      });
    });
  });
  
  describe('Testando o endpoint get /users', () => {
    describe('Quando existe usuários salvos no banco de dados', () => {
      before(() => { 
        sinon.stub(UserModel.prototype, 'getUsers').resolves(users);
      });

      after(() => { sinon.restore(); });
      
      it('Retorna um array de objetos com dados dos usuários cadastrados', async () => {
        await chai.request(App.getApp())
        .get('/users')
        .then((res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.eql(users);
        });
      });
    });

    describe('Quando não existe nenhum dado salvo no banco de dados', () => {
      before(() => {
        sinon.stub(UserModel.prototype, 'getUsers').resolves([]);
      });
  
      after(() => { sinon.restore(); });
  
      it('Retorna um array vazio', async () => {
        await chai.request(App.getApp())
        .get('/users')
        .then((res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.be.equal(0);
        });
      });
    });

    describe('Quando ocorre algum erro no sevidor', () => {
      const error = new Error('Internal Server Error')
      before(() => { sinon.stub(UserModel.prototype, 'getUsers').throws(error) });
      after(() => { sinon.restore(); });
      
      it('Retorna status 500 e o objeto com message do erro', async () => {
        await chai.request(App.getApp())
        .get('/users/')
        .then((res) => {
          expect(res.status).to.be.equal(500);
        });
      });
    });
  });

  describe('Testando o endpoit post /users', () => {
    // Primeiro testa todos as validações inválidas
    describe('Validando o email passado no body do endpoit', () => {
      describe('Caso não passe o email', () => {
        it('retorna status 400 e um objeto contendo a messagem de erro', async () => {
          const userBody = {
            name: 'Dheniarley Cruz',
            password: 'minhasenha'
          };

          await chai.request(App.getApp())
            .post('/users')
            .send(userBody)
            .then((res) => {
              expect(res.status).to.be.equal(400);
              expect(res.body).to.be.eql({ error: 'Email is required.' });
            });
        });
      });

      describe('Caso passe um email com formato invalido', () => {
        it('retorna status 400 e um objeto contendo a messagem de erro', async () => {
          const userBody = {
            name: 'Dheniarley',
            email: 'dheniarleyemail.com',
            password: 'minhasenha'
          }
  
          await chai.request(App.getApp())
            .post('/users')
            .send(userBody)
            .then((res) => {
              expect(res.status).to.be.equal(400);
              expect(res.body).to.be.eql({ error: 'Email invalid format.' });
            })
        });
      });

      describe('Passando email com formato válido, porém já existe no banco de dados', () => {
        const userBody = {
          name: 'Dheniarley Cruz',
          email: 'dheniarley@gmail.com',
          password: 'minhasenha'
        }

        const user = {
          id_user: 3,
          name: 'Dheniarley Cruz',
          email: 'dheniarley@gmail.com',
          password: 'minhasenha'
        };

        before(() => { sinon.stub(UserModel.prototype, 'getUserByEmail').resolves(user); });
        after(() => { sinon.restore(); });
        
        it('Retorna o status 401 e objeto com messagem de erro no body de retorno', async () => {
          await chai.request(App.getApp())
            .post('/users')
            .send(userBody)
            .then((res) => {
              expect(res.status).to.be.equal(401);
              expect(res.body).to.be.eql({ error: 'Email already registered' });
            });
        });
      });

      describe('Quando ocorre algum erro no sevidor', () => {
        const error = new Error('Internal Server Error')
        before(() => { 
          sinon.stub(UserModel.prototype, 'getUserByEmail').throws(error);
        });
        after(() => { sinon.restore(); });
  
        const userBody = {
          name:'Matheus Mendes',
          email: "matheus@email.com",
          password: 'matheussenha'
        };
        
        it('Ao buscar usuário pelo email e ocorre erro servidor, retorna status 500 e objeto com a message de error', async () => {
          const response = await chai.request(App.getApp())
          .post('/users/')
          .send(userBody);

          expect(response.status).to.be.equal(500);
        });
      });
    });

    describe('Validando o nome passado no body do endpoint', () => {
      before(() => { sinon.stub(UserModel.prototype, 'getUserByEmail').resolves(null); });
      after(() => { sinon.restore(); });
      it('Se o nome não for passado, retorna um objeto especificando esse erro com status 400:', async () => {
        const userBody = {
          email: "dheniarley@email.com",
          password: 'minhasenha'
        }

        await chai.request(App.getApp())
          .post('/users')
          .send(userBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'User name is required.' });
          });
      });

      it('Se o nome passado não for uma string, retorna um objeto especificando esse erro com status 400', async () => {
        const userBody = {
          name: 2022,
          email: "dheniarley@email.com",
          password: 'minhasenha'
        }

        await chai.request(App.getApp())
          .post('/users')
          .send(userBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'User name user must be a string.' });
          })
      });

      it('Se o nome passado tiver menos de 5 string, retorna um objeto especificando esse erro com status 400', async () => {
        const userBody = {
          name: 'Dhe',
          email: 'dheniarley@email.com',
          pssword: 'minhasenha'
        };

        await chai.request(App.getApp())
          .post('/users')
          .send(userBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'User name must be 5 or more characters.'})
          })
      });
    });

    describe('Validando o password passado no body do endpoit', () => {
      before(() => { sinon.stub(UserModel.prototype, 'getUserByEmail').resolves(null); });
      after(() => { sinon.restore(); });
      it('Se o password não for passado, retorna um objeto especificando esse erro com status 400', async () => {
        const userBody = {
          name: 'Dheniarley',
          email: 'dheniarley@email.com'
        };

        await chai.request(App.getApp())
          .post('/users')
          .send(userBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'Password is required.' });
          });
      });

      it('Se o password passado não é do tipo string, retorna um objeto especificando esse erro com status 400', async () => {
        const userBody = {
          name: 'Dheniarley',
          email: 'dheniarley@email.com',
          password: 123
        };

        await chai.request(App.getApp())
          .post('/users')
          .send(userBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'Password must be a string'});
          })
      });

      it('Se o password passado for menor que 6 caracteres, retorna um objeto especificando esse erro com status 400', async () => {
        const userBody = {
          name: 'Dheniarley',
          email: 'dheniarley@email.com',
          password: '123'
        };

        await chai.request(App.getApp())
          .post('/users')
          .send(userBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'Password must be 6 or more characters.'})
          });
      });
    });

    describe('Caso esteja tudo ok com o body a ser passado, será criado um novo usuário', () => {
      const userBody = {
        name:'Pedro Alvez',
        email: "pedro@email.com",
        password: 'minhasenha'
      };
      const idNewUser = 1;

      before(() => { 
        sinon.stub(UserModel.prototype, 'getUserByEmail').resolves(null);
        sinon.stub(UserModel.prototype, 'create').resolves({ id_user: idNewUser, ...userBody });
      });
      after(() => { sinon.restore(); });

      it('Retorna um objeto com os dados do usuário cadastrado e status 201', async () => {
        await chai.request(App.getApp())
          .post('/users')
          .send(userBody)
          .then((res) => {
            expect(res.status).to.be.equal(201);
            expect(res.body).to.be.eql({ id_user: idNewUser, ...userBody });
          });
      });
    });

    describe('Quando ocorre um erro desconhecido ao criar o usuário, retornando null no método create na camada model', () => {
      before(() => { 
        sinon.stub(UserModel.prototype, 'getUserByEmail').resolves(null);
        sinon.stub(UserModel.prototype, 'create').resolves(undefined) 
      });
      after(() => { sinon.restore(); });

      const userBody = {
        name:'Amanda Oliveira',
        email: "amanda@email.com",
        password: 'amandasenha'
      };
      
      it('Retorna status 500 e o objeto com message do erro', async () => {
        await chai.request(App.getApp())
        .post('/users/')
        .send(userBody)
        .then((res) => {
          expect(res.status).to.be.equal(500);
          expect(res.body).to.be.eql({ error: 'Internal Server Error' });
        });
      });
    });
  
    describe('Quando ocorre algum erro no sevidor', () => {
      const error = new Error('Internal Server Error')
      before(() => { 
        sinon.stub(UserModel.prototype, 'getUserByEmail').resolves(null);
        sinon.stub(UserModel.prototype, 'create').throws(error) 
      });
      after(() => { sinon.restore(); });

      const userBody = {
        name:'Beatriz Oliveira',
        email: "beatriz@email.com",
        password: 'beatrizsenha'
      };
      
      it('Se houver algum erro no sevidor, retorna status 500 e objeto com a message de error', async () => {
        await chai.request(App.getApp())
        .post('/users/')
        .send(userBody)
        .then((res) => {
          expect(res.status).to.be.equal(500);
        });
      });
    });
  });
});
