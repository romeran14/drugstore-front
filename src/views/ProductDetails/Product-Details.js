import React, {useEffect, useState, useReducer} from 'react';
import { useParams } from "react-router-dom";
import { Button, Container, Spinner } from 'react-bootstrap';
import Header from '../../components/Header';
import { Link } from "react-router-dom";
import { useContext } from "react"
import { CartContext } from '../../context/CartContext';
import { TYPES } from '../../shoppingActions.js/shoppingActions';
import {swalt} from "swalt"

export default function ProductDetails(props) {
  const {productos} = props.state
  const params = useParams();
  const { code } = params;
  const detalles_producto = productos.filter(element => element.id === Number(code)) 
  const [loading, setLoading] = useState(true);
  
  const dispatcher = useContext(CartContext);

  const AddtoCart = (id) => {

     dispatcher({ type: TYPES.ADD_TO_CART, payload: id });
     swalt ( "Product added successfully", {
      showIcon: true,
      title: "Notification"
  });
  };

  useEffect(() => {
    if (detalles_producto.length == 1){
      setLoading(false)
      }
  }, []);
  
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
              <img
                alt="..."
                src={detalles_producto[0].img}
                style={{
                  width: "300px",
                  border: "2px solid #444",
                }}
              />
              <h2> {detalles_producto[0].nombre} </h2>
              <h2> Precio: {detalles_producto[0].precio}$</h2>
              <h3> Descripcion: {detalles_producto[0].desc} </h3>
              <Button
                className="btn btn-succes"
                onClick={() => AddtoCart(detalles_producto[0].id)}
              >
                Agregar a carrito
              </Button>
              <div
                style={{
                  textAlign: "right",
                }}
              >
                <Link to="/store" className="btn btn-primary">
                
                  Regresar a catalogo
                </Link>
              </div>
            </Container>
          </>
        )}
      </div>
    </>
  );
}

