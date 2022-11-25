import { Button } from "react-bootstrap";
import { useContext, useReducer } from "react";
import { TYPES } from "../shoppingActions.js/shoppingActions";
import { Link } from "react-router-dom";
import { shopingInitialState, shoppingReducer } from '../shoppingActions.js/shoppingReducer';
import { CartContext } from "../context/CartContext";
import {swalt} from "swalt"; 

const Product = (data) => {
  let { id, nombre, precio, img } = data.data;

  const dispatcher = useContext(CartContext)
  const AddtoCart = (id) => {
    dispatcher({ type: TYPES.ADD_TO_CART, payload: id });
    swalt ( "Product added successfully", {
      showIcon: true,
      title: "Notification"
  });
  };

    

  
  return (
    <div className="card">
      <img src={img} alt={nombre} ></img>
      <h4>{nombre}</h4>
      <h5>Precio: {precio}$</h5>
      <Button className="btn btn-success" onClick={() => AddtoCart(id)}
      >
        Agregar
      </Button>
      <Link to={`/product-details/${id}`}> Detalles del Producto </Link>
    </div>
  );
};
export default Product;
