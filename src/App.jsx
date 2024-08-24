import { useEffect, useState } from 'react' 
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword';
import VerifyOTP from './pages/Auth/VerifyOTP';
import ChangePassword from './pages/Auth/ChangePassword';
import Dashboard from './pages/Main/Dashboard';
import MainLayout from './layouts/MainLayout';
import Profile from './pages/Main/Profile';
import Users from './pages/Main/Users';
import Transactions from './pages/Main/Transactions';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)

  const mainRoutes = [
    {
      path:'/dashboard',
      Component:Dashboard,
    },
    {
      path:'/transactions',
      Component:Transactions,
    },
    {
      path:'/users',
      Component:Users,
    },
    {
      path:'/settings',
      Component:Profile,
    },
  ]

  
  useEffect(async () => {

    await axios.get('http://127.0.0.1:8000/api/profile',{
      headers:{
        Authorization:"Bearer 5|seN7PFUtoG6AqivH0YDGiN9es6mhFObxIOAv5L032f556c01"
      }
    }).then(res => console.log(res))
    .catch(e => console.log(e))

  }, [])
  

  return ( 
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Login} />
        <Route path='/login' Component={Login} />
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
