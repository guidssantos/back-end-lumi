# README - Back-end Lumi

Bem-vindo ao README do Back-end Lumi! Este documento contém informações detalhadas sobre como configurar, instalar, executar e usar o back-end da aplicação Lumi.

## Configuração

Antes de iniciar a configuração do back-end, é importante garantir que seu ambiente esteja corretamente configurado. Certifique-se de ter o Node.js e o npm instalados em sua máquina.

## Instalação

Para instalar as dependências necessárias para o back-end, execute o seguinte comando no terminal:

npm install

Este comando irá instalar todas as dependências listadas no arquivo package.json.

## Execução

Após a instalação das dependências, você pode iniciar o back-end em modo de desenvolvimento com o seguinte comando:

npm run dev

Este comando iniciará o servidor back-end e permitirá que você desenvolva e teste suas APIs.

## Uso

Agora que o back-end está em execução, você pode começar a desenvolver suas APIs e integrá-las ao front-end da aplicação Lumi. Aqui estão algumas das principais tecnologias e bibliotecas utilizadas no back-end:

- Express: Um framework web rápido, não opinativo e minimalista para Node.js.
- Prisma: Um ORM (Object-Relational Mapping) para Node.js e TypeScript.
- Cors: Um middleware para permitir requisições entre diferentes origens no Express.
- Swagger UI Express: Uma biblioteca para integrar a documentação do Swagger no Express.
- Dotenv: Uma biblioteca para carregar variáveis de ambiente a partir de um arquivo .env.

Sinta-se à vontade para explorar e modificar o código-fonte do back-end de acordo com suas necessidades!

## Comandos Úteis

Além dos comandos mencionados acima, aqui estão alguns comandos adicionais que podem ser úteis durante o desenvolvimento:

- npm run build: Compila o código TypeScript e cria uma versão pronta para produção do back-end.
- npm test: Executa os testes unitários do back-end com Jest.
- npm run lint: Executa a análise estática do código com ESLint para garantir boas práticas de codificação.
- npx prisma migrate dev: Aplica as migrações do banco de dados local.
- npx prisma generate: Regenera os tipos do Prisma baseados no seu esquema do banco de dados.
