# Homepage Tab Debugging Guide

## ✅ Backend Status: WORKING

The backend is successfully generating homepages. Test results show:
- Homepage generation works when `generate_homepage: true` is passed
- Homepage data includes HTML, CSS, features, etc.
- Langfuse integration is working correctly

## 🔍 Frontend Investigation

The homepage tab should appear when:
1. `result.homepage` exists (line 112 in AnalysisResults.tsx)
2. The tab is conditionally rendered (line 344):
   ```tsx
   ...(homepage ? [{ id: 'homepage', label: 'New Homepage', icon: Code }] : []),
   ```

## 📝 Things to Check in Browser

1. **Analyze a website with Advanced Options**:
   - Click "Advanced Options"
   - Ensure "Generate improved homepage" is CHECKED ✓
   - Submit the form

2. **After analysis completes**:
   - You should see 5 tabs instead of 4:
     - Overview
     - Recommendations
     - **New Homepage** (this should appear)
     - 🚀 Get New Website
     - Technical Details

3. **If the tab doesn't appear**:
   - Open browser DevTools (F12)
   - Go to Network tab
   - Look for the `/api/analyze` request
   - Check the response to see if `data.homepage` exists

## 🛠️ Quick Fix if Tab is Missing

If the homepage data is being generated but the tab isn't showing, the issue might be:

1. **Form Default**: Make sure "Generate improved homepage" is checked in Advanced Options
2. **Response Data**: The homepage data might not be making it to the component

## 📊 Test Command

You can test the full flow manually:
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.mcdonalds.com",
    "generate_homepage": true,
    "style_preference": "modern",
    "include_booking": false
  }' | jq '.data.homepage' | head -20
```

If this returns homepage data but the UI doesn't show it, the issue is in the frontend state management.