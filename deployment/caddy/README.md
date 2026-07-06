# Caddy Configuration for Frontend

This directory contains Caddy reverse proxy configurations for the heinapp frontend service (Next.js).

## Overview

Caddy serves as a reverse proxy and provides:
- ✅ **Automatic HTTPS** with Let's Encrypt (certificates and renewal)
- ✅ **Security headers** (HSTS, X-Frame-Options, etc.)
- ✅ **Request logging**
- ✅ **Health checks**

## Files

- `Caddyfile.staging` - Configuration for staging.heina.org (Frontend)
- `Caddyfile.production` - Configuration for production (Frontend)

## Architecture

**Staging:**
- Frontend: `staging.heina.org` → Port 8082
- Backend API: `api.staging.heina.org` → Port 8002

**Production:**
- Frontend: `your-domain.com` → Port 8080
- Backend API: `api.your-domain.com` → Port 8000

## Dynamic Combined Caddyfile

The frontend Caddyfile is **automatically combined** with the backend Caddyfile during deployment:

1. Frontend config: `/root/heinapp/heinapp-frontend-service/deployment/caddy/Caddyfile.{environment}`
2. Backend config: `/root/heinapp/heinapp-backend-service/caddy/Caddyfile.{environment}`
3. Combined to: `/etc/caddy/Caddyfile`

This allows each project to manage its own Caddy configuration independently.

## Deployment

The `deploy-caddy.sh` script automatically:
1. Reads the frontend Caddyfile (from this project)
2. Reads the backend Caddyfile (from backend project)
3. Combines them into `/etc/caddy/Caddyfile`
4. Validates the configuration
5. Reloads Caddy without downtime

The GitHub Actions workflow calls this script automatically during deployment.

## Manual Operations

### View current config
```bash
cat /etc/caddy/Caddyfile
```

### Reload Caddy
```bash
sudo systemctl reload caddy
```

### Check logs
```bash
# Frontend logs
sudo tail -f /var/log/caddy/staging.heina.org-frontend.log

# Backend logs
sudo tail -f /var/log/caddy/api.staging.heina.org.log

# System logs
sudo journalctl -u caddy -f
```

## DNS Configuration

Ensure both subdomains point to the server:

```
staging.heina.org        A    <SERVER_IP_ADDRESS>
api.staging.heina.org    A    <SERVER_IP_ADDRESS>
```

Caddy will automatically provision separate SSL certificates for each subdomain.
