import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchAppBar from "../components/searchAppBar";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const naviagate = useNavigate();

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const res = await axios.post(
        "http://localhost:3001/api/user/register",
        formData
      );
      if (res.status === 200) {
        naviagate("/login");
        alert("Registration successful, please login!");
      }
    } catch (err) {
      console.log(`Error while calling products API: ${err}`);
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
                Sign up for eShop
              </Typography>
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
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
                Sign Up
              </Button>
              <Typography
                variant="caption"
                display="block"
                textAlign={"center"}
                gutterBottom
              >
                Already have an account? <Link to={"/Login"}>Log In</Link>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Register;
