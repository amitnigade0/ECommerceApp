import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SearchAppBar from "../components/searchAppBar";
import { useContext, useState } from "react";
import { LoggedInUserContext } from "../provider/loggedInUserDataProvider";
import { updateLoggedInUser } from "../utility/utility";

const Payment = () => {
  const { loggedInUserData, setLoggedInUserData } =
    useContext(LoggedInUserContext);

  const location = useLocation();
  const { totalAmt } = location.state || 0;
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Amit Niagde",
    address: "Sector 15, Airoli",
    cardNumber: "6588 1233 4545/ CVV 123",
  });

  const { v4: uuidv4 } = require("uuid");

  const generateOrderId = () => {
    return uuidv4();
  };

  const handleSubmit = async () => {
    alert("Payment successful!");
    setPaymentSuccessful(true);
    let orderProducts: any = [];
    let loggedInUserOrders: any = [];
    loggedInUserData.cartItems.forEach((item: any) => {
      let product = {
        productId: item.productId,
        image: item.image,
        title: item.title,
        offeredPrice: item.offeredPrice,
        quantity: item.quantity,
      };
      orderProducts.push(product);
    });
    loggedInUserOrders.push({
      orderId: generateOrderId(),
      orderDate: new Date().toLocaleString(),
      amount: totalAmt,
      paymentStatus: "completed",
      deliveryStatus: "pending",
      orderProducts,
    });
    const orders = [...loggedInUserData.orders, ...loggedInUserOrders];
    const cartItems: any = [];
    const updatedUserData = await updateLoggedInUser(
      localStorage.getItem("token"),
      { orders, cartItems }
    );
    setLoggedInUserData(updatedUserData);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <SearchAppBar />
      {!paymentSuccessful ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            "& > :not(style)": {
              m: 5,
              width: 400,
              height: 370,
            },
          }}
        >
          <Paper elevation={3} sx={{ padding: 5 }}>
            <form onSubmit={handleSubmit} id="registerForm">
              <Stack spacing={{ xs: 1, sm: 3 }}>
                <Typography
                  variant="h5"
                  display="block"
                  textAlign={"center"}
                  gutterBottom
                >
                  Enter payment details to complete checkout
                </Typography>
                <TextField
                  id="demo-helper-text-misaligned-no-helper"
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <TextField
                  id="demo-helper-text-misaligned-no-helper"
                  label="Adress Information"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <TextField
                  id="demo-helper-text-misaligned-no-helper"
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
                <Button type="submit" variant="contained">
                  Pay Now
                </Button>
                <Typography
                  variant="caption"
                  display="block"
                  textAlign={"center"}
                  gutterBottom
                >
                  want to add more items?{" "}
                  <Link to={"/products"}>Add more items</Link>
                </Typography>
              </Stack>
            </form>
          </Paper>
        </Box>
      ) : (
        <>
          <Typography>Payment Successful, thank you!</Typography>
          <Button type="submit" variant="contained">
            <Link to={"/orders"}>Your Orders</Link>
          </Button>
        </>
      )}
    </>
  );
};

export default Payment;
