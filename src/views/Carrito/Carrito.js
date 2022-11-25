/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useReducer} from 'react';
import { useParams } from "react-router-dom";
import { Button, Container, Spinner } from 'react-bootstrap';
import Header from '../../components/Header';
import { Link } from "react-router-dom";
import { shopingInitialState } from '../../shoppingActions.js/shoppingReducer';
import { useContext } from "react"
import { CartContext } from '../../context/CartContext';
import { TYPES } from '../../shoppingActions.js/shoppingActions';
import CartItem from '../../components/CartItem';
import Axios from 'axios';
import { swalt } from 'swalt';

export default function Carrito({state}) {
    
  const {cart, total} = state
  const [loading, setLoading] = useState(true);
  const dispatcher = useContext(CartContext)
  const [modoSumaTotal, setModoSumaTotal] = useState(true)
  const SERVER_URL = process.env.REACT_APP_SERVER_URL

  const calculateTotal = () => {
     dispatcher({type:TYPES.CALCULATE_TOTAL})
   }
   const deltoCart = (id, all = false) => {
    setModoSumaTotal(false)
    if (all){
      dispatcher({type:TYPES.REMOVE_ALL_FROM_CART, payload: id})
    }else{
      dispatcher({type:TYPES.REMOVE_ONE_FROM_CART, payload: id})
    }
    calculateTotal()
  }
  Axios.defaults.withCredentials = false;

  const procesarCompra = () =>{
    // dispatcher({type:TYPES.CLEAR_CART});

    var hoy = new Date();
    var fecha =
    hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
    var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    const fechaYHora = fecha + " " + hora;
    
    const registrarCompra = () => {
      const idFact = window.crypto.randomUUID()
      localStorage.setItem("idFact",idFact)
      Axios.post(`${SERVER_URL}upload/factura`, {
        fecha: fechaYHora,
        cart: cart,
        idFact: idFact
      }).then(  
          swalt ( "Purchase made successfully", {
        showIcon: true,
        title: "Notification"
    }));
    };

    registrarCompra()
        
  }

  const clearCart = () => {
    setModoSumaTotal(false)
    dispatcher({type:TYPES.CLEAR_CART})
    calculateTotal()
  }

  useEffect( () => {
    if( modoSumaTotal === true){
        calculateTotal()
    }else{
        setModoSumaTotal(true)
    }
   setLoading(false)
  }, [cart]);

 

  return (
    <>
      <Header />
      <div style={{ marginTop: "15px" }}>
        {loading ? (
          <>
            <div className="text-center">
              <Spinner animation="grow" variant="success" />
            </div>
          </>
        ) : (
          <>
            <Container>
              <h2>Carrito</h2>
              <div className="box">
                <div className="lista-cart-item">
                  {cart.map((item, index) => (
                    <CartItem
                      key={index}
                      data={item}
                      deltoCart={deltoCart}
                    ></CartItem>
                  ))}
                </div>
                <div className="Bottom-Carrito">
                  <Button className="btn btn-info" onClick={clearCart}>
                    Limpiar carrito
                  </Button>
                  <Link to="/store" className="btn btn-primary">
                    Regresar a catalogo
                  </Link>
                  <h3 className="total">Precio total :{total}$</h3>
                </div>
                <Link to="/client" className="btn btn-dark" onClick={procesarCompra}> procesar compra </Link>
              </div>
            </Container>
          </>
        )}
      </div>
    </>
  );
}

