import styles from "./OrderDetails.module.css";
import Modal from "../../UI/Modal";
import { useState, useCallback, useEffect } from "react";
import OrderDetailsItems from "./OrderDetailsItem";

const OrderDetail = (props) => {
    const [orderItems, setOrderItems] = useState([]);
    const [errorState, setErrorState] = useState(null);
  
    const orderItemsList = useCallback( () => {
        fetch('http://localhost:8098/order/' + props.orderId + '/details',
        { headers: {
          'Content-Type':'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token'),
          'Access-Control-Allow-Origin' : 'http://localhost:3001',
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': 'Content-Type, Authorization'
        }}).then(response => {
          if(!response.ok){
            throw new Error('There is a problem while reading Order details!');
          }
          return response.json();
        }).then(data => {
          console.log(data);
          setOrderItems(data);
          return (data);
        }).catch(error =>{
          setErrorState(error.message);
        });
      }, []);
    
      useEffect(() =>{
        orderItemsList();
      }, [orderItemsList]);

      const cancelOrder = () => {
        fetch('http://localhost:8098/order/' + props.orderId,
        { method: 'DELETE',
        headers: {
          'Content-Type':'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token'),
          'Access-Control-Allow-Origin' : 'http://localhost:3001',
          'Access-Control-Request-Headers': 'Content-Type, Authorization'
        }}).then(response => {
          if(!response.ok){
            throw new Error('Looks there is a problem with the Order, try again!');
          }
          props.onClose();
          return response.json();
        }).catch(error =>{
          setErrorState(error.message);
        });
      }
    

  const orderDet = (
    <ul className={styles["cart-item"]}>
      {orderItems._embedded.OrderItemList.map((item) => {
        return  <OrderDetailsItems key={item.itemId} name={item.prod.prodName} 
                    amount={item.quantity} price={item.prod.prodPrice} />;
      })}
    </ul>
  );
  return (
    <Modal onClick={props.onClose}>
       {errorState && <div className={styles.error}><span>There is a problem getting order details.</span></div>}
      {orderDet}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{props.totalAmount}</span>
      </div>
      <div className={styles.actions}>
          <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
          <button className={styles.button} onClick={cancelOrder}>Cancel Order</button>
      </div>
    </Modal>
  );
};

export default OrderDetail;
