import time
import google

def retry_api_call(funcao, tentativas=10, espera=3):
    for i in range(tentativas):
        try:
            return funcao()
        except google.genai.errors.ServerError as e:
            if i < tentativas - 1:
                time.sleep(espera)
                continue
            else:
                raise e
