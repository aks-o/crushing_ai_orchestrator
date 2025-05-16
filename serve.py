# serve.py
from api.main import app as backend

app = backend  # 👈 used by uvicorn as "serve:app"
