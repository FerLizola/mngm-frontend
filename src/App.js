import React, { useState, Fragment } from "react";
import Header from "./components/Layout/Header";
import MainPage from "./components/Products/MainPage";
import Cart from "./components/Cart/Cart"
import CartProvider from "./store/CartProvider";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import Login from "./components/Auth/Login";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userid, setUserid] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const getUserID = (token, email) => {
    fetch('http://localhost:8098/personId', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        username: email,
      })
    }).then(res => {
      if (res.status === 401) {
        throw new Error('Unauthorized operation.');
      }
      if (res.status === 422) {
        throw new Error('Validation failed.');
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log('Error!');
        throw new Error('Could not authenticate you!');
      }
      return res.json();
    }).then(data => { 
      return data; 
    })
      .catch(err => {
        console.log(err);
        setIsAuth(false);
        setAuthLoading(false);
      })
  };


  const loginHandler = (event, authData) => {
    event.preventDefault();
    setAuthLoading(true);
    fetch('http://localhost:8098/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: authData.username,
        password: authData.password
      })
    })
      .then(res => {
        if (res.status === 401) {
          throw new Error('Unauthorized operation.');
        }
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        return res.json();
      })
      .then(resData => {
        setIsAuth(true);
        setToken(resData.token);
        setAuthLoading(false);
        const userId = getUserID(resData.token, authData.username);
        //TODO:: get userid
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        //this.setAutoLogout(remainingMilliseconds);
      })
      .catch(err => {
        console.log(err);
        setIsAuth(false);
        setAuthLoading(false);
        //TODO:: setError
      });
  };

  const showCartHandler = () => {
    setShowModal(true);
  }
  const hideCartHandler = () => {
    setShowModal(false);
  }
  const showOrderHistory = () => {
    setShowHistory(!showHistory);
  }
  return (

    <CartProvider>
      {isAuth && <Fragment>
        {showModal && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} onShowHist={showOrderHistory} showHistory={showHistory} />
        <main>
          {!showHistory && <MainPage />}
          {showHistory && <OrderHistory />}
        </main>
      </Fragment>
      }
      {!isAuth && <Login onLogin={loginHandler} loading={authLoading} />}
    </CartProvider>

  );
}

export default App;
