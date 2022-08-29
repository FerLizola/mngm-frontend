import React from 'react';

const OrderItem = (props) => {
        const price = `$${props.price.toFixed(2)}`;
        const cardtCtx = useContext(CartContext);
    
        const addToCartHandler = amount => {
          cardtCtx.addItem({
            id: props.id,
            status: props.status,
            amount: props.amount,
            date: props.date
          });
        };
    
      return (
        <li className={styles.meal}>
          <div>
            <h3>{props.orderId}</h3>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.price}>{price}</div>
          </div>
          <div>
            <ProductItemForm onAddToCart={addToCartHandler} id={props.id}/>
          </div>
        </li>
      );
};

export default OrderItem;