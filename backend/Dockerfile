# Use official Python 3.12 slim image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install pkg-config and any other needed build dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create necessary directories with proper permissions
RUN mkdir -p /app/uploads /app/model /app/target && \
    chmod 777 /app/uploads /app/model /app/target

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Create a custom requirements file without plotly to reduce memory footprint
RUN grep -v "plotly" requirements.txt > requirements_minimal.txt

# Install dependencies with memory optimizations
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements_minimal.txt && \
    pip install --upgrade nillion-client

# Copy application code
COPY . .

# Create non-root user with UID 10001 and switch to it
RUN useradd -u 10001 -m appuser && \
    chown -R appuser:appuser /app
USER 10001

# Set environment variables to optimize memory usage
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONIOENCODING=UTF-8 \
    PYTHONHASHSEED=random \
    PYTHONMALLOC=malloc \
    SKLEARN_ALLOW_DEPRECATED_SKLEARN_PACKAGE_INSTALL=True

# Run with limited workers and threads for better memory management
CMD ["gunicorn", "--workers", "1", "--worker-class", "uvicorn.workers.UvicornWorker", "--worker-tmp-dir", "/dev/shm", "--threads", "2", "--timeout", "300", "--bind", "0.0.0.0:8000", "app:app", "--preload", "--max-requests", "50", "--max-requests-jitter", "10"]