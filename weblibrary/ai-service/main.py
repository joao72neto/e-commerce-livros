#Imports para lidar com o servidor
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

#Imports para lidar com a IA generativa
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv

#importando funções própria
from apis import livros as lvr
from filtro import embeddings as ebd
from filtro import faiss_index as fid

#Criando o app do FastAPI
app = FastAPI()

#Configurando o CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

#Criando um modelo para receber a msg do Cliente
class Pergunta(BaseModel):
    msg: str

#Criando um endpoint para teste
@app.post('/ai')
def chat(pergunta: Pergunta):
    
    #Gerando embedding dos livros
    livros = lvr.buscar_todos_livros()
    text = [livro['lvr_titulo'] + " " + livro['lvr_sinopse'] for livro in livros]
    
    books_embedding = ebd.gerar_embedding(text)
    
    #Gerando index faiss com base no embedding do livros
    index = fid.criar_index_faiss(books_embedding)
    
    #Gerando embedding da pergunta do usuário
    query_embedding = ebd.gerar_embedding([pergunta.msg])
    
    #Buscando os três livros mais próximos
    k = 3
    _, indices = index.search(query_embedding, k)

    #Montando um contexto para a IA
    context = ''
    for i in indices[0]:
        livro = livros[i]
        print(livro)
        context += f'Título: {livro['lvr_titulo']}\nDescrição: {livro['lvr_sinopse']}\n\n'
    
    
    #Preparando a intrução para a IA
    system_instruction = (
        "Você é um assistente pessoal de um e-commerce de livros chamado weblibrary e deve agir como tal, respondendo perguntas relacionadas a livros. Sue nome não é mais Gemini, você é IA do e-commerce WebLibrary. \n------------------------------------\nUse as informações dos livros abaixo para responder às perguntas de forma concisa:\n\n" + context
    )
   
    #INICIALIZANDO A IA
   
    #Obtendo a api_key
    load_dotenv()
    api_key = os.getenv('GOOGLE_API_KEY')
    
    #Configurando a minha api_key
    client = genai.Client(api_key=api_key)
    
    #Defininfo o meumodelo e o conteúdo que eu vou mostrar
    model = 'gemini-2.0-flash'
    
    #Configurando o conteúdo que deve ser gerado
    chat_config = types.GenerateContentConfig(
        system_instruction = system_instruction
    )
    
    #Criando um chat para conversar com a IA
    chat = client.chats.create(model=model, config=chat_config)
    
    #Retornando a resposta da IA
    return {'ai_res': chat.send_message(pergunta.msg).text}
