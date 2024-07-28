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
import { useContext } from "react";
import { LoginContext } from "../provider/userLoginProvider";

const Login = () => {
  const { setIsUserLoggedIn } = useContext(LoginContext);
  const naviagate = useNavigate();
  const handleSubmit = async (event: any) => {
    setIsUserLoggedIn(true);
    if (true) {
      naviagate("/products");
    }
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
                required
              />
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Password"
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
