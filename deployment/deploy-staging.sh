#!/usr/bin/env bash

set -e

echo "🚀 Deploying heinapp-frontend to STAGING..."

# Change to project root
cd "$(dirname "$0")/.."

# Check if .env.staging exists
if [ ! -f .env.staging ]; then
    echo "❌ Error: .env.staging not found!"
    exit 1
fi

# Copy .env.staging as .env.local so Next.js inlines NEXT_PUBLIC_* vars at build time
echo "📋 Preparing environment for build..."
cp .env.staging .env.local

# Build Docker image
echo "🐳 Building Docker image..."
docker build --network=host -t heinapp-frontend-service-staging .

# Clean up temporary .env.local
rm -f .env.local

# Stop and remove old container
echo "🔄 Stopping old container..."
docker rm -f heinapp-frontend-staging 2>/dev/null || true

# Run new container
echo "▶️  Starting new container..."
docker run -d \
  --name heinapp-frontend-staging \
  -p 8082:8080 \
  --env-file .env.staging \
  --restart unless-stopped \
  heinapp-frontend-service-staging

# Wait for container to be ready
echo "⏳ Waiting for container to be ready..."
sleep 5

# Check container status
if docker ps | grep -q heinapp-frontend-staging; then
    echo "✅ Container is running!"
else
    echo "❌ Container failed to start. Showing logs:"
    docker logs heinapp-frontend-staging
    exit 1
fi

# Show container logs
echo ""
echo "📋 Container logs:"
docker logs heinapp-frontend-staging --tail 20

# Deploy combined Caddy configuration (frontend + backend)
echo ""
echo "🔧 Deploying combined Caddy configuration..."

# Combine frontend and backend Caddyfiles
cat > /tmp/Caddyfile.combined << 'EOF'
# Combined Caddy Configuration for Staging
# This file is auto-generated - do not edit manually

EOF

# Add frontend config
cat /root/heinapp/heinapp-frontend-service/deployment/caddy/Caddyfile.staging >> /tmp/Caddyfile.combined
echo "" >> /tmp/Caddyfile.combined

# Add backend config if it exists
if [ -f /root/heinapp/heinapp-backend-service/deployment/caddy/Caddyfile.staging ]; then
    cat /root/heinapp/heinapp-backend-service/deployment/caddy/Caddyfile.staging >> /tmp/Caddyfile.combined
    echo "✅ Backend Caddy config included"
else
    echo "⚠️  Backend Caddy config not found, skipping..."
fi

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
echo "🎉 Frontend Staging deployment complete!"
echo "🌐 Frontend: https://staging.heina.org"
echo "🌐 Backend:  https://api.staging.heina.org"
echo ""
echo "📊 Useful commands:"
echo "   docker logs -f heinapp-frontend-staging    # Follow logs"
echo "   docker exec -it heinapp-frontend-staging sh    # Enter container"
echo "   sudo journalctl -u caddy -f    # Caddy logs"
