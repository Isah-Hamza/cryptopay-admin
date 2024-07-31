import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword';
import VerifyOTP from './pages/Auth/VerifyOTP';
import ChangePassword from './pages/Auth/ChangePassword';

function App() {
  const [count, setCount] = useState(0)

  return ( 
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Login} />
        <Route path='/forgot-password' Component={ForgotPassword} />
        <Route path='/verify-otp' Component={VerifyOTP} />
        <Route path='/change-password' Component={ChangePassword} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
