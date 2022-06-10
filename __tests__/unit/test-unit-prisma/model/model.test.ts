import UserModel from '../../../../backend/src/models/userModel';
import prisma from '../../../../backend/src/database/connection';
import { User } from '../../../../backend/src/interfaces/userInterface';

const model = new UserModel();

interface UserID extends User {
  id_user: number;
}

describe('Testando a camada model: class UserModel - método getUsers:', () => {
  prisma.users.findMany = jest.fn();
  prisma.users.count = jest.fn();

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

    jest.spyOn(prisma.users, 'count').mockResolvedValue(4);
    jest.spyOn(prisma.users, 'findMany').mockResolvedValue(users);
    const take = 6;
    const skip = 0;
  
    await expect(model.getUsers(take, skip)).resolves.toEqual({ totalRows: 4, getAllUsers: users });
  });

  test('Se não haver nenhum usuário no banco de dados, deverá retorna um array vazio', async () => {
    const users: UserID[] = [];
    jest.spyOn(prisma.users, 'count').mockResolvedValue(0);
    jest.spyOn(prisma.users, 'findMany').mockResolvedValue(users);
    const take = 6;
    const skip = 0;
    await expect(model.getUsers(take, skip)).resolves.toEqual({ totalRows: 0, getAllUsers: users });
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

describe('Testnado a camda model: class UserModel - método getUserByQuery', () => {
  prisma.users.count = jest.fn();
  prisma.users.findMany = jest.fn();
  test('Se houver um ou mais usuário com a query passada, vai retornar o total de usuários achados e um array com os usuários', async () => {
    const take = 6;
    const skip = 0;
    const query = 'ju';

    const user = [
      {
        "id_user": 1,
        "name": "Juliana",
        "email": "ju@email.com",
        "password": 'senha',
     }
    ];
  
    
    jest.spyOn(prisma.users, 'count').mockResolvedValue(1);
    jest.spyOn(prisma.users,  'findMany').mockResolvedValue(user);

    await expect(model.getUserByQuery(take, skip, query)).resolves.toEqual({ totalRows: 1, getAllUsers: user });
  });

  test('Se não encontrar nenhum usuário que contém a query, retorna como zero o total de user e um array vazio', async () => {
    const take = 6;
    const skip = 0;
    const query = 'dio';

    const user: UserID[] = [];
  
    
    jest.spyOn(prisma.users, 'count').mockResolvedValue(0);
    jest.spyOn(prisma.users,  'findMany').mockResolvedValue(user);

    await expect(model.getUserByQuery(take, skip, query)).resolves.toEqual({ totalRows: 0, getAllUsers: user });
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