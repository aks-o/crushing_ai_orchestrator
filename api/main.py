from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend (React) to call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/metrics")
def get_metrics():
    return {
        "throughput": 500,
        "oversizePercent": 9.2,
        "cubicity": 87.4,
        "wearRate": 2.1,
        "alerts": ["Liner wear high", "Oversize above limit"]
    }
