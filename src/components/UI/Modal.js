import React from "react";
import ReactDOM from 'react-dom';
import classes from "./Modal.module.css";
import styles from "./Modal.module.css";

const BackDrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portElement = document.getElementById('overlays');

const Modal = (props) => {
    return <React.Fragment>
       {ReactDOM.createPortal(<BackDrop onClick={props.onClick}/>, portElement)}
       {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portElement)}
    </React.Fragment>
};

export default Modal;
