import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchAppBar from "../components/searchAppBar";
import { useContext, useState } from "react";
import { LoggedInUserContext } from "../provider/loggedInUserDataProvider";
import axios from "axios";
import { AnonymousUserDataContext } from "../provider/anonymousUserDataProvider";
import { tokenExpirationWarning, updateLoggedInUser } from "../utility/utility";
import { SessionContext } from "../provider/sessionProvider";

const Login = () => {
  const { setLoggedInUserData } = useContext(LoggedInUserContext);
  const { anonymousUserData, setAnonymousUserData } = useContext(
    AnonymousUserDataContext
  );
  const { setModalOpen } = useContext(SessionContext);
  const naviagate = useNavigate();

  const [formData, setFormData] = useState({
    email: "amitnigade0@gmail.com",
    password: "123456",
  });

  const calculateCartItemsOnLogin = (
    anonymousCartItems: Object[],
    curUserCartItems: any[]
  ) => {
    let newArr: any = [];
    anonymousCartItems.forEach((el: any, i: any) => {
      let isMatch = false;
      curUserCartItems.forEach((item: any, j: any) => {
        if (el.productId === item.productId) {
          curUserCartItems[j].quantity += el.quantity;
          isMatch = true;
        }
      });
      if (!isMatch) {
        newArr.push(el);
      }
    });
    const finalCart = [...curUserCartItems, ...newArr];
    console.log(finalCart);
    return finalCart;
  };

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const res = await axios.post(
        "http://localhost:3001/api/user/login",
        formData,
        { withCredentials: true }
      );
      if (res.status === 200) {
        //localStorage.setItem('token', res.data.token);
        tokenExpirationWarning(res?.data?.tokenExpiresIn, setModalOpen);
        const currentUserData = await axios.get(
          "http://localhost:3001/api/user/current",
          { withCredentials: true } // It will attach cookie with request
          // { headers: { Authorization: `Bearer ${res.data.token}` } }
        );
        if (currentUserData.status === 200) {
          if (anonymousUserData?.cartItems?.length > 0) {
            let cartItems = [];
            if (currentUserData.data?.cartItems?.length > 0) {
              // if user logged in successfully
              // Combine logged in user & anonymous user cart items
              // If duplicate products, update count & remove duplicates
              const cartItemsOnLogin = await calculateCartItemsOnLogin(
                anonymousUserData?.cartItems,
                currentUserData.data.cartItems
              );
              cartItems = [...cartItemsOnLogin];
            } else {
              cartItems = [...anonymousUserData?.cartItems];
            }
            const updatedUserData = await updateLoggedInUser(res.data.token, {
              cartItems,
            });
            setLoggedInUserData(updatedUserData);
            setAnonymousUserData((prevData: any) => ({
              ...prevData,
              cartItems: [],
            }));
          } else {
            setLoggedInUserData(currentUserData.data);
          }
          naviagate("/products");
        }
      }
    } catch (err) {
      console.log(`Error while calling login API, ${err}`);
    }
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          "& > :not(style)": {
            m: 5,
            width: 400,
            height: 300,
          },
        }}
      >
        <Paper elevation={3} sx={{ padding: 5 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={{ xs: 1, sm: 3 }}>
              <Typography
                variant="h5"
                display="block"
                textAlign={"center"}
                gutterBottom
              >
                Sign in to eShop
              </Typography>
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Button type="submit" variant="contained">
                Login
              </Button>
              <Typography
                variant="caption"
                display="block"
                textAlign={"center"}
                gutterBottom
              >
                Don't have an account? <Link to={"/Register"}>Sign Up </Link>
                Or <Link to={"/forgotPassword"}>Forgot password</Link>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
