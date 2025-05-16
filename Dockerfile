# Build React frontend
FROM node:20-alpine as frontend
WORKDIR /app
COPY dashboard_ui/ .
RUN npm install && npm run build

# Build Python backend
FROM python:3.11-slim as stage-1
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY api/ ./api
COPY serve.py .
COPY --from=frontend /app/dist ./frontend
CMD ["uvicorn", "serve:app", "--host", "0.0.0.0", "--port", "8080"]
