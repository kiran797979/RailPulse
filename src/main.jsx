import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/globals.css'
import { MockSocketProvider } from './components/MockSocket.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MockSocketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MockSocketProvider>
  </React.StrictMode>,
)
