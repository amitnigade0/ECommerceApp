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

const Register = () => {
  const naviagate = useNavigate();
  const handleSubmit = async (event: any) => {
    naviagate("/login");
    alert("Registration successful, please login!");
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
          <form onSubmit={handleSubmit}>
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
                required
              />
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Email"
                required
              />
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Password"
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
