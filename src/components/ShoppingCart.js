import { useReducer, useContext } from "react";
import { Container } from "react-bootstrap";
import Product from "./Product";
import Header from "./Header";
import { CartContext } from "../context/CartContext";

const ShoppingCart = ({ state }) => {
  const { productos, cart, total } = state;

  const dispatcher = useContext(CartContext);


  return (
    <>
      <Header />

      <Container>
        <h2>Catalogo</h2>

        <div className="box">
          {productos ? (
            productos.map((product) => (
              <Product key={product.id} data={product}></Product>
            ))
          ) : (
            <span></span>
          )}
        </div>
      </Container>
    </>
  );
};

export default ShoppingCart;
