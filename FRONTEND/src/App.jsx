import React, { useContext, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Cart from './pages/Cart/Cart'
import MyOrders from './pages/MyOrders/MyOrders';
import { StoreContext } from './context/StoreContext';
import Dashboard from './pages/Dashboard/Dashboard';
import Authorization from './Admin/Authorization/Authorization';

const App = () => {
  const [showLogin,setShowLogin] = useState(false)
  const {token,role} = useContext(StoreContext);
  const location = useLocation()
  return (
    <>
      <Toaster />
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></> }
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home setShowLogin={setShowLogin}/>} />
        {token && (
          <>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/myOrders' element={<MyOrders/>} />
        {role === 'admin' ? (
                <Route path='/admin/dashboard/*' element={<Dashboard />} />
        ) : (
        <Route path='/admin/*' element={<Navigate to ='/NotAuthorized'/>} />
        )}
        </>
      )}
      <Route path='/NotAuthorized' element={<Authorization/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
