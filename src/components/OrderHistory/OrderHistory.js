import React from 'react';
import styles from "../Products/Products.module.css";
import Card from "../UI/Card";
import OrderItem from "./OrderItem/OrderItem";
import { useState, useCallback, useEffect } from "react";
import Header from "../Layout/Header";

const OrderHistory = (props) => {
    const [orders, setOrders] = useState([]);
    const [errorState, setErrorState] = useState(null)

    const orderList = useCallback( () => {
        fetch('http://localhost:8098/orders/' + localStorage.getItem('userId'),{ headers: {
          'Content-Type':'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }, mode :'cors'})
        .then(response => {
          if(!response.ok){
            throw new Error('There is a problem while reading orders!');
          }
          return response.json();
        }).then(data => {
          console.log(data);
          setOrders(data);
          return (data);
        }).catch(error =>{
          setErrorState(error.message);
        });
      }, []);
    
      useEffect(() =>{
        orderList();
      }, [orderList]);
    
      //console.log(prodList());
      //{errorState && <p>{error}</p>}
      const ordrList = orders.map((order) => {
        return (
          <OrderItem
          id={order.orderId}
            key={order.orderId}
            orderStatus={order.orderStatus}
            orderDate={order.orderDate}
            totalAmount={order.totalAmount}
          />
        );
      });
      return (
        <section className={styles.meals}>
          <Card>
            <ul>{ordrList}</ul>
          </Card>
        </section>
      );

    return <div></div>;
}

export default OrderHistory;