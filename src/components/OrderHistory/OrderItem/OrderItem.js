import React from 'react';
import { Fragment } from 'react';
import styles from "../../Products/ProductItem/ProductItem.module.css";
import Button from "../../UI/Button";

const OrderItem = (props) => {

    const showDetailsHandler = () => {
      localStorage.setItem('orderId', props.id);
      localStorage.setItem('totalAmount', props.totalAmount);
      props.onShowDetails()
    }

  const price = `$${props.totalAmount.toFixed(2)}`;

  return (
    <Fragment>
      {//showDetails && <OrderDetail orderId={props.orderId} onClose={hideDetailsHandler} totalAmount={props.totalAmount}/>
      }
    <li className={styles.meal}>
      <div>
        <h3>Order #{props.id}</h3>
        <div className={styles.description}>{props.orderStatus}</div>
        <div className={styles.description}>{props.orderDate}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <Button onClick={showDetailsHandler} id={props.id}>Details</Button>
      </div>
    </li>
    </Fragment>
  );
};

export default OrderItem;