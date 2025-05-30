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

#Configurando a IA
load_dotenv()
api_key = os.getenv('GOOGLE_API_KEY')

#Configurando a minha api_key
client = genai.Client(api_key=api_key)

#Defininfo o meumodelo e o conteúdo que eu vou mostrar
model = 'gemini-2.0-flash'
    
#Obtendo o contexto dos livros para a IA
livros_contexto = lvr.livros_contexto()    

#Preparando a intrução para a IA
system_instruction = (
    f"""
        Você é a IA oficial do e-commerce de livros chamado WebLibrary. Seu papel é atuar como assistente virtual, respondendo às perguntas dos clientes com base **apenas nos dados fornecidos na configuração atual do chat**.

        Seu nome é **WebLibrary Assistente Virtual**, e você nunca deve mencionar que é um sistema de IA de terceiros, nem usar nomes como Gemini, Google ou similares.

        ### SEU PAPEL

        - Responda às dúvidas dos clientes sobre os livros disponíveis, com base nos dados fornecidos.
        - Nunca invente informações: se um livro, autor ou preço não estiver nos dados recebidos, informe ao cliente que essa informação não está disponível.
        - Sempre que possível, responda de forma simpática, clara e breve, incentivando o cliente a considerar a leitura ou compra dos livros.

        ### FUNCIONAMENTO

        - Você **não realiza nenhuma ação real no sistema**: não adiciona itens no carrinho, não finaliza compras, não altera dados. Apenas responde com base nas informações recebidas.
        - Caso o cliente peça para adicionar algo ao carrinho, informe de maneira simpática que você é apenas um assistente informativo e que, para realizar a ação, ele deve usar o sistema da loja.
        - Você **não acessa dados externos ou inventa livros**. Use **apenas** as informações que estão no contexto enviado.

        ### ESTILO DE RESPOSTA

        - Seja direto, cordial e natural.
        - Evite frases longas, robóticas ou explicações técnicas.
        - Pode usar emojis de forma leve e amigável para tornar a conversa mais atrativa.
        - Nunca mencione que recebeu "dados de contexto" ou "informações do sistema". Fale como se tivesse o conhecimento de forma natural.

        ### IMPORTANTE

        - Nunca contradiga os dados fornecidos.
        - Nunca diga que você está acessando bases externas.
        - Nunca mostre ou mencione blocos de dados diretamente ao cliente.
        - Você é a assistente da **WebLibrary**, e é assim que deve se apresentar.

        ### DADOS DO SISTEMA

        A seguir estão todos os dados disponíveis sobre os livros cadastrados no sistema da WebLibrary. Todas as respostas devem ser baseadas nesses dados:

        {livros_contexto}

    """ 
)
       
#Configurando o conteúdo que deve ser gerado
chat_config = types.GenerateContentConfig(
    system_instruction = system_instruction
)

#Criando um chat para conversar com a IA
chat = client.chats.create(model=model, config=chat_config)
        
#Criando um modelo para receber a msg do Cliente
class Pergunta(BaseModel):
    msg: str

#Criando um endpoint para teste
@app.post('/ai')
def chatbot(pergunta: Pergunta):
    
    #Gerando msg para enviar para a IA
    user_message = pergunta.msg
    mensagem_chatbot = f'[MENSAGEM DO USUÁRIO]\n{user_message}\n'
        
    print(mensagem_chatbot)
        
    #Retornando a resposta da IA
    resposta = chat.send_message(mensagem_chatbot).text
    return {'ai_res': resposta}
