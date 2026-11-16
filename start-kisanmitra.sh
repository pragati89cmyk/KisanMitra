#!/bin/bash

PROJECT="$HOME/Downloads/KisanMitra/KisanMitra"

echo "🌾 Starting KisanMitra..."

# Check Docker
if ! docker info >/dev/null 2>&1; then
    echo "Please open Docker Desktop first."
    exit 1
fi

# Start backend container if needed
if [ "$(docker inspect -f '{{.State.Running}}' kisanmitra-test)" != "true" ]; then
    docker start kisanmitra-test
else
    echo "Backend is already running."
fi

echo "Backend started!"

# Start frontend
cd "$PROJECT/frontend"

echo "Starting React frontend..."
npm run dev
