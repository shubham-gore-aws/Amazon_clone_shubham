import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import CreateAccount from './components/registration/CreateAccount'
import Password from './components/Password/Password';
import Header_body from './components/Header_body/Header_body';
import Header_body_main from './components/Header_body/Header_body_main';
import Addtocart from './components/Addtocart'
import Cart from './components/Cart'
import Favorite from './components/Favorite'
import Product_info from './components/Product_info'
import ElectronicsCart from './components/ElectronicsCart'
import Payment from './components/Payment';
import Yourproduct from './components/Yourproduct';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Header/> */}
      {/* <Login/> */}
      {/* <CreateAccount/> */}
      <BrowserRouter>
      <Routes>
        <Route path="/header" element={<div><Header/><div><Header_body/><Header_body_main/></div></div>} />
        <Route path="/" element={<Login/>}/>
        <Route path="/createAccount" element={<CreateAccount/>}/>
        <Route path="/Password" element={<Password/>} />
        <Route path='/Addtocart' element={<div><Header/><Addtocart/></div>}/>
        <Route path='/cart' element={ <div><Header/><Cart/></div>}/>
        <Route path='/productinfo' element={<div> <Header/> <Product_info/></div>}/>
        <Route path='/favoriteinfo' element={ <div><Header/><Favorite/></div>}/>
        <Route path='/ElectronicsCart' element={<div><Header/><ElectronicsCart/></div>}/>
        <Route path='/yourproduct' element={<div><Header/><Yourproduct/></div>}/>
        <Route path='/payment' element={<Payment/>}/>

      </Routes> 
      </BrowserRouter> 
    </>
  )
}

export default App
