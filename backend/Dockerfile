FROM python:3.12-slim-bullseye

WORKDIR /app

# Install curl and other dependencies
RUN apt-get update && apt-get install -y curl build-essential libssl-dev pkg-config

# Install nillion toolchain
RUN curl https://nilup.nilogy.xyz/install.sh | bash

# Add nillion to PATH
ENV PATH="/root/.nilup/bin:${PATH}"

# Install nillion devnet
RUN nillion install latest

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --upgrade nada-dsl nillion-client

# Copy application code
COPY . .

# Create a script to handle properly building with devnet running
RUN echo '#!/bin/bash\n\
# Start nillion-devnet in the background\n\
nillion-devnet &\n\
DEVNET_PID=$!\n\
# Wait for devnet to fully start\n\
sleep 15\n\
# Build nada program\n\
echo "Building nada program..."\n\
nada build\n\
# Keep devnet running for the Flask app\n\
echo "Nada build complete, keeping devnet running"\n\
' > /app/build_nada.sh

RUN chmod +x /app/build_nada.sh

# Execute the build script to properly build with devnet running
RUN /app/build_nada.sh

# Setup entrypoint script for running the server
RUN echo '#!/bin/bash\n\
# Start nillion-devnet in the background if not already running\n\
pgrep -f nillion-devnet > /dev/null || (nillion-devnet &)\n\
# Wait for devnet to fully start\n\
sleep 15\n\
# Start the Flask application\n\
echo "Starting Flask application..."\n\
gunicorn --bind 0.0.0.0:$PORT app:app\n\
' > /app/entrypoint.sh

RUN chmod +x /app/entrypoint.sh

# Expose port
EXPOSE 5000

# Run the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]