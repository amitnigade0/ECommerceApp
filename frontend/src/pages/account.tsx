import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Card, CardMedia, Typography } from "@mui/material";
import SearchAppBar from "../components/searchAppBar";
import { Link } from "react-router-dom";
import cartImg from "../public/my-cart.avif";
import orderImg from "../public/orders.jpg";
import paymentImg from "../public/paymentImg.jpg";
import profileImg from "../public/profile.jpg";

const Account = () => {
  return (
    <>
      <SearchAppBar />
      <Box sx={{ flexGrow: 1, p: 8 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4} key={1}>
            <Card sx={{ display: "flex", p: 4 }}>
              <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={profileImg}
                alt="Live from space album cover"
              />
              <Box>
                <Typography variant="h6">My Profile</Typography>
                <Typography variant="body2" color="text.secondary">
                  Edit profile details
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={2} sm={4} md={4} key={2}>
            <Link to={"/orders"} style={{ textDecoration: "none" }}>
              <Card sx={{ display: "flex", p: 4 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 100 }}
                  image={orderImg}
                  alt="Live from space album cover"
                />
                <Box>
                  <Typography variant="h6">My Orders</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Track, return or buy things again
                  </Typography>
                </Box>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={2} sm={4} md={4} key={3}>
            <Link to={"/cart"} style={{ textDecoration: "none" }}>
              <Card sx={{ display: "flex", p: 4 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 100 }}
                  image={cartImg}
                  alt="Live from space album cover"
                />
                <Box>
                  <Typography variant="h6">My Cart</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add, update or remove cart items
                  </Typography>
                </Box>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={2} sm={4} md={4} key={4}>
            <Card sx={{ display: "flex", p: 4 }}>
              <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={paymentImg}
                alt="Live from space album cover"
              />
              <Box>
                <Typography variant="h6">Payment Information</Typography>
                <Typography variant="body2" color="text.secondary">
                  Edit payment information
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Account;
