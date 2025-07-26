import './App.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import AddProduct from './Screens/AddProduct';
import Landing from './Screens/Landing';
import ForgotPassword from './components/ForgotPassword';
import ChatBox from './components/ChatBox';
import { useParams } from 'react-router-dom';
import ChatWrapper from './components/ChatWrapper';

export default function App() {
  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log(localStorage);
  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/' element={<Landing />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/myOrder' element={<MyOrders />} />
            <Route exact path='/chatbot' element={<Chatbot />} />
            <Route exact path='/Categories' element={<Categories />} />
            <Route exact path='/addproduct' element={<AddProduct />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/chat/:productId/:sellerEmail"
              element={<ChatBox currentUserEmail={localStorage.userEmail} />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
