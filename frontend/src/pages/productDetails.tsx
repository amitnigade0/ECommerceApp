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

import warrenty from "../warrenty.png";
import shipping from "../shipping.png";
import returnPolicy from "../returnPolocy.png";
import { LoggedInUserContext } from "../provider/loggedInUserDataProvider";
import { useLocation, useNavigate } from "react-router-dom";
import SearchAppBar from "../components/searchAppBar";
import { useContext, useState } from "react";
import { AnonymousUserDataContext } from "../provider/anonymousUserDataProvider";
import { updateLoggedInUser } from "../utility/utility";

const ProductDetails = () => {
  const { loggedInUserData, setLoggedInUserData } =
    useContext(LoggedInUserContext);
  const { anonymousUserData, setAnonymousUserData } = useContext(
    AnonymousUserDataContext
  );

  const location = useLocation();
  const { productData } = location.state || {};
  const offerPrice = Math.round(
    productData.price -
      (productData.discountPercentage * productData.price) / 100
  );
  const [quantityCount, setQuantityCount] = useState(1);
  const [enableViewCart, setEnableViewCart] = useState(false);

  const token = localStorage.getItem("token");

  const prodcutsAddedInCart = [
    ...loggedInUserData.cartItems,
    ...anonymousUserData.cartItems,
  ];

  const naviagate = useNavigate();

  const handleAddToCartBtn = async (event: any) => {
    let cartItem = {
      productId: productData._id,
      image: productData.thumbnail,
      title: productData.title,
      offeredPrice: offerPrice,
      quantity: quantityCount,
      date: new Date().toLocaleString(),
    };
    if (loggedInUserData?.username) {
      let cartItems = [cartItem, ...loggedInUserData.cartItems];
      const updatedUserData = await updateLoggedInUser(token, {cartItems});
      setLoggedInUserData(updatedUserData);
    } else {
      setAnonymousUserData((prevData: any) => ({
        ...prevData,
        cartItems: [cartItem, ...prevData.cartItems],
      }));
    }
  };

  const handleViewCartBtn = () => {
    naviagate("/cart");
  };

  if (prodcutsAddedInCart.length > 0 && !enableViewCart) {
    const isProductAddedInCart = prodcutsAddedInCart.find(
      (el: any) => el.productId === productData._id
    );
    if (isProductAddedInCart) setEnableViewCart(true);
  }

  return (
    <>
      <SearchAppBar loggedInUserData={loggedInUserData} />
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
              <Typography variant="h4">{productData.title}</Typography>

              <Box
                sx={{
                  display: { xs: "flex", md: "flex", gap: 6 },
                  flexGrow: 1,
                }}
              >
                <Typography variant="h4" color="red">
                  -{productData.discountPercentage}%
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  ${offerPrice}.00
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "line-through",
                    alignContent: "center",
                  }}
                >
                  ${productData.price}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: { xs: "flex", md: "flex", gap: 6 },
                  flexGrow: 1,
                }}
              >
                <Rating
                  name="half-rating"
                  defaultValue={3.4}
                  precision={0.5}
                  readOnly
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ alignContent: "end" }}
                >
                  {productData.reviews.length} reviews
                </Typography>
              </Box>

              <Divider sx={{ margin: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {productData.description}
              </Typography>
              <Divider sx={{ margin: 1 }} />

              <Box
                sx={{
                  display: { xs: "flex", md: "flex", gap: 6 },
                  flexGrow: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  CATEGORY:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {productData.category}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: { xs: "flex", md: "flex", gap: 6 },
                  flexGrow: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Brand:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {productData.brand}
                </Typography>
              </Box>

              <Typography variant="body2" color="green">
                {productData.availabilityStatus}
              </Typography>
              <Divider sx={{ margin: 1 }} />

              <Box
                sx={{
                  display: { xs: "flex", md: "flex", gap: 6 },
                  flexGrow: 1,
                  textAlign: "center",
                }}
              >
                <Box>
                  <img height={"30"} src={warrenty} alt="" loading="lazy" />
                  <Typography variant="body2" color="text.secondary">
                    {productData.warrantyInformation}
                  </Typography>
                </Box>

                <Divider
                  orientation="vertical"
                  variant="middle"
                  sx={{ margin: 1 }}
                  flexItem
                />
                <Box>
                  <img height={"30"} src={shipping} alt="" loading="lazy" />
                  <Typography variant="body2" color="text.secondary">
                    {productData.shippingInformation}
                  </Typography>
                </Box>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  sx={{ margin: 1 }}
                  flexItem
                />
                <Box>
                  <img height={"30"} src={returnPolicy} alt="" loading="lazy" />
                  <Typography variant="body2" color="text.secondary">
                    {productData.returnPolicy}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ margin: 1 }} />

              <Box>
                <Box
                  sx={{
                    display: { xs: "flex", md: "flex", gap: 6 },
                    flexGrow: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    QUANITITY:
                  </Typography>
                  <input
                    type="number"
                    id="quantity"
                    value={quantityCount}
                    onChange={(e: any) => setQuantityCount(Number(e.target.value))}
                    name="quantity"
                    min="1"
                    max="5"
                  />
                </Box>
                {enableViewCart ? (
                  <Box>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ marginTop: 2 }}
                      onClick={handleAddToCartBtn}
                      disableElevation
                      disabled
                    >
                      Added to Cart
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ marginTop: 2 }}
                      onClick={handleViewCartBtn}
                      disableElevation
                    >
                      View Cart
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ marginTop: 2 }}
                      onClick={handleAddToCartBtn}
                      disableElevation
                    >
                      Add to Cart
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ p: 8 }}>
            <Grid container>
              {productData.reviews.map((review: any, index: number) => (
                <Grid item xs={2} key={index}>
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
                    readOnly
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
