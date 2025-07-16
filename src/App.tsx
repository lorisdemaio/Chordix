import { Route, Routes } from 'react-router';
import './index.css';

// COMPONENTI
import Navbar from './components/navbar';
import Footer from './components/footer';
import Cart from './components/cart';

import Profile from './components/profilo/profile';
import Indirizzo from './components/profilo/indirizzo';
import MetodoPagamento from './components/profilo/metodoPagamento';
import Ordini from './components/profilo/ordini';

import Dashboard from './components/admin/dashboard';

// PAGINE
import Landing from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Prodotti from './pages/prodotti';
import Chitarra from './pages/chitarra';

export default function App() {

  return (
    <>
      <header>  
        <Navbar />
      </header> 
      
      <main>  
        <Routes>
          <Route element = {<Landing />} path='/' />
          <Route element = {<Login />} path='/login' />
          <Route element = {<Register />} path='/register' />
          <Route element = {<Prodotti />} path='/prodotti' />
          <Route element = {<Chitarra />} path='/chitarra/:id' />

          <Route element = {<Profile />} path='/profile' />
          <Route element = {<Indirizzo />} path='/profile/indirizzo' />
          <Route element = {<MetodoPagamento />} path='/profile/metodo_pagamento' />
          <Route element = {<Ordini />} path='/profile/ordini/:id' />

          <Route element = {<Dashboard />} path='/admin' />

          <Route element = {<Cart />}  path='/cart' />
        </Routes>
      </main> 

      <footer>
        <Footer />
      </footer>
    </>
  )
}