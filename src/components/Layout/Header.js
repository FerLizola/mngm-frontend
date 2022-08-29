import React from 'react';
import styles from "./Header.module.css";
import headerImg from '../../assets/backtoschool.jpg'
import HeaderCartButton from './HeaderCartButton';
import HeaderHistoryButton from './HeaderHistoryButton';

const Header = (props) => {
    return <React.Fragment>
        <header className={styles.header}>
            <h1>Retails Order Management!</h1>
            <HeaderHistoryButton onClick={props.onShowHist} showHistory={props.showHistory}/>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={styles['main-image']}>
            <img src={headerImg} alt="Back to school season!"/>
        </div>
    </React.Fragment>;
};

export default Header;