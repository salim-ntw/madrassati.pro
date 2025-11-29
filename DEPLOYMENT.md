# Deployment Guide

## Environment Variables Setup

### Local Development

Create a `.env` file in the `madrassati-front` directory:

```env
REACT_APP_API_URL=http://localhost:4000
```

### Production (Render.com)

1. Go to your Render dashboard
2. Select your frontend service
3. Navigate to **Environment** tab
4. Click **Add Environment Variable**
5. Add:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://madrassati-back.onrender.com`
6. Save and redeploy

### Other Hosting Platforms

Add the environment variable `REACT_APP_API_URL` with your backend URL:
- **Vercel:** Project Settings → Environment Variables
- **Netlify:** Site Settings → Build & Deploy → Environment
- **Heroku:** Settings → Config Vars

## Quick Reference

### Environment Variable Priority

The API client checks in this order:
1. `REACT_APP_API_URL` ✅ (Recommended)
2. `VITE_API_URL` (Vite standard)
3. Default: `http://localhost:4000` (fallback)

### API Client Usage

All API calls automatically use the environment variable through:
- `src/api/axios.js` - Axios instance with base URL
- `src/api/apiClient.js` - Centralized URL helper
- `src/api/apiClient.ts` - TypeScript version

### Files Updated

✅ All hardcoded URLs removed from:
- `src/api/axios.js`
- `src/api/endpoints.js`
- `src/api/index.js`
- `src/pages/Teacher/sections/Messages.jsx`
- `src/pages/Parent/sections/Messages.jsx`

✅ All API services use centralized client:
- `src/api/messages.js`
- `src/api/student.js`
- `src/api/teacher.js`
- `src/api/parent.js`

## Testing

After setting environment variables:

1. **Local:** Restart dev server (`npm run dev`)
2. **Production:** Rebuild and redeploy

Verify API calls are working:
- Check browser console for API requests
- Ensure requests go to correct backend URL
- Test Socket.IO connections (if applicable)


