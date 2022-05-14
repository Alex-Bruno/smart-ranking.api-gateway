## Description

Construa um Backend resiliente e escalável com NestJS, serviços em cloud[AWS e SAP] e padrões arquiteturais corporativos.

## Scopo

Api gateway centralizando a comunicação entre o front e os micro-serviços.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Dependences
- npm install @nestjs/microservices
- npm install amqplib amqp-connection-manager
- npm install class-validator class-transformer
- npm install @nestjs/config  
- npm install aws-sdk  
- npm install amazon-cognito-identity-js
- npm install @nestjs/passport passport 
- npm install passport-jwt
- npm install --dev @types/passport-jwt
- npm install jwks-rsa