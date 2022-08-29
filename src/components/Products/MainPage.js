import React from "react";
import Products from "./Products";
import WelcomeMessage from "./WelcomeMessage";

const MainPage = () => {
    return <React.Fragment>
        <WelcomeMessage/>
        <Products/>
    </React.Fragment>
};

export default MainPage;