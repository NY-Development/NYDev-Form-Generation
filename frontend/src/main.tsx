import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // Added TanStack imports
import './index.css'
import App from './App.tsx'

// 1. Initialize the global QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Configures default fallback options for the caching layer
      refetchOnWindowFocus: false, 
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Wrap the application inside the QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'placeholder'}>
        <App />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>
)