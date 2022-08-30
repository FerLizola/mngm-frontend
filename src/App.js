import React, {useState, Fragment} from "react";
import Header from "./components/Layout/Header";
import MainPage from "./components/Products/MainPage";
import Cart from "./components/Cart/Cart"
import CartProvider from "./store/CartProvider";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import Login from "./components/Auth/Login";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isAuth, setIsAuth] =  useState(false);
  const [token, setToken] = useState(null);
  const [userid, setUserid] = useState(null);

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
      {showModal && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler} onShowHist={showOrderHistory} showHistory={showHistory}/>
      <main>
        {!showHistory && <MainPage/>}
        {showHistory && <OrderHistory/>}
      </main>
      </Fragment>
      }
      {!isAuth && <Login />}
    </CartProvider>
    
  );
}

export default App;
