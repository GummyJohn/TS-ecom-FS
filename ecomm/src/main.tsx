import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthRoleProvider } from './roleContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthRoleProvider>
      <App />
    </AuthRoleProvider>
  </React.StrictMode>,
)
