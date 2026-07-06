# Caddy + Frontend Deployment Guide

## 🚀 Quick Start - Staging Deployment

### Prerequisites

- ✅ Caddy installed and running
- ✅ DNS configured:
  - `staging.heina.org` → Server IP
  - `api.staging.heina.org` → Server IP
- ✅ `.env.staging` created in both frontend and backend
- ✅ Backend container running

### DNS Setup

```bash
# Add both A records to your DNS provider:
staging.heina.org        A    91.98.34.73
api.staging.heina.org    A    91.98.34.73
```

Verify with:
```bash
dig staging.heina.org
dig api.staging.heina.org
```

### Environment Files

Create `.env.staging` on the server:

**Frontend** (`/root/heinapp/heinapp-frontend-service/.env.staging`):
```bash
NEXT_PUBLIC_API_URL=https://api.staging.heina.org
NEXTAUTH_URL=https://staging.heina.org
NEXTAUTH_SECRET=your-super-secret-key-change-this
NODE_ENV=production
```

**Backend** (already configured):
```bash
# .env.staging includes:
CORS_ALLOWED_ORIGINS=https://staging.heina.org
ALLOWED_HOSTS=api.staging.heina.org,...
```

### Deploy

```bash
# Frontend
cd /root/heinapp/heinapp-frontend-service/deployment
./deploy-staging.sh

# Or Backend (if not already running)
cd /root/heinapp/heinapp-backend-service
./deploy-staging.sh
```

The deployment scripts automatically:
- Build Docker images
- Start containers
- **Combine** frontend and backend Caddyfiles into one
- Reload Caddy with zero downtime

---

## 🏗️ Architecture

```
                          Internet
                             ↓
                    Caddy (Ports 80/443)
                    /                  \
    staging.heina.org                api.staging.heina.org
           ↓                                   ↓
    Frontend Container                 Backend Container
      (Port 8082)                        (Port 8002)
      Next.js App                      Django + Gunicorn
```

**Staging:**
- Frontend: `https://staging.heina.org` → `localhost:8082`
- Backend: `https://api.staging.heina.org` → `localhost:8002`

**Production** (when ready):
- Frontend: `https://heina.org` → `localhost:8080`
- Backend: `https://api.heina.org` → `localhost:8000`

---

## 🔧 How Combined Caddyfile Works

Both deployment scripts create `/etc/caddy/Caddyfile` by combining:

```
/etc/caddy/Caddyfile
├── Frontend config (staging.heina.org)
└── Backend config (api.staging.heina.org)
```

Caddy automatically provisions **separate SSL certificates** for each subdomain.

---

## 📊 Monitoring & Logs

### Container Status

```bash
# View all containers
docker ps

# Frontend logs
docker logs -f heinapp-frontend-staging

# Backend logs
docker logs -f heinapp-backend-staging
```

### Caddy Logs

```bash
# System logs
sudo journalctl -u caddy -f

# Frontend access logs
sudo tail -f /var/log/caddy/staging.heina.org-frontend.log

# Backend access logs
sudo tail -f /var/log/caddy/api.staging.heina.org.log
```

### Current Caddy Config

```bash
cat /etc/caddy/Caddyfile
```

---

## 🔄 Updates & Redeployment

**Deploy new version:**
```bash
cd /root/heinapp/heinapp-frontend-service
git pull
./deployment/deploy-staging.sh
```

**Reload Caddy only** (if config changed):
```bash
sudo systemctl reload caddy
```

**Restart container:**
```bash
docker restart heinapp-frontend-staging
# or
docker restart heinapp-backend-staging
```

---

## ✅ Testing

After deployment:

```bash
# Test frontend
curl -I https://staging.heina.org

# Test backend API
curl -I https://api.staging.heina.org/admin/

# Test HTTPS redirect
curl -I http://staging.heina.org  # Should redirect to HTTPS
```

Open in browser:
- Frontend: https://staging.heina.org
- Backend Admin: https://api.staging.heina.org/admin/

---

## 🐛 Troubleshooting

### "Connection refused"

Container not running:
```bash
docker ps -a
docker logs heinapp-frontend-staging
docker restart heinapp-frontend-staging
```

### "Certificate error"

DNS not propagated yet (wait 5-10 minutes), or:
```bash
sudo journalctl -u caddy -f | grep -i cert
```

### "404 Not Found" on API

Check backend is running:
```bash
curl http://localhost:8002/admin/
docker logs heinapp-backend-staging
```

### CORS errors in browser

Check backend `.env.staging`:
```bash
CORS_ALLOWED_ORIGINS=https://staging.heina.org
```

Then restart backend:
```bash
cd /root/heinapp/heinapp-backend-service
./deploy-staging.sh
```

---

## 🚀 GitHub Actions (Automated Deployment)

See [GITHUB_ACTIONS.md](../heinapp-backend-service/GITHUB_ACTIONS.md) for setting up automated deployments.

**Quick setup:**
1. Set GitHub Secrets (HETZNER_STAGING_HOST, etc.)
2. Tag and push:
```bash
git tag -a v0.1.0-rc.1 -m "First staging release"
git push origin v0.1.0-rc.1
```

GitHub Actions will deploy both frontend and backend automatically! 🎉

---

## 📝 Next Steps

1. ✅ DNS configured for both subdomains
2. ✅ Deploy backend (if not done): `cd /root/heinapp/heinapp-backend-service && ./deploy-staging.sh`
3. ✅ Deploy frontend: `cd /root/heinapp/heinapp-frontend-service/deployment && ./deploy-staging.sh`
4. ✅ Test in browser
5. 🔜 Setup monitoring (Sentry, Uptime Kuma)
6. 🔜 Configure production domains
