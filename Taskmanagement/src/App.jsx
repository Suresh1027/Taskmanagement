import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './assets/Landingpage/LandingPage'
import Login from './assets/login-page/Login'
import Register from './assets/register-page/Register'
import Dashboard from './assets/Main Dashboard/Dashboard/Dashboard'
import Navbar from '../src/assets/Headers/Navbar.jsx'
import Viewproject from '../src/assets/Main Dashboard/PROJECT/Viewproject/Viewproject.jsx'
import Updateproject from './assets/Main Dashboard/PROJECT/Updateproject/Updateproject.jsx'
function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Viewproject/:id" element={<Viewproject />} />
          <Route path="/Updateproject/:id" element={<Updateproject />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App