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
import Shipping from './components/Shipping/Shipping'
import OrderForm from './components/Order/OrderForm'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme='dark'>
        <Layout>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/collections" element={<Collections />} />

            {/* Private Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/product/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><CartInfo /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><OrderForm /></PrivateRoute>} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
