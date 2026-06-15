import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Features/auth/pages/Login.jsx'
import Register from './Features/auth/pages/Register.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 style={{ color: 'white', fontSize: '2rem' }}>Welcome to My App</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

