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
import Payment from "./pages/payment";
import OrderDetails from "./pages/orderDetails";
import Logout from "./pages/logout";
import Account from "./pages/account";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";

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
            <Route path="/logout" Component={Logout} />
            <Route path="/account" Component={Account} />
            <Route path="/cart" Component={Cart} />
            <Route path="/orders" Component={Orders} />
            <Route path="/payment" Component={Payment} />
            <Route path="/orderDetails/:id" Component={OrderDetails} />
            <Route path="/forgotPassword" Component={ForgotPassword} />
            <Route path="/resetPassword" Component={ResetPassword} />
          </Routes>
        </Router>
      </LoggedInUserDataProvider>
    </AnonymousUserDataProvider>
  );
};

export default App;
