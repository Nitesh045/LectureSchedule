import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Headrer } from './components/Headrer'
import Login from './components/Login'
import Singup from './components/Singup'
import Home from './components/Home'
import { Provider, useSelector } from 'react-redux'
import { Admin } from './Admin'
import { Dash } from './Dash'
import { Update } from './Update'
function App() {
  const isLoggedIn=useSelector(state=>state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <>
      
        <React.Fragment>
        <header>
          
            <Headrer />
            
          </header>
        </React.Fragment>
         
        <main>
          <BrowserRouter>
          <Routes>
           
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Singup/>}/>
            <Route path='/adminLogin' element={<Admin/>}/>
            <Route path='/dash' element={<Dash/>}/>
           { isLoggedIn && <Route path ='/home' element={<Home/>}/>}
           <Route path='/update/:id' element={<Update/>}/>
          </Routes>
          </BrowserRouter>
        </main>
    
    </>
  )
}

export default App
