import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
import { CartContext } from "helpers/CartContext";

const StyledBadge = withStyles((theme) => ({
  badge: {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    left: -8,
    top: -4,
  },
}))(Badge);

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ProductCard(props) {
  const classes = useStyles();
  const [count, setCount] = React.useState(0);
  const {
    cartItems,
    increase,
    addProduct,
    decrease,
    removeProduct,
  } = React.useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  const selectedCartItem = (id) => {
    return cartItems.filter((e) => e.id === id);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.title}
          height="358"
          image={props.image}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="h2">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonGroup>
          <Button
            aria-label="increase"
            size="small"
            variant="outlined"
            onClick={() => {
              setCount(count + 1);
              isInCart(props) ? increase(props) : addProduct(props);
            }}
          >
            <StyledBadge
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              badgeContent={
                isInCart(props) ? selectedCartItem(props.id)[0].quantity : 0
              }
              max={2000}
              color="secondary"
            >
              <AddIcon fontSize="small" />
            </StyledBadge>
          </Button>
          {isInCart(props) && (
            <Button
              aria-label="reduce"
              size="small"
              variant="outlined"
              onClick={() => {
                setCount(Math.max(count - 1, 0));
                selectedCartItem(props.id)[0].quantity === 1
                  ? removeProduct(props)
                  : decrease(props);
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
          )}
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}
