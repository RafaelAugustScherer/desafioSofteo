# 📒 Caderneta Online (desafioSofteo) 📒

A Caderneta Online se trata de uma plataforma web para o registro de procedimentos parcelados, acompanhamento da situação de pagamento destes e relatórios de faturamento!

> A plataforma foi criada a partir de um desafio técnico proposto em um processo seletivo.

## 🚀 Deploy no Heroku 🚀
A aplicação está "hosteada" de forma gratuita na plataforma [Heroku](https://dashboard.heroku.com/).

Tanto o Front-end quanto o Back-end são "deployados" de forma Dockerizada e automatizada a cada `commit` através do [GitHub Actions](https://github.com/features/actions) (CI)

* Front-end disponível em: https://caderneta-online-front.herokuapp.com/
* Back-end disponível em: https://caderneta-online-back.herokuapp.com/
---

## 🖥️ Como Rodar o Projeto Localmente 🖥️
<details>
  <summary>Instruções</summary>
  
  ## Requisitos

  - [Git](https://git-scm.com/)
  - [Node.js](https://nodejs.org/)
  - Banco de dados [MongoDB](https://www.mongodb.com/try/download/community) local
  

  ### Clonar o repositório localmente

  Primeiramente você precisa clonar este repositório para qualquer diretório em sua máquina local.

  Para isso você vai precisar do [Git](https://git-scm.com/) instalado em sua máquina e irá executar o comando `git clone https://github.com/RafaelAugustScherer/desafioSofteo`

  ## Setup

  Antes de inicializar o projeto, é importante configurar algumas variáveis de ambiente e instalar as dependências do projeto.

  ### Configurar o ambiente (.env)

  * Back-end
    - Acesse o diretório `./back-end`

    - Altere o arquivo `.env.example` com as suas variáveis de ambiente
      ```
        APP_PORT=3001 // Opcional - Porta na qual o servidor Expresss vai rodar
        DB_PORT=3002 // Opcional - Porta na qual o banco de dados MongoDB está rodando localmente
        JWT_SECRET=sua_chave_secreta // Segredo do jsonwebtoken para gerar tokens de acesso (qualquer senha)
        DB_CONNECTION_URI=mongodb+srv://<username>:<password>@cluster0.C0DE.mongodb.net/?retryWrites=true&w=majority // URI de conexão com o banco MongoDB de produção (usado em `npm start`)
      ```
      > Após definir as variáveis apague os comentários ao lado de seu valor
    - Renomeie o arquivo para `.env`
  
  * Front-end
    - Acesse o diretório `./front-end`
    - Altere o arquivo `.env.example` com as suas variáveis de ambiente
      ```
        REACT_APP_SERVER='http://localhost:3001' // URL para acessar o Back-end (API)
      ```
    - Renomeie o arquivo para `.env`
  
  ### Instalar dependências
  
  * Rode o comando `npm run install:apps` na raiz do projeto

  ## Inicializar a aplicação

  Inicialize o back-end e o front-end em **terminais separados**

  > Por padrão o back-end inicializa na porta 3001

  > Por padrão o front-end inicializa na porta 3000

  * Back-end:
    - Acesse o diretório `./back-end`
    - Rode o comando `npm run dev`

  * Front-end:
    - Acesse o diretório `./front-end`
    - Rode o comando `npm start`

  ## Acessar a aplicação

  * Back-end:
    - Você pode testar a aplicação via [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/)
    - Rotas para o Postman estão disponibilizadas [aqui!](/back-end/desafioSofteo.postman_collection.json)

  * Front-end:
    - Abra o seu navegador e insira a URL (padrão): `http://localhost:3000`
</details>

---

## 🔧 Tecnologias Utilizadas 🔧

* **Back-end**
  - <img src="https://www.docker.com/favicon.ico" alt="Docker Logo" width="15"/> Docker
  - <img src="https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae" alt="TypeScript Logo" width="15"/> TypeScript
  - <img src="https://cdn.iconscout.com/icon/free/png-256/node-js-1174925.png" alt="Node.js Logo" width="15"/> Node.js
    - Mocha / Chai
    - Express
    - Mongoose
    - JWT
    - Cors
    - md5
    - joi

* **Front-end**
  - <img src="https://reactjs.org/favicon.ico" alt="React Logo" width="15"/> React.js
    - Material UI
    - React-cookie
  - <img src="https://axios-http.com/assets/favicon.ico" alt="Axios Logo" width="15"/> Axios
  - <img src="https://momentjs.com/static/img/moment-favicon.png" alt="Moment Logo" width="15"/> Moment.js
---

## 💡 Referências a outros projetos 💡

Neste projeto foram utilizados recursos e sintaxe de código inspirados em outros projetos pessoais que usam stacks semelhantes:

- 🏅 [TrybeRank](https://github.com/RafaelAugustScherer/trybe-rank): [MERN](https://www.mongodb.com/mern-stack) e Deploy no Heroku

- 🟨 [TodoListChallenge](https://github.com/RafaelAugustScherer/todoListChallenge): Desafio Técnico Fictício da Trybe
