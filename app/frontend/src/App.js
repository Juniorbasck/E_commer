import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import CartScreen from "./screens/CartScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import CreateProduct from "./screens/CreateProduct";
import login from "./screens/Login";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={login}/>
        <Route path="/CreateProduct" component={CreateProduct} />
        <Route path="/" component={HomeScreen} exact />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/order" component={OrderScreen} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
