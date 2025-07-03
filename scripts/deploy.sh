#!/bin/bash

# AI Web Upgrader - Orchestrator Service Deployment Script

set -e

echo "🚀 Deploying AI Web Upgrader Orchestrator Service..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️ Warning: .env file not found. Using environment variables."
fi

# Build and start the service
echo "📦 Building Docker image..."
docker-compose build

echo "🔧 Starting service..."
docker-compose up -d

# Wait for service to be ready
echo "⏳ Waiting for service to be ready..."
sleep 15

# Check health
echo "🏥 Checking service health..."
if curl -f http://localhost:${PORT:-3000}/api/health > /dev/null 2>&1; then
    echo "✅ Orchestrator service deployed successfully!"
    echo "🔗 Health check: http://localhost:${PORT:-3000}/api/health"
    echo "🌐 Application: http://localhost:${PORT:-3000}"
else
    echo "❌ Service health check failed"
    echo "📋 Checking logs..."
    docker-compose logs orchestrator
    exit 1
fi

echo "🎉 Deployment complete!"