import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from './Screens/Home';
import Login from './Screens/Login';
// import './styles/bootstrap-dark.min.css';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './Screens/Signup';
import Cart from './Screens/Cart';
import { CartProvider } from './components/contextReducer';
import Chatbot from './components/Chatbot';
import MyOrders from './Screens/MyOrders';
import Categories from './Screens/Categories';

export default function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/signup' element={<Signup/>} />
          <Route exact path='/cart' element={<Cart/>} />
          <Route exact path='/myOrder' element={<MyOrders/>} />
          <Route exact path='/chatbot' element={<Chatbot/>} />
          <Route exact path='/Categories' element={<Categories/>} />

        </Routes>
      </div>
    </BrowserRouter>
    </CartProvider>
  );  
}
