import { useContext } from "react";
import { LoggedInUserContext } from "../provider/loggedInUserDataProvider";
import { Box, Button, Paper, Typography } from "@mui/material";
import SearchAppBar from "../components/searchAppBar";
import CartTable from "../components/cartTable";
import { Link } from "react-router-dom";
import { AnonymousUserDataContext } from "../provider/anonymousUserDataProvider";

const Cart = () => {
  const { loggedInUserData, setLoggedInUserData } =
    useContext(LoggedInUserContext);
  const { anonymousUserData, setAnonymousUserData } = useContext(
    AnonymousUserDataContext
  );
  console.log("anonymousUserData ---  ", anonymousUserData);
  console.log("loggedInUserData ---  ", loggedInUserData);
  let totalCartItems: any = [];
  if (loggedInUserData?.cartItems?.length > 0) {
    totalCartItems = [...loggedInUserData.cartItems];
  } else if (anonymousUserData?.cartItems.length > 0) {
    totalCartItems = [...anonymousUserData?.cartItems];
  }

  // calculate total amount
  let totalAmt = 0;
  if (totalCartItems?.length > 0) {
    totalCartItems.forEach((item: any) => {
      totalAmt += item.offeredPrice * item.quantity;
    });
    console.log("totalAmt :>> ", totalAmt);
  }

  const checkoutLogic = loggedInUserData?.username ? (
    <Link to={"/orders"}>
      <Button type="submit" variant="contained">
        Checkout
      </Button>
    </Link>
  ) : (
    <Link to={"/login"}>
      <Button type="submit" variant="contained">
        Login to Checkout
      </Button>
    </Link>
  );

  const handleRemoveItemFromCart = (e: any) => {
    const productToBeRemoveFromCart = `${e.target.value}`;
    if (loggedInUserData?.username) {
      setLoggedInUserData((prevData: any) => ({
        ...prevData,
        cartItems: prevData.cartItems.filter(
          (item: any) => item._id !== productToBeRemoveFromCart
        ),
      }));
    } else {
      setAnonymousUserData((prevData: any) => ({
        ...prevData,
        cartItems: prevData.cartItems.filter(
          (item: any) => item.productId !== productToBeRemoveFromCart
        ),
      }));
    }
  };

  return (
    <>
      <SearchAppBar loggedInUserData={loggedInUserData} />
      <Typography variant="h4" textAlign={"center"} margin={2}>
        Shopping Cart
      </Typography>
      {totalCartItems?.length > 0 ? (
        <Box>
          <CartTable
            userCartItems={totalCartItems}
            onRemoveCartItem={handleRemoveItemFromCart}
          />
          <Typography sx={{ fontWeight: "bold" }}>
            Subtotal ${totalAmt}
          </Typography>
          {checkoutLogic}
          <Link to={"/products"}>Continue shopping</Link>
        </Box>
      ) : (
        <Paper elevation={3} sx={{ padding: 5 }}>
          Your eShop Cart is empty.
        </Paper>
      )}
    </>
  );
};

export default Cart;
