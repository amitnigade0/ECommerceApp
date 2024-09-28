import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchAppBar from "../components/searchAppBar";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const naviagate = useNavigate();

  const [formData, setFormData] = useState({
    email: "amitnigade0@gmail.com",
  });

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const res = await axios.post(
        "http://localhost:3001/api/user/forgot-password",
        formData
      );
      alert("Reset code sent to your register email Id.");
      if (res.status === 200) {
        naviagate("/resetPassword");
      }
    } catch (err) {
      console.log(`Error while sending reset code, ${err}`);
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
                Forgot Password
              </Typography>
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Button type="submit" variant="contained">
                Send Reset Code
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default ForgotPassword;
