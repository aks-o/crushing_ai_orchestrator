# api/main.py
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()

# Serve built React static files
app.mount("/frontend", StaticFiles(directory="frontend", html=True), name="frontend")

@app.get("/")
async def read_root():
    return {"message": "Welcome to Crushing AI Orchestrator API"}

@app.get("/ui")
async def serve_dashboard():
    return FileResponse(os.path.join("frontend", "index.html"))
