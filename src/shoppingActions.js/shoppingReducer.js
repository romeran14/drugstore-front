import { TYPES } from "./shoppingActions";
// import {dbcon} from '../../../server/database/conection'

function ProductClass(id, nombre, precio, img="https://www.dummyimage.com/300x200/000/fff.jpg&text=productImage", desc) {
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
  this.img = img;
  this.desc = desc
}




export const shopingInitialState = {
  isLoading:true,
  productos: [],
  cart: [],
  total: 0,
};

export function shoppingReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {

      let newItem = state.productos.find(
        (element) => element.id === action.payload
      );

       let iteminCart = state.cart.find((item) => item.id === newItem.id);
       return iteminCart
         ? {
             ...state,
             cart: state.cart.map((item) =>
               item.id === newItem.id
                 ? { ...item, quantity: item.quantity + 1 }
                 : item
             ),
           }
         : {
             ...state,
             cart: [...state.cart, { ...newItem, quantity: 1 }],
           };
    }
    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find(
        (element) => element.id === action.payload
      );
      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
    }
    case TYPES.REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }
    case TYPES.CALCULATE_TOTAL: {
      let acumulador = 0;

      state.cart.map((item) => {
        return acumulador = acumulador + item.precio * item.quantity;
      });

      return {
        ...state,
        total: acumulador,
      };
    }
    case TYPES.CLEAR_CART: {
      return shopingInitialState;
    }
    case TYPES.SET_PRODUCTS: {
      const Medicinas = action.payload
      let arrproductos = []

        Medicinas.map((item) => {
        let productoM = new ProductClass(item.idProducto, item.nombreProducto, item.precioProducto, item.imgProducto, item.descripcion)
          arrproductos.push(productoM)
        })

      return {...state,
        productos: arrproductos,
      }
    }
    default:
      return state;
  }
}
