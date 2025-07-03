
<h1 align="center" style="font-weight: bold;">WebLibrary 📚</h1>

<p align="center">
 <a href="#ecommerce">Layout do Sistema</a> •
 <a href="#tech">Tecnologias</a> • 
 <a href="#ai-start">Execução com IA </a> •
 <a href="#no-ai-start">Execução sem IA</a> •
 <a href="#scripts">Scripts e Comandos</a>
</p>

<h2>>📘 Descrição do Projeto</h2>

<div align="justify">
  <p>Este sistema é um e-commerce de livros completo, desenvolvido como parte da disciplina de <strong>Laboratório de Engenharia de Software da Fatec Mogi das Cruzes (Fatec MC).</strong></p>

  <p>A plataforma permite o <strong>cadastro e gerenciamento de livros e clientes, o controle de vendas e a visualização do histórico de compras</strong>, oferecendo uma estrutura funcional para simular um ambiente real de comércio eletrônico.</p>

  <p>Como diferencial, o sistema conta com uma <strong>Inteligência Artificial integrada via chatbot</strong>, projetada para interagir com os usuários de forma personalizada. Essa IA responde exclusivamente com base nos dados internos do sistema, sendo capaz de <strong>recomendar livros, esclarecer dúvidas e facilitar a navegação no catálogo</strong>, aprimorando a experiência do usuário.</p>
 
</div>

<h2 id="ecommerce">🖼️ Layout WebLibrary</h2>

 <div align="center">
    <img src="https://github.com/user-attachments/assets/9e918419-b3eb-4ddc-bf62-3ad80e7d154c">
</div>

<h2 id="tech">🛠️ Tecnologias</h2>

<p align="justify">Abaixo estão listadas todas as tecnologias que foram utilizadas para a construção deste sistema:</p>

- JavaScript
- HTML
- CSS
- Node.js
- MySQL
- Gemini
- Python 3

<h2 id="ai-start">🤖 Executando WebLibrary localmente com IA</h2>

### Pré-Requisitos

- [Node.js](https://nodejs.org/pt)
- [MySQL Server](https://dev.mysql.com/downloads/installer/)
- [Python 3](https://www.python.org/downloads/)
- [API Gemini](https://aistudio.google.com/prompts/new_chat)
- [Google Chrome](https://www.google.pt/intl/pt-PT/chrome/?brand=FHFK&ds_kid=43700076570751463&gad_source=1&gclid=CjwKCAjwnPS-BhBxEiwAZjMF0qoMYAhnW_TjZMxq-DQQjfiJw79PMomQhhoNvzEn79KgchseT9NmbxoCSQ0QAvD_BwE&gclsrc=aw.ds) (O sistema foi feito e testado inteiramente neste navegador)

## Configurações Iniciais

#### 1. Clone o repositório
Abra o terminal e execute o seguinte comando para baixar o projeto:

```bash
git clone https://github.com/joao72neto/e-commerce-livros.git
```
#### 2. Configuração do .env
Entre no diretório root do sistema:

```bash
cd e-commerce-livros/weblibrary/
```
Crie uma cópia do arquivo ```.env.example``` e renomeie para ```.env```

Windows (cmd):
```bash
copy .env.example .env
```

Unix-based:
```bash
cp .env.example .env
```

Configure o .env:
```.env
DB_HOST=
DB_USER=
DB_PASSWORD=
GOOGLE_API_KEY=
```
## Execução do sistema

#### 1. Instale todas as dependências
Certifique-se de estar na pasta root do sistema ```e-commerce-livros/weblibrary/```.

Instale todas as dependências com o comando abaixo:

```bash
node setup.js
```

#### 2. Ative ambiente virtual python

Windows (cmd):
```bash
ai-service\.venv\Scripts\activate.bat
```
Unix-based:
```bash
source ai-service/.venv/bin/activate
```

#### 3. Inicie o servidor node e python
Execute o seguinte comando para iniciar o sistema na porta 3000:

```bash
npm start
```
#### 4. Acesse a aplicação no navegador
Copie e cole a URL abaixo na barra de endereços:

```bash
http://localhost:3000/
```
A aplicação WebLibrary deve estar rodando e pronta para uso! 🚀

<h2 id="no-ai-start">🚀 Executando WebLibrary sem IA</h2>

#### 1. Inicie apenas o servidor node
Execute o comando abaixo:
```bash
npx nodemon app.js
```

Pode-se também optar pelo seguinte comando:
```bash
node app.js
```

#### 2. Acesse a aplicação no navegador
A porta se mantem a mesma:

```bash
http://localhost:3000/
```

<h2 id="scripts">💻 Scripts e Comandos</h2>

#### 1. DDL e Inserts do banco de dados
<p align="justify">
Todos os scripts de manipulação e criação do banco de dados se encontram no diretório abaixo. O sistema os executa automaticamente ao iniciar o servidor, não há necessidade de criar o banco e inserir os dados manualmente.
</p>

```bash
cd e-commerce-livros/weblibrary/scripts/
```

#### 2. Comandos node

| Comando                   | Descrição                                     |
|---------------------------|-----------------------------------------------|
| `npm run bd:reset`        | Reseta e povoa o banco de dados               |
| `npm run start-servers`   | Inicia servidores Node e Python (sem reset)   |
| `npm start`               | Inicia tudo com reset do banco                |
| `npx nodemon app.js`      | Inicia só o servidor Node (sem IA)            |
| `node app.js`             | Igual ao acima, mas sem auto-reload           |



