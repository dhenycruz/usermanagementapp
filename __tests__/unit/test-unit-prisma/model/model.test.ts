import UserModel from '../../../../backend/src/models/userModel';
import prisma from '../../../../backend/src/database/connection';
import { User } from '../../../../backend/src/interfaces/userInterface';

const model = new UserModel();

interface UserID extends User {
  id_user: number;
}

describe('Testando a camada model: class UserModel - método getUsers:', () => {
  prisma.users.findMany = jest.fn();
  test('Retorna todos os usuários salvos no banco de dados.', async () => {
    const users = [
      {
        "id_user": 1,
        "name": "Juliana",
        "email": "ju@email.com",
        "password": "senhadaju"
      },
      {
        "id_user": 2,
        "name": "Pedro",
        "email": "pedroa@pedro.com",
        "password": "senhadopedro"
      },
      {
        "id_user": 3,
        "name": "Maria",
        "email": "maria@email.com",
        "password": "senhadamaria"
      },
      {
        "id_user": 4,
        "name": "João",
        "email": "joao@email.com",
        "password": "senhadojoao"
      }
    ];

    jest.spyOn(prisma.users, 'findMany').mockResolvedValue(users);
  
    await expect(model.getUsers()).resolves.toEqual(users);
  });

  test('Se não haver nenhum usuário no banco de dados, deverá retorna um array vazio', async () => {
    const users: UserID[] = [];
    jest.spyOn(prisma.users, 'findMany').mockResolvedValue(users);
    
    await expect(model.getUsers()).resolves.toEqual(users);
  });
});

describe('Testando a camada model: class UserModel - método getUser', () => {
  prisma.users.findUnique = jest.fn();
  test('Se houver algum usuário que corresponda ao id passodo, ele será retornado', async () => {
    const id = 1;
    const user = {
        "id_user": 1,
        "name": "Juliana",
        "email": "ju@email.com",
        "password": "senhadaju"
    };
    
    jest.spyOn(prisma.users, 'findUnique').mockResolvedValue(user);

    await expect(model.getUser(id)).resolves.toEqual(user);
  });

  test('Se não houver nehum usuário que corresponda ao id passodo, o retorn será null', async () => {
    const id = 1;
    const user = null;
    
    jest.spyOn(prisma.users, 'findUnique').mockResolvedValue(user);

    await expect(model.getUser(id)).resolves.toEqual(user);
  });
});

describe('Testando a camada model: class UserModel - método getUserByEmail', () => {
  prisma.users.findUnique = jest.fn();
  test('Se houver algum usuário que corresponda ao email passodo, ele será retornado', async () => {
    const email = 'ju@email.com';
    const user = {
        "id_user": 1,
        "name": "Juliana",
        "email": "ju@email.com",
        "password": "senhadaju"
    };
    
    jest.spyOn(prisma.users, 'findUnique').mockResolvedValue(user);

    await expect(model.getUserByEmail(email)).resolves.toEqual(user);
  });

  test('Se não houver nehum usuário que corresponda ao email passodo, o retorn será null', async () => {
    const email = 'dheny@email.com';
    const user = null;
    
    jest.spyOn(prisma.users, 'findUnique').mockResolvedValue(user);

    await expect(model.getUserByEmail(email)).resolves.toEqual(user);
  });
});

describe('Testando a camada model: class UserModel - método create', () => {
  prisma.users.create = jest.fn();
  test('Ao criar um novo usuário, o método retorna um objeto com o novo usuário', async () => {
    const id = 1;
    const userBody: User = {
      "name": "Juliana",
      "email": "ju@email.com",
      "password": "senhadaju"
    }

    jest.spyOn(prisma.users, 'create').mockResolvedValue({ id_user: id, ...userBody });

    await expect(model.create(userBody)).resolves.toEqual({ id_user: id, ...userBody });
  });
});

describe('Testando a camada model: class UserModel - método update', () => {
  prisma.users.update = jest.fn();
  test('Ao atualizar um usuáriom o método retorna os dados desse usuário, atualizado', async () => {
    const id = 1;
    const userBody: User = {
      "name": "Juliana",
      "email": "ju@email.com",
      "password": "senhaju"
    }

    jest.spyOn(prisma.users, 'update').mockResolvedValue({ id_user: id, ...userBody});

    await expect(model.update(id, userBody)).resolves.toEqual({ id_user: id, ...userBody });
  });
});

describe('Testando a camda model: class UserModel - método delete', () => {
  prisma.users.delete = jest.fn();
  test('O método delete não existe terno', async () => {
    const id = 1;
    const user = {
      "id_user": 1,
      "name": "Juliana",
      "email": "ju@email.com",
      "password": "senhadaju"
  };
    jest.spyOn(prisma.users, 'delete').mockResolvedValue(user);

    await expect(model.delete(id)).resolves.toEqual(user);
  });
});