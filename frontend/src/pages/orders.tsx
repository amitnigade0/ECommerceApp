import { useContext } from "react";
import { LoggedInUserContext } from "../provider/loggedInUserDataProvider";
import { Paper, Typography } from "@mui/material";
import SearchAppBar from "../components/searchAppBar";
import OrderTable from "../components/orderTable";

const Orders = () => {
  const { loggedInUserData } = useContext(LoggedInUserContext);
  return (
    <>
      <SearchAppBar loggedInUserData={loggedInUserData} />
      <Typography variant="h4" textAlign={"center"} margin={2}>
        Your Orders
      </Typography>
      {loggedInUserData?.orders?.length > 0 ? (
        <OrderTable userOrderItems={loggedInUserData.orders} />
      ) : (
        <Paper elevation={3} sx={{ padding: 5 }}>
          Looks like you haven't placed an order.
        </Paper>
      )}
    </>
  );
};

export default Orders;
