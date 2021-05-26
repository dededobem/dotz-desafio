## Desafio Dotz  

Desafio Técnico para preenchimento de vaga na empresa Dotz

## Sobre a aplicação (Tecnologias):

- A solução foi desenvolvida utilizando Asp.Net core 5 com Firebase Authentication e React Native.
- O projeto está dividido em camadas, utilizando onion architecture e alguns design patterns como repository e DDD, aplicando e seguindo todos os princípios do SOLID e clean code.
- Foi utilizado code-first e modelos de domínio rico.
- O banco de dados utilizado MYSQL.
- Utilização de IU Swagger.

## Pré-requisitos

1. Docker
2. Visual studio 2019 OU VSCode com extensão C#
3. Node e React Native

## Executando a aplicação:

1. Clone este repositório:

  ```
  git clone https://github.com/dededobem/dotz-desafio
  ```

2. Acessar o diretório e executar com docker compose:

  ```
  docker-compose up -d
  ```  
     
- O Swagger estará acessível através do *http://localhost:8080/swagger/*


3. Acessar a pasta dotz-front e executar os comandos:
  ```
  yarn ou npm install
  ```  
  
  ```
  yarn android ou npm run-android
  ```
  
