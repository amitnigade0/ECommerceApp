import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Link } from "@mui/material";

export default function CartTable(props: any) {
  return (
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
          {props.userCartItems.map((item: any) => (
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
                  <Box>
                    <Box>{item.title}</Box>
                    <Link
                      component="button"
                      value={item.productId}
                      onClick={props.onRemoveCartItem}
                    >
                      Remove
                    </Link>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="left">{item.offeredPrice}</TableCell>
              <TableCell align="left">{item.quantity}</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                ${item.offeredPrice * item.quantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
