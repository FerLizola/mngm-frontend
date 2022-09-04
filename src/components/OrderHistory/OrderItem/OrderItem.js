import React from 'react';
import { Fragment, useState } from 'react';
import styles from "../../Products/ProductItem/ProductItem.module.css";
import Button from "../../UI/Button";
import OrderDetail from '../OrderDetails/OrderDetail';

const OrderItem = (props) => {

  const [showDetails, setShowDetails] = useState(false);

    const showDetailsHandler = (ordrId) => {
      setShowDetails(true);
      
    }
    const hideDetailsHandler = () => {
      setShowDetails(false);
    }

  const price = `$${props.totalAmount.toFixed(2)}`;

  return (
    <Fragment>
      {showDetails && <OrderDetail orderId={props.orderId} onClose={hideDetailsHandler} totalAmount={props.totalAmount}/>}
    <li className={styles.meal}>
      <div>
        <h3>{props.orderId}</h3>
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