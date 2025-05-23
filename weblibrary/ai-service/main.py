from fastapi import FastAPI

app = FastAPI(); 

@app.get('/ai')
def teste():
    return {'Hello': 'World'}