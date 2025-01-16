import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeProvider'
import Layout from './components/Layouts/Layout'
import Home from './components/Home/Home'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
function App() {

  return (
    <>
    <BrowserRouter>
     <ThemeProvider defaultTheme='dark'>
    <Layout>
    <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/' element={<Home/>}/>
    </Routes>
    </Layout>
     </ThemeProvider>
    </BrowserRouter>
      {/* <BrowserRouter>

  <Layout>
    <Routes>
    <Route path="/" element={<Home/>}/>
    </Routes>
  </Layout>
 
  </BrowserRouter> */}
      </>
  )
}

export default App
