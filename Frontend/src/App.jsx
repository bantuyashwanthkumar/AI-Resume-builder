import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Features/auth/pages/Login.jsx'
import Register from './Features/auth/pages/Register.jsx'
import Home from './Features/auth/pages/Home.jsx'
import {AuthProvider} from './Features/auth/auth.context.jsx'

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App

