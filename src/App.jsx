import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword';
import VerifyOTP from './pages/Auth/VerifyOTP';
import ChangePassword from './pages/Auth/ChangePassword';
import Dashboard from './pages/Main/Dashboard';
import MainLayout from './layouts/MainLayout';
import Referrals from './pages/Main/Referrals';

function App() {
  const [count, setCount] = useState(0)

  const mainRoutes = [
    {
      path:'/dashboard',
      Component:Dashboard,
    },
    {
      path:'/referrals',
      Component:Referrals,
    },
  ]

  return ( 
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Login} />
        <Route path='/forgot-password' Component={ForgotPassword} />
        <Route path='/verify-otp' Component={VerifyOTP} />
        <Route path='/change-password' Component={ChangePassword} />
        <Route path='/' Component={MainLayout} >
          {
            mainRoutes.map((item,idx) => (
              <Route key={idx} path={item.path} Component={item.Component} />
              )
            )
          }
        </Route>
      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
