import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AppContextProvider } from './context/AppContext.jsx'
import { ToastContainer } from 'react-toastify'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AppContextProvider>
       <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </AppContextProvider>
   
  </BrowserRouter>
    
  </StrictMode>,
)
