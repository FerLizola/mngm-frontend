import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import { useContext } from "react";
import CartItem from './CartItem';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length>0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const createOrder = (order) => {
    let items= [];  
    cartCtx.items.forEach(item => {
      const orderItem = { "prodId": item.id, "quantity": item.amount}
    });
    const newOrder = {   
     "newOrder" : { 
       "order": {
            "orderStatus": "IN_PROGRESS",
            "totalAmount": cartCtx.totalAmount.toFixed(2),
            "personId": 3 //TODO: add the proper userID
          },
        "orderItem": items
      }
  };
  var keys = Object.keys(newOrder);
  var JSONOut = "{";
  for (let i = 0; i < keys.length; i++) {
   JSONOut = JSONOut + `"${keys[i]}":"${order[keys[i]]}",`;
  }
JSONOut = JSONOut + "}";
    fetch('http://localhost:8090/order',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    }).then( response => {
      console.log(response);
      //return response.json();
    });
    
  }

  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount: 1});
  };

  const cartItems = (
    <ul className={styles["cart-item"]}>
      {cartCtx.items.map((item) => {
        return  <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} 
        onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}/>;
      })}
    </ul>
  );
  return (
    <Modal onClick={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
          <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
          {hasItem && <button className={styles.button} onClick={createOrder}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
