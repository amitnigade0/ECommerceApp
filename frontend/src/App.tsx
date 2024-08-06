import "./App.css";
import Products from "./pages/products";
import ProductDetails from "./pages/productDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import { LoggedInUserDataProvider } from "./provider/loggedInUserDataProvider";
import Cart from "./pages/cart";
import Orders from "./pages/orders";
import { AnonymousUserDataProvider } from "./provider/anonymousUserDataProvider";

const App = () => {
  return (
    <AnonymousUserDataProvider>
      <LoggedInUserDataProvider>
        <Router>
          <Routes>
            <Route path="/products" Component={Products} />
            <Route path="/products/:id" Component={ProductDetails} />
            <Route path="/register" Component={Register} />
            <Route path="/login" Component={Login} />
            <Route path="/cart" Component={Cart} />
            <Route path="/orders" Component={Orders} />
          </Routes>
        </Router>
      </LoggedInUserDataProvider>
    </AnonymousUserDataProvider>
  );
};

export default App;
