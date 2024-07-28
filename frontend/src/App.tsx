import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Products from "./pages/products";
import ProductDetails from "./pages/productDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import { UserLoginProvider } from "./provider/userLoginProvider";

const App = () => {
  return (
    <UserLoginProvider>
      <Router>
        <Routes>
          <Route path="/products" Component={Products} />
          <Route path="/products/:id" Component={ProductDetails} />
          <Route path="/register" Component={Register} />
          <Route path="/login" Component={Login} />
        </Routes>
      </Router>
    </UserLoginProvider>
  );
};

export default App;
