  
# Projeto de Gestão Acadêmica

Este projeto é um sistema de gestão acadêmica desenvolvido utilizando **NestJS** e **Prisma** com **MySQL** como banco de dados. O sistema visa facilitar a gestão de alunos, matrículas, propinas e cursos, proporcionando uma interface simples e eficiente para usuários administrativos.

## Tecnologias Utilizadas

- **Backend**: Express
- **ORM**: Prisma
- **Banco de Dados**: MySQL
- **Autenticação**: JWT
- **Hashing de Senhas**: bcrypt
- **Gerenciamento de Pacotes**: npm ou yarn

## Estrutura do Projeto

### Modelos

- **User**: Representa um usuário do sistema.
- **Aluno**: Representa os alunos da instituição.
- **Matricula**: Representa as matrículas dos alunos nos cursos.
- **Propina**: Representa os pagamentos de propinas.
- **Curso**: Representa os cursos oferecidos pela instituição.
- **Periodo**: Representa os períodos acadêmicos.
- **Mes**: Representa os meses do ano.

### Funcionalidades

- **Autenticação de Usuário**: Login e gerenciamento de sessões.
- **Gerenciamento de Alunos**: Criação, leitura, atualização e exclusão de registros de alunos.
- **Gerenciamento de Matrículas**: Criação e consulta de matrículas.
- **Gerenciamento de Propinas**: Registro de pagamentos de propinas.
- **Gerenciamento de Cursos**: Adição e consulta de cursos disponíveis.
  
## Instalação

Siga os passos abaixo para instalar e rodar o projeto localmente.

1. Clone o repositório:

   ```bash
   git clone https://github.com/Katumbela/loide-backend-express-prisma.git
   cd loide-backend-express-prisma
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

3. Configure o banco de dados:

   - Crie um banco de dados MySQL.
   - Atualize a variável de ambiente `DATABASE_URL` no arquivo `.env`:

     ```
     DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
     ```

4. Execute as migrações do Prisma:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Inicie o servidor:

   ```bash
   npm run start
   ```

   ou

   ```bash
   yarn start
   ```

## Uso

Após iniciar o servidor, você pode acessar a API através de `http://localhost:3200`. Utilize ferramentas como **Postman** ou **Insomnia** para testar as rotas da API.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou um pull request.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

## Contato

Para dúvidas ou sugestões, entre em contato pelo e-mail: joaokatumbela82@gmail.com.


## Como Personalizar

- **URL do Repositório**: Altere `https://github.com/katumbela/loide-backend-express-prisma.git` para o URL do seu repositório no GitHub.
- **Credenciais do Banco de Dados**: Certifique-se de atualizar o bloco de configuração do banco de dados com suas credenciais corretas.
- **Contato**: Atualize o e-mail para seu contato real.

Se precisar de mais ajustes ou de seções específicas, é só avisar!