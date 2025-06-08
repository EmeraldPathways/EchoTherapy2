# AI Companion Backend

A FastAPI backend for the AI Companion application.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## Endpoints

- `GET /` - Root endpoint returning a welcome message
- `GET /health` - Health check endpoint
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation

## Development

For development with auto-reload:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
