import React, {useState} from "react";
import Header from "./components/Layout/Header";
import MainPage from "./components/Products/MainPage";
import Cart from "./components/Cart/Cart"
import CartProvider from "./store/CartProvider";
import OrderHistory from "./components/OrderHistory/OrderHistory";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

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
      {showModal && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler} onShowHist={showOrderHistory} showHistory={showHistory}/>
      <main>
        {!showHistory && <MainPage/>}
        {showHistory && <OrderHistory/>}
      </main>
    </CartProvider>
  );
}

export default App;
