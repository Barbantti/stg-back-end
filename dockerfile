# Definindo o sistema com imagem oficial do Node.js como base
FROM node:18.17.0

# Prisma CLI global
RUN npm install -g prisma

# diretório de trabalho
WORKDIR /app

COPY package*.json ./

# Instalação das dependências Node.js
RUN npm install

# Porta
EXPOSE 4466

COPY . .

# Executa o Prisma CLI
CMD ["prisma"]


