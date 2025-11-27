# Madrassati Frontend

React + Vite frontend application for the Madrassati educational platform.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

## ⚙️ Environment Variables

This project uses environment variables to configure the backend API URL. This allows you to easily switch between development and production environments.

### Setting Up Environment Variables

#### For Local Development

Create a `.env` file in the root of the `madrassati-front` directory:

```env
# Backend API URL
# For local development, use:
REACT_APP_API_URL=http://localhost:4000

# OR use Vite's standard prefix:
# VITE_API_URL=http://localhost:4000
```

**Note:** If no environment variable is set, the app defaults to `http://localhost:4000` for local development.

#### For Production (Render.com)

When deploying to Render.com or other hosting platforms:

1. **Go to your Render dashboard** → Select your frontend service
2. **Navigate to Environment** tab
3. **Add Environment Variable:**
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://madrassati-back.onrender.com`
   - (Replace with your actual backend URL)

**Example for Render.com:**
```
REACT_APP_API_URL=https://madrassati-back.onrender.com
```

### Environment Variable Priority

The API client checks environment variables in this order:
1. `REACT_APP_API_URL` (recommended)
2. `VITE_API_URL` (Vite standard)
3. Default: `http://localhost:4000` (fallback for local dev)

### Important Notes

- **Vite Projects:** Vite uses `import.meta.env` (not `process.env`) to access environment variables
- **Variable Prefix:** While Vite typically requires `VITE_` prefix, this project supports both `REACT_APP_API_URL` and `VITE_API_URL` for flexibility
- **No Restart Needed:** In development, you may need to restart the dev server after changing `.env` files
- **Build Time:** Environment variables are embedded at build time, so rebuild after changing them

## 📦 Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Production Deployment Checklist

- [ ] Set `REACT_APP_API_URL` environment variable in your hosting platform
- [ ] Ensure backend CORS is configured to allow requests from your frontend domain
- [ ] Verify all API endpoints are working correctly
- [ ] Test Socket.IO connections (if using real-time features)

## 🔧 API Client

All API calls are centralized through `src/api/apiClient.js` (or `apiClient.ts` for TypeScript). This ensures:

- ✅ Single source of truth for API URLs
- ✅ Easy environment switching
- ✅ No hardcoded URLs in components
- ✅ Automatic URL prefixing for all requests

### Usage Example

```javascript
import { apiClient } from './api/apiClient';

// Get full API URL
const apiUrl = apiClient.getApiUrl(); // Returns: http://localhost:4000/api

// Build endpoint URL
const messagesUrl = apiClient.url('/messages'); // Returns: http://localhost:4000/api/messages

// Socket.IO URL
const socketUrl = apiClient.getSocketUrl(); // Returns: http://localhost:4000
```

Most API calls use the configured axios instance automatically:

```javascript
import api from './api/axios';

// This automatically uses the correct base URL from environment variables
api.get('/messages');
api.post('/auth/login', { email, password });
```

## 📁 Project Structure

```
src/
├── api/
│   ├── apiClient.js      # Centralized API URL management
│   ├── apiClient.ts      # TypeScript version
│   ├── axios.js          # Axios instance with base URL
│   ├── endpoints.js      # API endpoint definitions
│   ├── messages.js       # Message API service
│   ├── student.js        # Student API service
│   ├── teacher.js        # Teacher API service
│   └── parent.js         # Parent API service
├── components/           # Reusable React components
├── pages/               # Page components
├── contexts/            # React contexts
└── utils/               # Utility functions
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 Additional Notes

- This template uses [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) for Fast Refresh
- For TypeScript support, check out the [Vite TypeScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)
