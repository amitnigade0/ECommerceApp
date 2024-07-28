import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material";

import { useLocation } from "react-router-dom";
import SearchAppBar from "../components/searchAppBar";
import { useContext } from "react";
import { LoginContext } from "../provider/userLoginProvider";

const ProductDetails = () => {
  const { isUserLoggedIn } = useContext(LoginContext);
  const location = useLocation();
  const { productData } = location.state || {};
  const offerPrice = Math.round(
    productData.price -
      (productData.discountPercentage * productData.price) / 100
  );

  return (
    <>
      <SearchAppBar isUserLoggedIn={isUserLoggedIn} />
      <Box sx={{ flexGrow: 1, p: 8 }}>
        <Box sx={{ width: "100%" }}>
          <Grid container rowSpacing={4}>
            <Grid item xs={6}>
              <Card sx={{ maxWidth: 545 }}>
                <CardMedia
                  sx={{ height: 500 }}
                  image={productData.images[0]}
                  title={productData.title}
                />
              </Card>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h4" color="text.secondary">
                {productData.title}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                ${productData.price}
              </Typography>

              <Typography variant="h6" color="text.secondary">
                Offer price ${offerPrice}.00 / {productData.discountPercentage}%
                OFF
              </Typography>
              <Box display={"flex"}>
                <Rating name="half-rating" defaultValue={3.4} precision={0.5} />
                <Box>{productData.reviews.length} reviews</Box>
              </Box>

              <Divider />
              <Typography variant="body2" color="text.secondary">
                {productData.description}
              </Typography>
              <Divider />
              <Typography variant="subtitle2">
                CATEGORY: {productData.category}
              </Typography>
              <Typography variant="subtitle2">
                BRAND: {productData.brand}
              </Typography>
              <Typography>{productData.availabilityStatus}</Typography>
              <Divider />
              <Typography>{productData.warrantyInformation}</Typography>
              <Typography>{productData.shippingInformation}</Typography>
              <Typography>{productData.returnPolicy}</Typography>
              <Divider />
              <Typography variant="subtitle2">
                QUANITITY:
                <Box>
                  <form action="/action_page.php">
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      max="5"
                    />
                    <input type="submit" />
                  </form>
                </Box>
              </Typography>
              <Divider />
              <Button variant="contained" disableElevation>
                Add to Cart
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ p: 8 }}>
            <Grid container>
              {productData.reviews.map((review: any) => (
                <Grid item xs={2}>
                  <Box
                    sx={{
                      display: { xs: "flex", md: "flex", gap: 6 },
                      flexGrow: 1,
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                    <Box>
                      {" "}
                      <Typography variant="body2" color="text.secondary">
                        {review.reviewerName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(review.date).toDateString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Rating
                    name="half-rating"
                    defaultValue={review.rating}
                    precision={0.5}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {review.comment}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetails;
