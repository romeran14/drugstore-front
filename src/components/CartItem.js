import { Button } from "react-bootstrap";

const CartItem = ({ data, deltoCart }) => {
  let { id, nombre, precio, quantity } = data;
  return (
    <div className="CartItem">
      <h4>{nombre}</h4>
      <h4>
        Precio: {precio}$ x {quantity} = {precio * quantity}
      </h4>

      <Button onClick={() => deltoCart(id)} className="btn btn-danger">
        Eliminar uno
      </Button>
      <Button onClick={() => deltoCart(id, true)} className="btn btn-danger">
        Eliminar todos
      </Button>
    </div>
  );
};
export default CartItem;
