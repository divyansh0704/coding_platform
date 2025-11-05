import react from "react"
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx'
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import './App.css'
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}
function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={ <ProtectedRoute><MainPage /></ProtectedRoute> } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>

  )
}

export default App

