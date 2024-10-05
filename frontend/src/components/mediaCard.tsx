import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Rating } from "@mui/material";

export default function MediaCard(props: any) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 260 }}
        image={props.productItem.images[0]}
        title={props.productItem.title}
      />
      <CardContent>
        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            {props.productItem.title}
          </Typography>
          <Rating
            name="half-rating"
            defaultValue={props.productItem.rating}
            precision={0.5}
            readOnly
          />
          <Typography variant="body2" color="text.secondary">
            {props.productItem.reviews.length} Reviews
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            ${props.productItem.price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
