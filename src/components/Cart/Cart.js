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
      const orderItem = { "prodId": item.id, "quantity": item.amount};
      items.push(orderItem);
    });
    const newOrder = {   
     "newOrder" : { 
       "order": {
            "orderStatus": "IN_PROGRESS",
            "totalAmount": cartCtx.totalAmount,
            "personId": localStorage.getItem("userId") //TODO: add the proper userID
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
console.log(JSONOut);
    fetch('http://localhost:8098/order',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
     },
      body: JSON.stringify(newOrder)
    }).then( response => {
      console.log(response);
      cartCtx.items.forEach(item => {
        let totalItems = item.amount;
        console.log(totalItems);
        while(totalItems > 0){
          cartCtx.removeItem(item.id);
          totalItems = totalItems-1;
        }
        
      });
      cartCtx.totalAmount = 0;
      props.onClose();
      props.onCreateOrder();
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
