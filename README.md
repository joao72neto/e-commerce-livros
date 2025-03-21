
<h1 align="center" style="font-weight: bold;">E-commerce de Livros 📚</h1>

<p align="center">
 <a href="#crud">Layout CRUD clientes</a> •
 <a href="#tech">Tecnologias</a> • 
 <a href="#started">Como rodar CRUD</a> 
</p>

<h2>Descrição do Projeto</h2>

<p align="left">
  <p>O sistema consiste em um e-commerce de livros que permite o cadastro e gerenciamento de livros e clientes, controle de vendas e análise do histórico de compras.</p>

  <p>Além disso, o sistema conta com uma IA integrada, capaz de interagir via chatbot para auxiliar os clientes. Essa IA é treinada exclusivamente para responder perguntas relacionadas à base de dados do e-commerce, fornecendo recomendações personalizadas e facilitando a busca por livros.</p>
 
</p>

<h2 id="crud">Layout CRUD de Clientes</h2>

<div align="center">
    <img src="https://github.com/user-attachments/assets/2a457ace-c8ed-42b7-b307-b11dd7519564">
</div>

<h2 id="tech">💻 Tecnologias</h2>

Abaixo estão listadas todas as tecnologias que serão utilizadas para realizar este sistema:

- JavaScript
- HTML
- CSS
- Node.js
- MySQL
- Python 3

<h2 id="started">🚀 Como rodar o crud localmente</h2>

<h3>Pré-Requisitos</h3>

- [Node.js](https://nodejs.org/pt)
- Navegador (O crud foi feito inteiramente no [Google Chrome](https://www.google.pt/intl/pt-PT/chrome/?brand=FHFK&ds_kid=43700076570751463&gad_source=1&gclid=CjwKCAjwnPS-BhBxEiwAZjMF0qoMYAhnW_TjZMxq-DQQjfiJw79PMomQhhoNvzEn79KgchseT9NmbxoCSQ0QAvD_BwE&gclsrc=aw.ds))
- MySQL
  - Servers (Qualquer um dos 3)
    - [USBWebServer](https://usbwebserver.yura.mk.ua/)
    - [WampServer](https://www.wampserver.com/en/)
    - [Xampp](https://www.apachefriends.org/pt_br/index.html)
  - IDE (Opcional)
    - [Workbench](https://www.mysql.com/products/workbench/)


## Configuração do Banco

#### 1. Clone o repositório
Abra o terminal e execute o seguinte comando para baixar o projeto:

```bash
git clone https://github.com/joao72neto/e-commerce-livros.git
```

#### 2. Criação do banco
Entre no diretório abaixo, procure pelo ddl-completo do banco e o execute no seu SGBD
```bash
cd e-commerce-livros/modelo-bd/
```

#### 3. Conexão com o Banco
Entre no diretório abaixo

```bash
cd e-commerce-livros/crud-clientes/backend/config/

```

Abra o arquivo ```db.js``` e coloque o nome do seu usuário e senha

```javaScript
const mysql = require('mysql2/promise');

//Configurando a conexão
const bd = mysql.createPool({
    host: 'localhost',
    user: '<SEU USUÁRIO>',
    password: '<SUA SENHA>',
    database: 'e_commerce_books',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//Exportando as configurações do banco de dados
module.exports = bd;
```
## Executando o CRUD

#### 1. Acesse o diretório do CRUD de clientes
Após a clonagem, entre na pasta correta:

```bash
cd e-commerce-livros/crud-clientes/
```

#### 2. Instale as dependências
Agora, instale todas as bibliotecas necessárias:

```bash
npm install
```

#### 3. Inicie o servidor
Execute o seguinte comando para rodar o CRUD na porta 3000:

```bash
node app.js
```
#### 4. Acesse a aplicação no navegador
Copie e cole a URL abaixo na barra de endereços do seu navegador:

```bash
http://localhost:3000/
```
Agora, seu CRUD está pronto para uso! 🚀

