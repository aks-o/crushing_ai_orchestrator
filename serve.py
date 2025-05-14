from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from api.main import app as backend

app = FastAPI()
app.mount("/api", backend)
app.mount("/", StaticFiles(directory="frontend", html=True), name="static")
