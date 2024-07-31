import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login'

function App() {
  const [count, setCount] = useState(0)

  return ( 
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Login} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
