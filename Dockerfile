# ----------------------
# Frontend Build Stage
# ----------------------
FROM node:20-alpine as frontend

WORKDIR /app
COPY dashboard_ui/ .
RUN npm install && npm run build

# ----------------------
# Backend + Serve Both
# ----------------------
FROM python:3.11-slim

WORKDIR /app

# Install Python backend dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy FastAPI backend
COPY api/ ./api

# Copy frontend build
COPY --from=frontend /app/dist ./frontend

# Install static file serving
RUN pip install fastapi[all] python-multipart

# Final FastAPI app (serving backend + React)
COPY ./serve.py .

CMD ["uvicorn", "serve:app", "--host", "0.0.0.0", "--port", "8080"]
