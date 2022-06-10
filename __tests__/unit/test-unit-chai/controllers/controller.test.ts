import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import UserModel from '../../../../backend/src/models/userModel';
import App from '../../../../backend/src';

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
        password: 'minhasenha',
      };

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
            expect(res.body).to.be.eql({ error: 'User not found.' });
          });
      });
    });

    describe('Quando ocorre algum erro no sevidor', () => {
      const id = 2;
      const error = new Error('Internal Server Error');
      before(() => { sinon.stub(UserModel.prototype, 'getUser').throws(error); });
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

  describe('Testando o endpoint get /users/?take=7&skip=0', () => {
    describe('Quando existe usuários salvos no banco de dados', () => {
      before(() => {
        sinon.stub(UserModel.prototype, 'getUsers').resolves({ totalRows: 7, getAllUsers: users });
      });

      after(() => { sinon.restore(); });

      it('Retorna um objeto com total de usuários no banco de objetos com dados dos usuários cadastrados', async () => {
        await chai.request(App.getApp())
          .get('/users/?take=7&skip=0')
          .then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.eql({ totalRows: 7, getAllUsers: users });
          });
      });
    });

    describe('Quando não existe nenhum dado salvo no banco de dados', () => {
      before(() => {
        sinon.stub(UserModel.prototype, 'getUsers').resolves({ totalRows: 0, getAllUsers: [] });
      });

      after(() => { sinon.restore(); });

      it('Retorna um array vazio', async () => {
        await chai.request(App.getApp())
          .get('/users/?take=7&skip=0')
          .then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.getAllUsers.length).to.be.equal(0);
          });
      });
    });

    describe('Quando ocorre algum erro no sevidor', () => {
      const error = new Error('Internal Server Error');
      before(() => { sinon.stub(UserModel.prototype, 'getUsers').throws(error); });
      after(() => { sinon.restore(); });

      it('Retorna status 500 e o objeto com message do erro', async () => {
        await chai.request(App.getApp())
          .get('/users/?take=7&skip=0')
          .then((res) => {
            expect(res.status).to.be.equal(500);
          });
      });
    });
  });

  describe('Testando o endpoit get /search/?take=6&skip=0&query=test', () => {
    describe('Se encontrar usuários correspondente a query passada', () => {
      before(() => {
        sinon.stub(UserModel.prototype, 'getUserByQuery').resolves({ totalRows: 1, getAllUsers: [users[0]] })
      });
      after(() => {  sinon.restore(); });

      it('Retorna um objeto com total de usuários no banco de objetos com dados dos usuários cadastrados', async () => {
        await chai.request(App.getApp())
          .get('/search/?take=6&skip=0&query=ju')
          .then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.eql({ totalRows: 1, getAllUsers: [users[0]] });
          });
      });
    });

    describe('Se não encontrar usuários correspondente a query passada', () => {
      before(() => {
        sinon.stub(UserModel.prototype, 'getUserByQuery').resolves({ totalRows: 0, getAllUsers: [] })
      });
      after(() => {  sinon.restore(); });

      it('Retorna um objeto com total de usuários igual a zero e um array vazio', async () => {
        await chai.request(App.getApp())
          .get('/search/?take=6&skip=0&query=nono')
          .then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.eql({ totalRows: 0, getAllUsers: [] });
          });
      });
    });

    describe('Se ocorrer algum error no server', () => {
      before(() => {
        sinon.stub(UserModel.prototype, 'getUserByQuery').throws();
      });
      after(() => { sinon.restore(); });

      it('Retorna status 500 e o objeto com message do erro', async () => {
        await chai.request(App.getApp())
          .get('/search/?take=6&skip=0&query=dhe')
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
            password: 'minhasenha',
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
            password: 'minhasenha',
          };

          await chai.request(App.getApp())
            .post('/users')
            .send(userBody)
            .then((res) => {
              expect(res.status).to.be.equal(400);
              expect(res.body).to.be.eql({ error: 'Email invalid format.' });
            });
        });
      });

      describe('Passando email com formato válido, porém já existe no banco de dados', () => {
        const userBody = {
          name: 'Dheniarley Cruz',
          email: 'dheniarley@gmail.com',
          password: 'minhasenha',
        };

        const user = {
          id_user: 3,
          name: 'Dheniarley Cruz',
          email: 'dheniarley@gmail.com',
          password: 'minhasenha',
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
        const error = new Error('Internal Server Error');
        before(() => {
          sinon.stub(UserModel.prototype, 'getUserByEmail').throws(error);
        });
        after(() => { sinon.restore(); });

        const userBody = {
          name: 'Matheus Mendes',
          email: 'matheus@email.com',
          password: 'matheussenha',
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
          email: 'dheniarley@email.com',
          password: 'minhasenha',
        };

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
          email: 'dheniarley@email.com',
          password: 'minhasenha',
        };

        await chai.request(App.getApp())
          .post('/users')
          .send(userBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'User name user must be a string.' });
          });
      });

      it('Se o nome passado tiver menos de 5 string, retorna um objeto especificando esse erro com status 400', async () => {
        const userBody = {
          name: 'Dhe',
          email: 'dheniarley@email.com',
          pssword: 'minhasenha',
        };

        await chai.request(App.getApp())
          .post('/users')
          .send(userBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'User name must be 5 or more characters.' });
          });
      });
    });

    describe('Validando o password passado no body do endpoit', () => {
      before(() => { sinon.stub(UserModel.prototype, 'getUserByEmail').resolves(null); });
      after(() => { sinon.restore(); });
      it('Se o password não for passado, retorna um objeto especificando esse erro com status 400', async () => {
        const userBody = {
          name: 'Dheniarley',
          email: 'dheniarley@email.com',
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
          password: 123,
        };

        await chai.request(App.getApp())
          .post('/users')
          .send(userBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'Password must be a string' });
          });
      });

      it('Se o password passado for menor que 6 caracteres, retorna um objeto especificando esse erro com status 400', async () => {
        const userBody = {
          name: 'Dheniarley',
          email: 'dheniarley@email.com',
          password: '123',
        };

        await chai.request(App.getApp())
          .post('/users')
          .send(userBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'Password must be 6 or more characters.' });
          });
      });
    });

    describe('Caso esteja tudo ok com o body a ser passado, será criado um novo usuário', () => {
      const userBody = {
        name: 'Pedro Alvez',
        email: 'pedro@email.com',
        password: 'minhasenha',
      };
      const idNewUser = 1;

      before(() => {
        sinon.stub(UserModel.prototype, 'getUserByEmail').resolves(null);
        sinon.stub(UserModel.prototype, 'create').resolves({ id_user: idNewUser, name: 'Pedro Alvez', email: 'pedro@email.com' });
      });
      after(() => { sinon.restore(); });

      it('Retorna um objeto com os dados do usuário cadastrado e status 201', async () => {
        await chai.request(App.getApp())
          .post('/users')
          .send(userBody)
          .then((res) => {
            expect(res.status).to.be.equal(201);
            expect(res.body).to.be.eql({ id_user: idNewUser, name: 'Pedro Alvez', email: 'pedro@email.com'  });
          });
      });
    });

    describe('Quando ocorre um erro desconhecido ao criar o usuário, retornando null no método create na camada model', () => {
      before(() => {
        sinon.stub(UserModel.prototype, 'getUserByEmail').resolves(null);
        sinon.stub(UserModel.prototype, 'create').resolves(undefined);
      });
      after(() => { sinon.restore(); });

      const userBody = {
        name: 'Amanda Oliveira',
        email: 'amanda@email.com',
        password: 'amandasenha',
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
      const error = new Error('Internal Server Error');
      before(() => {
        sinon.stub(UserModel.prototype, 'getUserByEmail').resolves(null);
        sinon.stub(UserModel.prototype, 'create').throws(error);
      });
      after(() => { sinon.restore(); });

      const userBody = {
        name: 'Beatriz Oliveira',
        email: 'beatriz@email.com',
        password: 'beatrizsenha',
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

  describe('Testando o endpoit delete /users/id', () => {
    describe('Quando o id passado não corresponde a nenhum usuário no banco de dados', () => {
      before(() => {
        sinon.stub(UserModel.prototype, 'getUser').resolves(null);
      });
      after(() => { sinon.restore(); });

      const id = 1;

      it('Retorna status 404 com a mensagem de User not found.', async () => {
        await chai.request(App.getApp())
          .delete(`/users/${id}`)
          .then((res) => {
            expect(res.status).to.be.equal(404);
            expect(res.body).to.be.eql({ error: 'User not found.' });
          });
      });
    });

    describe('Quando um usuário é deletado com sucesso', () => {
      const id = 1;
      const user = {
        id_user: 1,
        name: 'Gustavo Alves',
        email: 'gustavo@email.com',
        password: 'senhaguga',
      };

      before(() => {
        sinon.stub(UserModel.prototype, 'getUser').resolves(user);
        sinon.stub(UserModel.prototype, 'delete').resolves(user);
      });
      after(() => { sinon.restore(); });

      it('Retorna status 204 e body vazio', async () => {
        await chai.request(App.getApp())
          .delete(`/users/${id}`)
          .then((res) => {
            expect(res.status).to.be.equal(204);
            expect(res.body).to.be.eql({});
          });
      });
    });

    describe('Quando ocorre algum erro no sevidor', () => {
      const error = new Error('Internal Server Error');
      const id = 1;
      const user = {
        id_user: 1,
        name: 'Gustavo Alves',
        email: 'gustavo@email.com',
        password: 'senhaguga',
      };
      before(() => {
        sinon.stub(UserModel.prototype, 'getUser').resolves(user);
        sinon.stub(UserModel.prototype, 'delete').throws(error);
      });
      after(() => { sinon.restore(); });

      it('Se houver algum erro no sevidor, retorna status 500 e objeto com a message de error', async () => {
        await chai.request(App.getApp())
          .delete(`/users/${id}`)
          .then((res) => {
            expect(res.status).to.be.equal(500);
          });
      });
    });
  });

  describe('Testando o endpoit update /users/:id', () => {
    describe('Validando o email passado', () => {
      describe('Caso não passe o email', () => {
        it('retorna status 400 e um objeto contendo a messagem de erro', async () => {
          const id = 1;
          const updateBody = {
            name: 'Dheniarley Cruz',
            password: 'minhasenha',
          };

          await chai.request(App.getApp())
            .put(`/users/${id}`)
            .send(updateBody)
            .then((res) => {
              expect(res.status).to.be.equal(400);
              expect(res.body).to.be.eql({ error: 'Email is required.' });
            });
        });
      });
      describe('Passando um email inválido', () => {
        const id = 1;
        const updateBody = {
          name: 'Francisca Pereira',
          email: 'franemail.com',
          password: 'fransenha',
        };

        it('Retorna 400 e um objeto contém a mensagem de erro', async () => {
          await chai.request(App.getApp())
            .put(`/users/${id}`)
            .send(updateBody)
            .then((res) => {
              expect(res.status).to.be.equal(400);
              expect(res.body).to.be.eql({ error: 'Email invalid format.' });
            });
        });
      });
    });

    describe('Passando um id que não corresponde a nenhum usuário no banco de daods', async () => {
      const id = 3;
      const updateBody = {
        name: 'Francisco Silva',
        email: 'francisco.silva@email.com',
        password: 'franciscosenha',
      };
      before(() => { sinon.stub(UserModel.prototype, 'getUser').resolves(null); });
      after(() => { sinon.restore(); });

      it('Retorna 404 e um objeto descrevendo o erro', async () => {
        await chai.request(App.getApp())
          .put(`/users/${id}`)
          .send(updateBody)
          .then((res) => {
            expect(res.status).to.be.equal(404);
            expect(res.body).to.be.eql({ error: 'User not found.' });
          });
      });
    });

    describe('Validando o nome passado no body do endpoint', () => {
      const id = 1;
      const user = {
        id_user: id,
        name: 'Fracisca Pereira',
        email: 'francisca@email.com',
        password: '123141',
      };

      before(() => { sinon.stub(UserModel.prototype, 'getUser').resolves(user); });
      after(() => { sinon.restore(); });

      it('Se o nome não for passado, retorna um objeto especificando esse erro com status 400:', async () => {
        const updateBody = {
          email: 'francisca@email.com',
          password: 'fransenha',
        };

        await chai.request(App.getApp())
          .put(`/users/${id}`)
          .send(updateBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'User name is required.' });
          });
      });

      it('Se o nome passado não for uma string, retorna um objeto especificando esse erro com status 400', async () => {
        const updateBody = {
          name: 2022,
          email: 'francisca@email.com',
          password: 'fransenha',
        };

        await chai.request(App.getApp())
          .put(`/users/${id}`)
          .send(updateBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'User name user must be a string.' });
          });
      });

      it('Se o nome passado tiver menos de 5 string, retorna um objeto especificando esse erro com status 400', async () => {
        const updateBody = {
          name: 'Fra',
          email: 'francisca@email.com',
          pssword: 'fransenha',
        };

        await chai.request(App.getApp())
          .put(`/users/${id}`)
          .send(updateBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'User name must be 5 or more characters.' });
          });
      });
    });

    describe('Validando o password passado no body do endpoit', () => {
      const id = 1;
      const user = {
        id_user: id,
        name: 'Dheniarley Cruz',
        email: 'dheniarley@email.com',
        password: '123141',
      };

      before(() => { sinon.stub(UserModel.prototype, 'getUser').resolves(user); });
      after(() => { sinon.restore(); });

      it('Se o password não for passado, retorna um objeto especificando esse erro com status 400', async () => {
        const updateBody = {
          name: 'Dheniarley',
          email: 'dheniarley@email.com',
        };

        await chai.request(App.getApp())
          .put(`/users/${id}`)
          .send(updateBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'Password is required.' });
          });
      });

      it('Se o password passado não é do tipo string, retorna um objeto especificando esse erro com status 400', async () => {
        const updateBody = {
          name: 'Dheniarley',
          email: 'dheniarley@email.com',
          password: 123,
        };

        await chai.request(App.getApp())
          .put(`/users/${id}`)
          .send(updateBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'Password must be a string' });
          });
      });

      it('Se o password passado for menor que 6 caracteres, retorna um objeto especificando esse erro com status 400', async () => {
        const updateBody = {
          name: 'Dheniarley',
          email: 'dheniarley@email.com',
          password: '123',
        };

        await chai.request(App.getApp())
          .put(`/users/${id}`)
          .send(updateBody)
          .then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.be.eql({ error: 'Password must be 6 or more characters.' });
          });
      });
    });

    describe('Quando ocorre algum erro no sevidor', () => {
      const id = 1;
      const user = {
        id_user: id,
        name: 'Dheniarley Cruz',
        email: 'dheniarley@email.com'
      };

      const error = new Error('Internal Server Error');

      before(() => {
        sinon.stub(UserModel.prototype, 'getUser').resolves(user);
        sinon.stub(UserModel.prototype, 'update').throws(error);
      });
      after(() => { sinon.restore(); });

      const userBody = {
        name: 'Beatriz Oliveira',
        email: 'beatriz@email.com',
        password: 'beatrizsenha',
      };

      it('Se houver algum erro no sevidor, retorna status 500 e objeto com a message de error', async () => {
        await chai.request(App.getApp())
          .put(`/users/${id}`)
          .send(userBody)
          .then((res) => {
            expect(res.status).to.be.equal(500);
          });
      });
    });

    describe('Quando atualiza com sucesso um usuário', () => {
      const id = 1;
      const user = {
        id_user: id,
        name: 'Dheniarley Cruz',
        email: 'dheny@gmail.com',
      };
      const updateBody = {
        name: 'Dheniarley',
        email: 'dheniarley@email.com',
        password: '987654321',
      };

      before(() => {
        sinon.stub(UserModel.prototype, 'getUser').resolves(user);
        sinon.stub(UserModel.prototype, 'update').resolves(user);
      });
      after(() => { sinon.restore(); });

      it('Retorna status 201 e um objeto desse usuário com seus novos dados', async () => {
        await chai.request(App.getApp())
          .put(`/users/${id}`)
          .send(updateBody)
          .then((res) => {
            expect(res.status).to.be.equal(201);
            expect(res.body).to.be.eql(user);
          });
      });
    });
  });
});
