import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
    const [btnHighligh, setBtnHighligh] = useState(false);
    const cartCtx = useContext(CartContext);

    const numItems = cartCtx.items.reduce((currNum, item)=>{
        return currNum + item.amount;
    },0);
    const btnClasses =  `${styles.button} ${btnHighligh ? styles.bump: ''}`;
    const { items } = cartCtx;
    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnHighligh(true);
        const timer = setTimeout(() =>{
            setBtnHighligh(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={styles.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{numItems}</span>
    </button>
};

export default HeaderCartButton;