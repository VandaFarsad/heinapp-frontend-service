#!/usr/bin/env bash

set -e

echo "🚀 Deploying heinapp-frontend to PRODUCTION..."

# Change to project root
cd "$(dirname "$0")/.."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env not found!"
    exit 1
fi

# Safety check for production
read -p "⚠️  Are you sure you want to deploy to PRODUCTION? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "❌ Deployment cancelled."
    exit 0
fi

# Copy .env as .env.local so Next.js inlines NEXT_PUBLIC_* vars at build time
echo "📋 Preparing environment for build..."
cp .env .env.local

# Build Docker image
echo "🐳 Building Docker image..."
docker build --network=host -t heinapp-frontend-service .

# Clean up temporary .env.local
rm -f .env.local

# Stop and remove old container
echo "🔄 Stopping old container..."
docker rm -f heinapp-frontend 2>/dev/null || true

# Run new container
echo "▶️  Starting new container..."
docker run -d \
  --name heinapp-frontend \
  --env-file .env \
  -p 8080:8080 \
  --restart unless-stopped \
  heinapp-frontend-service

# Wait for container to be ready
echo "⏳ Waiting for container to be ready..."
sleep 5

# Check container status
if docker ps | grep -q heinapp-frontend; then
    echo "✅ Container is running!"
else
    echo "❌ Container failed to start. Showing logs:"
    docker logs heinapp-frontend
    exit 1
fi

# Show container logs
echo ""
echo "📋 Container logs:"
docker logs heinapp-frontend --tail 20

# Deploy combined Caddy configuration (frontend + backend)
echo ""
echo "🔧 Deploying combined Caddy configuration..."

# Combine frontend and backend Caddyfiles
cat > /tmp/Caddyfile.combined << 'EOF'
# Combined Caddy Configuration for Production
# This file is auto-generated - do not edit manually

EOF

# Add frontend config
cat /root/heinapp/heinapp-frontend-service/deployment/caddy/Caddyfile.production >> /tmp/Caddyfile.combined
echo "" >> /tmp/Caddyfile.combined

# Add backend config
cat /root/heinapp/heinapp-backend-service/caddy/Caddyfile.production >> /tmp/Caddyfile.combined

# Deploy combined config
sudo cp /tmp/Caddyfile.combined /etc/caddy/Caddyfile
sudo caddy fmt --overwrite /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile

if [ $? -eq 0 ]; then
    sudo systemctl reload caddy || sudo systemctl restart caddy
    echo "✅ Caddy reloaded successfully!"
else
    echo "❌ Caddy configuration invalid!"
    exit 1
fi

echo ""
echo "🎉 Frontend Production deployment complete!"
echo ""
echo "📊 Useful commands:"
echo "   docker logs -f heinapp-frontend    # Follow logs"
echo "   docker exec -it heinapp-frontend sh    # Enter container"
echo "   sudo journalctl -u caddy -f    # Caddy logs"
