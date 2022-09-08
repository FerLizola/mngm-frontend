import React, { Fragment } from 'react';
import styles from './HeaderCartButton.module.css';

const HeaderHistoryButton = (props) => {
    return <Fragment>{!props.showHistory && !props.showDetails &&<button className={styles.button} onClick={props.onClick}>
             <span>Order History</span>          
        </button>}
        {!props.showHistory && props.showDetails &&<button className={styles.button} onClick={props.onClick}>
             <span>Order History</span>
          
        </button>}
        {props.showHistory &&<button className={styles.button} onClick={props.onHideHistory}>
             <span>Home</span>
        </button>}
    </Fragment>
};

export default HeaderHistoryButton;