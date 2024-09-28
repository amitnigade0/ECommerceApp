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
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const naviagate = useNavigate();
  const [formData, setFormData] = useState({
    resetPasswordToken: "",
    newPassword: "",
  });

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const res = await axios.post(
        "http://localhost:3001/api/user/reset-password",
        formData
      );
      alert("Password reset successfully!");
      if (res.status === 201) {
        naviagate("/login");
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
                Reset Password
              </Typography>
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Reset Code"
                name="resetPasswordToken"
                value={formData.resetPasswordToken}
                onChange={handleChange}
                required
              />
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="New Password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <Button type="submit" variant="contained">
                Reset Password
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default ResetPassword;
