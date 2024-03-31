import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 添加路由 */}
    <BrowserRouter>
    <AuthContextProvider>
      <App />
      </AuthContextProvider>
    </BrowserRouter>

  </React.StrictMode>,
)
