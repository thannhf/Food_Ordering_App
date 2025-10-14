import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import AddressForm from './pages/AddressForm'
import MyOrders from './pages/MyOrders'
import Footer from './components/Footer'
import Header from './components/Header'
import {Toaster} from "react-hot-toast"
import Sidebar from './components/owner/Sidebar'
import Dashboard from './pages/owner/Dashboard'
import AddProduct from './pages/owner/AddProduct'
import ListProducts from './pages/owner/ListProducts'
import { useAppContext } from './context/AppContext'

const App = () => {
  const isOwnerPath = useLocation().pathname.includes('owner')

  return (
    <main className='overflow-x-hidden text-textColor'>
      {!isOwnerPath && <Header />}
      <Toaster position='bottom-right' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/address-form' element={<AddressForm />} />
        <Route path='/my-orders' element={<MyOrders />} />
        <Route path='/owner' element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path='/owner/add-product' element={<AddProduct />} />
          <Route path='/owner/list-product' element={<ListProducts />} />
        </Route>
      </Routes>
      {!isOwnerPath && <Footer />}
    </main>
  )
}

export default App