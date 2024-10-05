import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { Link } from "react-router-dom";

export default function OrderTable(props: any) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ORDER ID</TableCell>
            <TableCell align="left">AMOUNT</TableCell>
            <TableCell align="left">PAYMENT STATUS</TableCell>
            <TableCell align="left">DELIVERY STATUS</TableCell>
            <TableCell align="left">DATE</TableCell>
            <TableCell align="left">ORDER DETAILS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.userOrderItems.map((item: any) => (
            <TableRow
              key={item.orderId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{item.orderId}</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                ${item.amount}
              </TableCell>
              <TableCell align="left">{item.paymentStatus}</TableCell>
              <TableCell align="left">{item.deliveryStatus}</TableCell>
              <TableCell align="left">{item.orderDate}</TableCell>
              <TableCell align="left">
                <Link
                  to={`/orderDetails/${item.orderId}`}
                  state={{ orderData: item }}
                >
                  <SummarizeIcon />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
