# Production Deployment Configuration for Orchestrator Service

## 🚨 **Issue Identified**: Missing Production Service URLs

The orchestrator service at `https://orchestrator-service.nolimitz.io` is not displaying generated homepages because it's not properly configured to communicate with the production analyzer and builder services.

## 🔧 **Required Environment Variables for Production**

You need to set these environment variables in your production orchestrator service:

### **Option 1: If services are deployed at separate subdomains**
```env
# Frontend API URL (client-side)
NEXT_PUBLIC_API_URL=https://orchestrator-service.nolimitz.io

# Backend service URLs (server-side)
ANALYZER_SERVICE_URL=https://analyzer-service.nolimitz.io
BUILDER_SERVICE_URL=https://builder-service.nolimitz.io
```

### **Option 2: If services are deployed internally**
```env
# Frontend API URL (client-side)
NEXT_PUBLIC_API_URL=https://orchestrator-service.nolimitz.io

# Backend service URLs (internal network)
ANALYZER_SERVICE_URL=http://analyzer:8001
BUILDER_SERVICE_URL=http://builder:8002
```

### **Option 3: If services use different ports on same domain**
```env
# Frontend API URL (client-side)
NEXT_PUBLIC_API_URL=https://orchestrator-service.nolimitz.io

# Backend service URLs (different ports)
ANALYZER_SERVICE_URL=https://nolimitz.io:8001
BUILDER_SERVICE_URL=https://nolimitz.io:8002
```

## 🕵️ **How to Determine the Correct URLs**

1. **Check your deployment platform** (Coolify, Docker Swarm, Kubernetes):
   - Look for service discovery configuration
   - Check if services are deployed on separate subdomains or internal network

2. **Test service connectivity**:
   ```bash
   # Test analyzer service
   curl https://analyzer-service.nolimitz.io/health
   
   # Test builder service  
   curl https://builder-service.nolimitz.io/health
   ```

## 🔍 **Current Issue Diagnosis**

The orchestrator service is likely using default localhost URLs:
- `ANALYZER_SERVICE_URL=http://127.0.0.1:8001` ❌
- `BUILDER_SERVICE_URL=http://127.0.0.1:8002` ❌

This means:
- ✅ Website analysis might work (if analyzer is deployed correctly)
- ❌ Homepage generation fails (can't reach builder service)
- ❌ No "New Homepage" tab appears in UI

## 🚀 **Deployment Steps**

1. **Identify your service URLs** based on your deployment setup
2. **Update environment variables** in your production deployment
3. **Restart/redeploy** the orchestrator service
4. **Test** the full workflow:
   - Go to https://orchestrator-service.nolimitz.io
   - Enter a website URL
   - Enable "Generate improved homepage" in Advanced Options
   - Verify the "New Homepage" tab appears after analysis

## 🧪 **Testing Commands**

After updating the environment variables, test each service:

```bash
# Test orchestrator health
curl https://orchestrator-service.nolimitz.io/api/health

# Test full workflow (should include homepage generation)
curl -X POST https://orchestrator-service.nolimitz.io/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "generate_homepage": true
  }'
```

## 📋 **Quick Fix Checklist**

- [ ] Identify production URLs for analyzer and builder services
- [ ] Set `ANALYZER_SERVICE_URL` environment variable
- [ ] Set `BUILDER_SERVICE_URL` environment variable  
- [ ] Set `NEXT_PUBLIC_API_URL` environment variable
- [ ] Restart orchestrator service
- [ ] Test homepage generation workflow
- [ ] Verify "New Homepage" tab appears in UI

The most likely fix is setting:
```env
BUILDER_SERVICE_URL=https://builder-service.nolimitz.io
```

Replace with your actual builder service production URL.