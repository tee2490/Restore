import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/Product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {product.name.at(0)?.toLocaleUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "secondary.main" },
        }}
      />

      <CardMedia
        component="img"
        sx={{
          height: "140",
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="secondary">
          {(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton 
          loading={status === 'pendingAddItem' + product.id} //includes('pending') ข้อความที่ต้องการค้นหาหรือเปรียบเทียบ
          onClick={() =>
            dispatch(addBasketItemAsync({ productId: product.id }))
          }
          size="small"
        >
          Add to cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          VIEW
        </Button>
      </CardActions>
    </Card>
  );
}
