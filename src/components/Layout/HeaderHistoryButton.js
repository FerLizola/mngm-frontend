import React from 'react';
import styles from './HeaderCartButton.module.css';

const HeaderHistoryButton = (props) => {
    return <button className={styles.button} onClick={props.onClick}>
        {!props.showHistory && <span>Order History</span>}
        {props.showHistory && <span>Home</span>}
    </button>
};

export default HeaderHistoryButton;