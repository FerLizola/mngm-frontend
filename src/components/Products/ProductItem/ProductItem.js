import { useContext } from "react";
import styles from "./ProductItem.module.css";
import ProductItemForm from "./ProductItemForm";
import CartContext from '../../../store/cart-context';
const ProductItem = (props) => {
    const price = `$${props.price.toFixed(2)}`;
    const cardtCtx = useContext(CartContext);

    const addToCartHandler = amount => {
      cardtCtx.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price
      });
    };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <ProductItemForm onAddToCart={addToCartHandler} id={props.id}/>
      </div>
    </li>
  );
};

export default ProductItem;
