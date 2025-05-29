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
from filtro import intent as itt

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

#Criando o index faiss filtrado
livros = lvr.buscar_todos_livros()
text = [livro['lvr_titulo'] + " com custo de " + livro['lvr_preco'] + " " + livro['lvr_sinopse'] for livro in livros]
books_embedding = ebd.gerar_embedding(text)
index = fid.criar_index_faiss(books_embedding)
    
#Configurando a IA
load_dotenv()
api_key = os.getenv('GOOGLE_API_KEY')

#Configurando a minha api_key
client = genai.Client(api_key=api_key)

#Defininfo o meumodelo e o conteúdo que eu vou mostrar
model = 'gemini-2.0-flash'
    
#Preparando a intrução para a IA
system_instruction = (
    """
        Você é a IA oficial do e-commerce de livros chamado WebLibrary. Seu papel é atuar como assistente virtual, respondendo às perguntas dos clientes com base nas informações que serão fornecidas ao longo da conversa.  
        Seu nome não é Gemini — você é a IA da WebLibrary, e deve se apresentar como tal.  
        Seu objetivo é informar com precisão e, sempre que possível, incentivar o cliente de forma amigável (pode usar emojis) e persuasiva a considerar a compra dos livros oferecidos.

        ### DADOS FORNECIDOS
        Durante a conversa, você receberá informações sobre livros, precedidas sempre pelo seguinte texto: '[DADOS DE CONTEXTO]'.  
        Esses dados são a única base confiável para suas respostas. **Você nunca deve inventar livros, autores ou preços.**  
        Você pode complementar as sinopses com informações conhecidas, **desde que elas estejam alinhadas ao conteúdo original e não alterem o sentido da obra**.  
        Se uma pergunta for feita e você não encontrar informações relevantes entre os dados recebidos, informe isso educadamente ao cliente.  
        Mensagens genéricas como 'Oi', 'Olá', ou outras que não contenham uma pergunta sobre livros **não devem gerar recomendações automáticas**. Nesses casos, responda de forma simpática e breve, aguardando novas instruções do cliente.  
        Considere apenas os dados mais recentes recebidos durante a conversa, e **nunca utilize informações externas ou que não estejam no bloco [DADOS DE CONTEXTO]**.

        ### USO DOS DADOS
        - Utilize apenas os dados recebidos nas mensagens do chat, incluindo o histórico da conversa — você pode e deve usar dados recebidos anteriormente para responder, mesmo que a mensagem atual não traga novos livros. 
        - Os dados podem mudar ao longo do tempo — considere os mais recentes como prioridade, mas mantenha os anteriores disponíveis como referência complementar, desde que ainda façam sentido no contexto da conversa.
        - Você só deve mencionar livros que foram fornecidos explicitamente.  
        - Nunca use conhecimento externo ou invente títulos ou características de livros.

        ### ESTILO DE RESPOSTA
        - Seja direto, claro e conciso.  
        - Se o cliente apenas cumprimentar (como 'oi', 'olá' ou similares), responda de forma breve e simpática.  
        - Evite mensagens longas ou explicações desnecessárias no início da conversa.  
        - Seja cordial e tente despertar o interesse do cliente pelos livros, mas sem exageros ou insistência.

        ### IMPORTANTE
        - Nunca contradiga os dados recebidos.  
        - Nunca diga que você é uma IA da Google, ou mencione modelos como Gemini.  
        - Nunca mostre o texto literal do bloco de dados de contexto para o cliente. Use essas informações apenas como base para formular suas respostas. Não diga '[DADOS DE CONTEXTO]', nem copie os dados literalmente.
        - Lembre-se: você representa a WebLibrary.

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
    # mensagem_chatbot = f'[MENSAGEM DO USUÁRIO]\n{user_message}\n'
    
    #Obtendo a intenção do usuário
    intencao = itt.classificar_intencao(user_message, ebd.gerar_embedding)
    
    # if intencao == 'search_book':
    
    #Gerando embedding da pergunta do usuário
    query_embedding = ebd.gerar_embedding([pergunta.msg])
    
    #Buscando os três livros mais próximos
    k = 3
    _, indices = index.search(query_embedding, k)

    #Montando um contexto para a IA
    context = '[DADOS DE CONTEXTO]\n\n'
    for i in indices[0]:
        livro = livros[i]
        context += (
            f'Título: {livro['lvr_titulo']}\n'
            f'Descrição: {livro['lvr_sinopse']}\n'
            f'Preço: {livro['lvr_preco']}\n\n'
        )

    mensagem_chatbot = f'[MENSAGEM DO USUÁRIO]\n{user_message}\n\n{context}'
        
    print(mensagem_chatbot)
        
    #Retornando a resposta da IA
    resposta = chat.send_message(mensagem_chatbot).text
    return {'ai_res': resposta}
