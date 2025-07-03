#!/bin/bash

# AI Web Upgrader - Orchestrator Service Stop Script

set -e

echo "🛑 Stopping AI Web Upgrader Orchestrator Service..."

# Stop the service
docker-compose down

echo "🧹 Cleaning up..."

# Optional: Remove unused Docker resources
read -p "Do you want to clean up unused Docker resources? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️ Removing unused Docker resources..."
    docker system prune -f
    echo "✅ Cleanup complete"
fi

echo "✅ Orchestrator service stopped successfully!"