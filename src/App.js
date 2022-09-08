import React, { useState, Fragment } from "react";
import Header from "./components/Layout/Header";
import MainPage from "./components/Products/MainPage";
import Cart from "./components/Cart/Cart"
import CartProvider from "./store/CartProvider";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import Login from "./components/Auth/Login";
import Popup from "./components/UI/Popup";
import Button from './components/UI/Button';
import OrderDetail from "./components/OrderHistory/OrderDetails/OrderDetail";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userid, setUserid] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [errorState, setErrorState] = useState(null);

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
      setUserid(data);
      localStorage.setItem('userId', data);
      return data; 
    })
      .catch(err => {
        setErrorState(err.message);
        console.log(err);
        //setIsAuth(false);
        setAuthLoading(false);
      })
  };

  const logoutHandler = () => {
    setIsAuth(false);
    setAuthLoading(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
  }


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
          throw new Error('Could not authenticate you! Check your credentials and try again.');
        }
        return res.json();
      })
      .then(resData => {
        setIsAuth(true);
        setToken(resData.token);
        setAuthLoading(false);
        getUserID(resData.token, authData.username);
        //TODO:: get userid
        localStorage.setItem('token', resData.token);
        //localStorage.setItem('userId', userid);
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
        setErrorState(err.message);
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
    setShowHistory(true);
    setShowDetails(false);
  }

  const onCloseOrderHistory = () => {
    setShowHistory(false);
  }

  const showOrderCreated = () => {
    setOrderCreated(!orderCreated);
  }
  
  const closeOrderCreated = () => {
    showOrderCreated();
    showOrderHistory();
  }
  const onShowDetails = () => {
    setShowDetails(true);
    setShowHistory(false);
  }
  const onCloseDetails = () =>{
    showOrderHistory();
  }

  return (

    <CartProvider>
      {isAuth && <Fragment>

        {showModal && <Cart onClose={hideCartHandler} onCreateOrder={showOrderCreated} />}
        <Header onShowCart={showCartHandler} onShowHist={showOrderHistory} onLogout={logoutHandler}
          showHistory={showHistory} showDetails={showDetails} onHideHistory={onCloseOrderHistory}/>
        <main>
        
          {!showHistory && !showDetails && <MainPage />}
          {showHistory && <OrderHistory onShowDetails={onShowDetails}/>}
          {!showHistory && showDetails && <OrderDetail onClose={onCloseDetails}/>}
          {orderCreated && <Popup content={<>
              <b>Order Created!</b>
              <p>Order created successfully, check your email for details.</p>
              <Button onClick={closeOrderCreated} >Ok</Button>
          </>}
          handleClose={closeOrderCreated}/>}
         </main>
      </Fragment>
      }
      {!isAuth && <Login onLogin={loginHandler} loading={authLoading} error={errorState}/>}
    </CartProvider>

  );
}

export default App;
