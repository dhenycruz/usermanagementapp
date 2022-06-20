# User Management APP

Aplicação para gerenciamento de usuários:
 Esta aplicação tem o intuito de cadastrar, editar, deletar e buscar usuários específicos pelo nome ou pelo email.

## Requisitos:
 - Desenvolver uma aplicação Back-end que irá armazenar no banco de dados PostgreSQL, cadastros de usuários em uma plataforma;
 - Para o cadastro do usuário deverá ser enviado ao back-end o nome, email e a senha do usuário;
 - Além da criação de usuários,deve haver a possibilidade de buscar os usuários cadastrados;
 - A busca deve possuir a funcionalidade de paginação e filtar os usuários do banco de dados;
 - A aplicação deverá possuir a funcionalidade de alterar e excluir os dados dos usuários.
 - Após a conclusão do backend, deverá ser realizada uma interface em React.js onde deverá ser possível visualizar os usuários criados em uma tabela, assim como realizar buscar por nome e email.

## Ferramentas Obrigatórias:
  - Express
  - TypeScript
  - React.Js
  - PostgreSQL
  - Git

## Ferramentas Sugeridas:
  - Prisma ORM
  - Next.js
  - Github

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

- Nodejs, docker, docker-compose e git instalados na sua máquina.

### 🔧 Instalação

  - Com o terminal aberto, vamos clonar o repositório
    `git clone git@github.com:dhenycruz/usermanagementapp.git`

  - Instalando as dependências
    - Depois de ter clonado o repositório entra na pasta do projeto e instale as dependências da pasta principal do projeto
      `cd usermanagementapp && npm install`
    - Depois entre na pasta do backend e instale as dependências do backend
      `cd backend && npm install`
    - Depois volte para  a pasta principal, depois entre na pasta do frontend e instale as dependências do frontend`
      `cd .. && cd frontend && npm install`

  - Banco de Dados Postgree
    - Utilizando Docker
     - Se tiver com Postgres instalado na máquina, você tem que para-lo:
        `sudo service postgresql stop`
      Depois verifique se o Postgres está inativo:
        `sudo service postgresql status`
     - Se não estiver na pasta principal do projeto, vá para  a pasta principal e rode o comonando compose:up
        `cd ... && npm run compose:up`
        obs.: Caso queira parar o container do db rode o comando `npm run compose:down`
  
  - .env
    - Para iniciar o backend é preciso ter um arquivo .env na pasta backend com as credenciais do banco de dados
     - Caso esteja utilizando o container do banco de dados crie o arquivo .env com o conteudo a seguir.
        DATABASE_URL="postgres://postgres:senhadb@127.0.0.1:5432/usermanagementDB"
      - caso deseja utilizar um banco de dados postgres local, coloque sua url com suas credências
    - Para iniciar o frontend é preciso ter o arquivo .env com a url da api gerado pelo backend.
     - Crie o arquivo .env com o url
        http://localhost:3001 
  
  - Iniciando backend
    - Com banco de dados funcionando e com os arquivos .env criados e com seus conteudos corretos, vamos iniciar o o backend
     - Primeiramente vamos dar npx prisma db push
      - Na pasta principal do projeto, vamos entrar no backend/src/database
          `cd backend/src/database`
      - Agora sim, vamos dar o npx prisma db push
          `npx prisma db push`
          Assim nosso backend já está se comunicando com o nosso banco de dados
      - O próximo passo e ultimo para nosso backend é iniciar o backend
          `npm start`
  - Iniciando o frontend
    - Há duas maneiras de fazer rodar nosso frontend, umas como modo desenvolvedor e outra buildando a aplicação e depois dando npm start.
     - Para rodar o frontend, certifique que existe o arquivo .env com a url da api do backend.
      - Modo desenvolvedor:
        `npm run dev`
      - Modo produção:
        `npm run build && npm start`

Assim a nossa aplicação estará rodando localmente

## Também temos o deploy da aplicação
  - Aplicação em produção (frontend)
    * https://usermanagementmg.herokuapp.com/
  - Documentação da API
    * https://usermanagementapp27.herokuapp.com/documentation/
  - Backend (API)
    * http://usermanagementapp27.herokuapp.com/

## ⚙️ Os testes

Este projeto tem a cabertura de 100% dos testes para o backend.

### 🔩 Analise dos testes

Utilizei o jest para fazer o testes unitários na camada model, pois utilizando sinon com mocha, não estava mockando as funções do prisma, resolvi esse problema mockando com jest, então toda camada model do backend foi testada com jest.
  
  Para camada services e controller foi testado com mocha, sinon e chai, o objetivo dos testes é testar se todos os métodos das classes modal, services e controller estavam operando corretamente e se seu retorno, estava retornando o que era esperado ou se quebrava por erro no código ou pela lógica.

  Com o backend 100% testado, ficou muito mais fácil implementar o frontend.

### Executando os testes
  - Testando a camada model
    - Para rodar os testes para a camada model, certifique-se que você esta na pasta principal do projeto e rode o comando:
      `npm run test-jest`
    - Para ver a porcentagem de cobertura do test rode o comando:
      `npm run test-jest:coverage`
      <img src="/images/test-coverage-controller-services2.png" alt="test coverage model" />
  - Testando a camada services e controller
    - Para rodar os testes para camada service e controller, ainda na pasta principal rode o comando
      `npm run test`
    - Para ver a porcentagem de covertura do test rode o comando:
      `npm run test:coverage`
      <img src="/images/test-coverage-jest-models2.png" alt="test coverage model" />

### ⌨️ Testes de estilo de codificação

Para ter um estilo padrão no código foi utilizado o Eslint tanto para o backend, quanto para o frontend.

## 📦 Desenvolvimento

O backend foi desenvovido com a arquitetura MSC (model, service, controller), utilizei classes, tanto para cada camada quanto para o arquivo app, onde estaria algumas configurações HTTP da nossa API.

Com o backend construido, documentado e testado, fui desenvolver o frontend, optei por utilizar Next.js com styled-components como base na estilização da aplicação, normalmente utilizaria o reac-strap para compoar alguns componentes como por exemplo, tabelas, buttons e até mesmo a responsividade da página.

Nesse projeto foi utilizado o Chakra-UI, para estilizar a tabela e o alerta de notificações quando alguns usuário é criado, atualizado ou deletado.

Notei uma grande semelhança com o React-strap, pois os dois já tem componentes estilizados prontos e possuem a mesma forma de trabalhar a responsividade. 

Pretendo utiliza-lo mais vezes em projetos futuros.

### Composição da aplicação

Decidi criar uma página de boas vindas, no caso no index, que depois de dar boas vindas ao usuário, seria redirecionado para a página de dashboard, onde a mágica da aplicação aconteceria.

Na página do dashboard, crei um header com o titulo da aplicação, um main com o nossa tabela, contendo o título "Lista de Usuários", input para pesquisar usuários pelo nome ou email, um botão para adicionar usuários e a tabela com usuários já cadastrados com as opções de excluir e editar cada usuário.

Por fim um footer com meus dados e rede sociais, essa foi um resumode como foi construída a aplicação.

## 🛠️ Construído com

- BACKEND
  - EXPRESS
  - PRISMA
  - BRCRYPTJS
  - DOTENV
  - ZOD
  - SWAGGER
  - TYPESCRIPT
  - ESLINT

- FRONTEND
  - NEXT.JS
  - AXIOS
  - STYLED-COMPONENTS
  - DOTENV
  - CHAKRA-UI
  - TYPESCRIPT
  - ESLINT

- TEST
  - JEST
  - MOCHA
  - CHAI
  - SINON

## Autor
---

 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/26901028?s=400&u=d99619f0fcc7ff7d8407ff05a0e90a0149f959ee&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Dheniarley Cruz</b></sub></a> <a href="https://www.linkedin.com/in/dheniarley/" title="Meu perfil">🚀

Desenvolvedor Full Stack 

Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Dheniarley-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/dheniarley/)](https://www.linkedin.com/in/dheniarley//) 
[![Gmail Badge](https://img.shields.io/badge/-dheniarley.ds@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:dheniarley.ds@gmail.com)](mailto:dheniarley.ds@gmail.com)
