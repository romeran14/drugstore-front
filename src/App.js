import React, {useEffect, useReducer} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Spinner} from 'react-bootstrap'
import { shopingInitialState, shoppingReducer } from './shoppingActions.js/shoppingReducer';
import { CartContext } from './context/CartContext';
import ShoppingCart from './components/ShoppingCart';
import ProductDetails from './views/ProductDetails/Product-Details';
import Carrito from './views/Carrito/Carrito';
import Help from './views/About/Help';
import Home from './components/home'
import Detalle from './components/Detalle';


import Axios from 'axios';
import { TYPES } from './shoppingActions.js/shoppingActions';
import RegistroCliente from './components/clientForm';

export default function App() {

  var isLoading = true
  const SERVER_URL = process.env.REACT_APP_SERVER_URL
  const [state, dispatcher] = useReducer(shoppingReducer, shopingInitialState);
  

  useEffect(() => {
   
      Axios.get(`${SERVER_URL}upload`)
      .then((res) => {
        dispatcher({type:TYPES.SET_PRODUCTS, payload: res.data.results})
      })
  }, []);

  return (
    <React.StrictMode>
        <CartContext.Provider value={dispatcher}>
              <BrowserRouter>
                <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/store" element={<ShoppingCart state={state} />} />
                      <Route path="/cart" element={<Carrito state={state} />} />
                      <Route path="/about" element={<Help />} />
                      <Route path="/client" element={<RegistroCliente />} />
                      <Route path="/factura/:idFact" element={<Detalle />}/>
                      <Route
                        path="/product-details/:code"
                        element={<ProductDetails state={state} />} 
                      />
                      <Route
                        path="*"
                        element={
                          <h1>
                            404 <br /> Not Found
                          </h1>
                        }
                      />
             
                </Routes>
              </BrowserRouter>
              </CartContext.Provider>
    </React.StrictMode>
  );
}
