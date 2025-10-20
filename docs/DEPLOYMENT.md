# LUMINAUT Deployment Guide

## Vercel Deployment

### Prerequisites
- GitHub account with repository
- Vercel account
- API keys for all services

### Steps

1. **Push to GitHub**
\`\`\`bash
git push origin main
\`\`\`

2. **Import in Vercel**
   - Go to https://vercel.com/new
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - Add all variables from `.env.example`
   - Set `NODE_ENV=production`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Post-Deployment

1. **Verify Service Worker**
   - Open DevTools
   - Check Application > Service Workers
   - Should show "active and running"

2. **Test API Endpoints**
   - Visit `/api/trpc/wallet.getBalance`
   - Should return valid response

3. **Monitor Performance**
   - Use Vercel Analytics
   - Check Web Vitals
   - Monitor error rates

## Docker Deployment

### Build Image
\`\`\`bash
docker build -t luminaut:latest .
\`\`\`

### Run Container
\`\`\`bash
docker run -p 3000:3000 \\
  -e NEXT_PUBLIC_ALCHEMY_API_KEY=your_key \\
  -e OPENAI_API_KEY=your_key \\
  luminaut:latest
\`\`\`

## Self-Hosted Deployment

### Requirements
- Node.js 18+
- PostgreSQL (optional)
- Redis (optional)
- Nginx or similar reverse proxy

### Setup

1. **Clone Repository**
\`\`\`bash
git clone https://github.com/luminaut/wallet.git
cd luminaut
\`\`\`

2. **Install Dependencies**
\`\`\`bash
npm install
npm run build
\`\`\`

3. **Configure Environment**
\`\`\`bash
cp .env.example .env.production
# Edit .env.production with your values
\`\`\`

4. **Start Server**
\`\`\`bash
npm start
\`\`\`

5. **Configure Nginx**
\`\`\`nginx
server {
    listen 80;
    server_name luminaut.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

## Monitoring & Maintenance

### Health Checks
\`\`\`bash
curl https://luminaut.example.com/api/health
\`\`\`

### Logs
\`\`\`bash
# View application logs
pm2 logs luminaut

# View error logs
tail -f /var/log/luminaut/error.log
\`\`\`

### Updates
\`\`\`bash
git pull origin main
npm install
npm run build
npm restart
\`\`\`

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set secure environment variables
- [ ] Enable CORS protection
- [ ] Configure rate limiting
- [ ] Enable Web Application Firewall
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Monitor for vulnerabilities

## Performance Optimization

- Enable gzip compression
- Configure CDN for static assets
- Use Redis for caching
- Implement database connection pooling
- Monitor API response times
- Optimize database queries
