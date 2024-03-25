# Stage - Crack the Case - Leonardo Barbanti #

# Back-end #

Este projeto consiste em uma REST API que gerencia funcionários, usuários, departamentos e projetos.

# Foram utilizadas as ferramentas:

- Node.js
- Typescript
- Nest.JS
- Prisma
- bcrypt
- date-fns
- jsonwebtoken
- TypeScript

# Proposta do projeto #

    O projeto consiste em um back-end que gerencia funcionários, usuários, departamentos e projetos. Feito em Nest.js, Docker e Prisma ORM para manipular o banco de dados MySQL. Cada gerenciamento citado acima consiste em um módulo completo para cada um, contendo Controller, Module e Service, que executam todos os processos através do CRUD (CREATE, READ, UPDATE e DELETE), retornando possíveis erros e sucesso com a execução solicitada. Possui um módulo exclusivo para autenticação do token, para realizar validação do acesso utilizando o JSON Web Token, após a solicitação de um login ou apagar algum dado do banco de dados, por exemplo.

# Minhas dificuldades com o back-end #

    Minhas dificuldades iniciais foram na concepção do projeto e suas lógicas e tratamentos de dados, necessários para atender às necessidades do case, mas que ao decorrer do projeto foram superadas. Também tentei subir o back-end no Vercel, porém após muitas tentativas e erros que localmente não aparecem, mesmo testando a aplicação, acabei optando por manter o projeto rodando localmente somente. Porém, o projeto está disponível no meu GitHub para consulta.

# Rotas existentes nesta API em ordem conforme a estrutura do projeto #

# auth #

- auth/user/login
- auth/employee/login
- auth/user/register
- auth/employee/register
- auth/user/forgot-password
- auth/employee/forgot-password
- auth/user/reset-password
- auth/employee/reset-password
- auth/user/profile
- auth/employee/profile

# departments #

# create (Post)
- departments/
# Get all (Get)
- departments/
- departments/query/:id
- departments/update/:id
- departments/delete/:id

# dept-emp #
# create (Post)
- dept-emp/
# Get all (Get)
- dept-emp/
- dept-emp/query/:id
- dept-emp/update/:id
- dept-emp/delete/:id

# employee #
# Create (Post)
- employee/
# Get all (Get)
- employee/
- employee/query/:id
- employee/update/:id
- employee/delete/:id

# projects #
# Create (Post)
- projects/
# Get all (Get)
- projects/
- projects/query/:id
- projects/update/:id
- projects/delete/:id

# user #
# Create (Post)
- projects/
# Get all (Get)
- user/
- user/query/:id
- user/update/:id
- user/delete/:id

# Instalação e inicialização da API #

# Verificar o arquivo .envexample para adicionar as variáveis de ambiente!

- npm install

- npm run start:prod

## Precisa ter o docker instalado no pc para poder rodar ##

----------------------------------------------------------------------------------------------------------