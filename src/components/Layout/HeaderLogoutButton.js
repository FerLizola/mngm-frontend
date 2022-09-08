import React, { Fragment } from 'react';
import styles from './HeaderCartButton.module.css';

const HeaderLogoutButton = (props) => {
    return <Fragment><button className={styles.button} onClick={props.onClick}>
             <span>Log Out</span>          
        </button>
    </Fragment>
};

export default HeaderLogoutButton;