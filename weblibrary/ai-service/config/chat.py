import os
from google import genai
from google.genai import types
from dotenv import load_dotenv
from config.system_instruction import ai_instruction
from build.context_builder import buil_base_context
from utils.genai_retry import retry_api_call

#Configurando a IA
load_dotenv()
api_key = os.getenv('GOOGLE_API_KEY')

#Configurando a minha api_key
client = genai.Client(api_key=api_key)

#Defininfo o meumodelo e o conteúdo que eu vou mostrar
model = 'gemini-2.0-flash'
    
#Função que reseta as intruções do chat
def create_ai_chat():
     
    #Configurando o conteúdo que deve ser gerado
    chat_config = types.GenerateContentConfig(
        system_instruction = ai_instruction()
    )
    
    #Criando e retornando chat
    chat = client.chats.create(model=model, config=chat_config)
    
    #Configurando os dados para a IA
    retry_api_call(lambda: chat.send_message(buil_base_context()))
    
    #Retornando o chat configurado
    return chat

