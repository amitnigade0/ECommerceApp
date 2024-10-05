import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import MediaCard from "./mediaCard";
import { Link } from "react-router-dom";

export default function Cards() {
  const [products, setProdcuts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((response) => {
        if (response.status === 200) {
          setProdcuts(response.data);
        } else {
          console.log("Inappropriate data received from server!");
        }
      })
      .catch((err) => {
        console.log(`Error while calling products API: ${err}`);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 8 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {products.map((product, index) => (
          <Grid xs={2} sm={3} md={3} key={index}>
            <Link
              to={`/products/${product["_id"]}`}
              state={{ productData: product }}
              style={{ textDecoration: "none" }}
            >
              <MediaCard productItem={product} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
