import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeProvider'
import Layout from './components/Layouts/Layout'
import Home from './components/Home/Home'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Collections from './components/Collections/Collections'
import { ProductDetails } from '/src/components/ProductDetails/ProductDetails'
import CartInfo from './components/CartInfo/CartInfo'
import Dashboard from './components/dashboard/Dashboard'
import { ToastContainer } from 'react-toastify'
function App() {

  return (
    <>
    <BrowserRouter>
     <ThemeProvider defaultTheme='dark'>
    <Layout>
      <ToastContainer/>
    <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/dashboard' element={<Dashboard/>}></Route>
    <Route path='/' element={<Home/>}/>
    <Route path='/collections' element={<Collections/>}/>
    <Route path='/product/:id' element={<ProductDetails/>}/>
    <Route path='/cart' element={<CartInfo/>}/>
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
