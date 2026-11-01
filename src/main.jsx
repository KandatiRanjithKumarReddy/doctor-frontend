import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'
import './index.css'
import App from './App.jsx'
import AppContextProvider from './context/AppContext.jsx'

// Set 15-second network timeout so flaky mobile connections fail gracefully instead of hanging indefinitely
axios.defaults.timeout = 15000

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

const appTree = (
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {googleClientId ? (
      <GoogleOAuthProvider clientId={googleClientId}>{appTree}</GoogleOAuthProvider>
    ) : (
      appTree
    )}
  </StrictMode>
)
