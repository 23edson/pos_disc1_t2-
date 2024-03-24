Trabalho 2 Pós-Graduação

A aplicação contém um controle básico de autenticação. Ela permite criar, editar, remover e lista registros
do banco de dados sqlite3 (em arquivo). 
O banco está localizado na pasta build/dbs.

## Controle de Login
A aplicação faz controle de login via sessão.
As informações de sessão são armazenados no banco sessions.sqlite
na raiz do projeto. O banco é criado após o início da aplicação. Ao criar uma sessão é enviado um cookie para client.

No arquivo config/session estão descritos as configurações de sessão. 


## Tecnologias utilizadas

Aplicação desenvolvida essencialmente com NodeJS,
juntamente com uns frameworks e bibliotecas.

* [NodeJS] - Testado com versão 21.7.1 do NodeJS;
1. ExpressJS  - Framework para construir servidores web;
2. Sequelize - ORM para interagir com o banco de dados;
3. EJS -  Template Engine para geração dinâmica  das páginas HTML;
4. SQLITE3;
5. Express-session  - Módulo para gerenciamento de sessão;

### Geração de Build
4. TypeScript - Transformar os arquivos em js.
5. Gulp - Automatizador de fluxo;

## Instruções para execução da aplicação
1. npm install -> baixar as dependências;
2. npm start -> inicia o projeto;

