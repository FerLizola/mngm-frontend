import React from "react";
import styles from "./Products.module.css";
import Card from "../UI/Card";
import ProductItem from "./ProductItem/ProductItem";
import { useState, useCallback, useEffect } from "react";
import Header from "../Layout/Header";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [errorState, setErrorState] = useState(null)

  const prodList = useCallback( () => {
    fetch('http://localhost:8098/products',{ headers: {
      'Content-Type':'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('token'),
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers': 'Content-Type, Authorization'
    }}).then(response => {
      if(!response.ok){
        throw new Error('There is a problem while reading products data!');
      }
      return response.json();
    }).then(data => {
      console.log(data);
      setProducts(data);
      return (data);
    }).catch(error =>{
      setErrorState(error.message);
    });
  }, []);

  useEffect(() =>{
    prodList();
  }, [prodList]);

  //console.log(prodList());
  //{errorState && <p>{error}</p>}
  const prodListarray = products.map((prod) => {
    return (
      <ProductItem
      id={prod.prodID}
        key={prod.prodID}
        name={prod.prodName}
        description={prod.prodDescr}
        price={prod.prodPrice}
      />
    );
  });
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{prodListarray}</ul>
      </Card>
    </section>
  );
};

export default Products;
