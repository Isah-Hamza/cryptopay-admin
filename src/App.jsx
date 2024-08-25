import { useEffect } from 'react' 
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

  
  // useEffect(async () => {

  //   await axios.patch('http://127.0.0.1:8000/api/transactions/1', {
  //     status:2,
  //     profit:100,
  //   },{
  //     headers:{
  //       Authorization:"Bearer 7|1yaaHPAo141WMnjmeOlzIgO6MQvhAxJulxZ6Lmcpe0a1bfc1"
  //     }
  //   }, ).then(res => console.log(res))
  //   .catch(e => console.log(e))

  // }, []);
  

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
