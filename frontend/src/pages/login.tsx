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
import { LoginContext } from "../provider/userLoginProvider";
import axios from "axios";

const Login = () => {
  const { setLoggedInUserData } = useContext(LoginContext);
  const naviagate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const res = await axios.post(
        "http://localhost:3001/api/user/login",
        formData
      );
      if (res.status === 200) {
        const currentUserData = await axios.get(
          "http://localhost:3001/api/user/current",
          { headers: { Authorization: `Bearer ${res.data.token}` } }
        );
        if (currentUserData.status === 200) {
          setLoggedInUserData(currentUserData.data);
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
                Don't have an account? <Link to={"/Register"}>Sign Up</Link>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
