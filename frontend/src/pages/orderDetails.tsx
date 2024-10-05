import { useLocation } from "react-router-dom";
import SearchAppBar from "../components/searchAppBar";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Divider,
} from "@mui/material";

const OrderDetails = () => {
  const location = useLocation();
  const { orderData } = location.state || {};
  return (
    <>
      <SearchAppBar />
      <Box sx={{ flexGrow: 1, p: 8 }}>
        <Typography variant="h5">Order details</Typography>
        <Typography variant="body2" color="text.secondary">
          Order Id: {orderData.orderId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total Amount: ${orderData.amount}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Delivery Status: {orderData.deliveryStatus}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Paymengt Status: {orderData.paymentStatus}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Order Date: {orderData.orderDate}
        </Typography>
        <Divider sx={{ marginBottom: 4 }} />
        <Typography variant="h6">Products ordered</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>PRODUCT</TableCell>
                <TableCell align="left">PRICE</TableCell>
                <TableCell align="left">QUANTITY</TableCell>
                <TableCell align="left">TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData.orderProducts.map((item: any) => (
                <TableRow
                  key={item.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box
                      sx={{
                        display: { xs: "flex", md: "flex", gap: 6 },
                        flexGrow: 1,
                      }}
                    >
                      <img height={"60"} src={item.image} alt="" />
                      <Box>{item.title}</Box>
                    </Box>
                  </TableCell>
                  <TableCell align="left">${item.offeredPrice}</TableCell>
                  <TableCell align="left">{item.quantity}</TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    ${item.offeredPrice * item.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default OrderDetails;
