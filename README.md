## Tecnologias Utilizadas

- **Node.js** com **TypeScript**  
- **Express** para criação da API  
- **Sequelize** como ORM para **PostgreSQL**  
- **Redis** para cache de favoritos  
- **JSON Web Tokens (JWT)** para autenticação  
- **Swagger (OpenAPI 3.0)** para documentação da API  
- **Docker e Docker Compose** para orquestração dos containers  
- **Jest** para testes automatizados (unitários e de integração)  

---

## Funcionalidades Principais

- **CRUD completo para usuários**, incluindo criação, listagem, edição e remoção  
- **Autenticação via login com JWT**  
- **Autorização baseada em roles** (`admin` e `client`)  
- **Gerenciamento da lista de produtos favoritos do usuário**  
- **Cache inteligente usando Redis para acelerar consultas frequentes**  
- **Validação e tratamento consistente de erros com classe `AppError`**  
- **Documentação automática e interativa via Swagger UI**
- **Cobertura de testes com Jest**

---

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado na sua máquina.
- [Docker Compose](https://docs.docker.com/compose/install/) instalado.

---

## Configuração e Execução
1.  git clone https://github.com/yurirssilva/api-aiqfome.git

2. Para execução da aplicação
    - docker-compose up --build

3. A API estará disponível em http://localhost:3001

4. A documentação Swagger estará disponível em http://localhost:3001/api-docs

5. Para execução dos testes
    - docker-compose run --rm test