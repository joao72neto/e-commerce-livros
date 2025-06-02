import time
import google

def retry_api_call(funcao, tentativas=10, espera_base=1):
    for i in range(tentativas):
        try:
            return funcao()
        except google.genai.errors.ServerError as e:
            if i < tentativas - 1:
                espera = espera_base * (2 ** i)
                time.sleep(espera)
                continue
            else:
                raise e
