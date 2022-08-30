import React from 'react';
import styles from "../../Products/ProductItem/ProductItem.module.css";

const OrderItem = (props) => {
  const showDetails = () => {

  };
  const price = `$${props.totalAmount.toFixed(2)}`;

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.orderId}</h3>
        <div className={styles.description}>{props.orderStatus}</div>
        <div className={styles.description}>{props.orderDate}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <button onClick={showDetails} id={props.id}>Details</button>
      </div>
    </li>
  );
};

export default OrderItem;