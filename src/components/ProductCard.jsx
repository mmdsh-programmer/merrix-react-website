import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Grid from "@material-ui/core/Grid";
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
  button: {
    minWidth: "30px",
    padding: "3px 3px",
  },
  borderlessButton: {
    border: "none",
  },
  coloredBorderButton: {
    borderBottom: "1px solid rgba(245, 0, 87, 0.5) !important",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  topMargin: {
    marginTop: "10px",
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
      </CardActionArea>
      <CardActions>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Typography
              variant="body1"
              component="h2"
              className={classes.topMargin}
            >
              {props.title}
            </Typography>
            <Typography variant="body1" component="h2">
              {props.sku}
            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.buttonContainer}>
            <ButtonGroup orientation="vertical">
              {isInCart(props) && (
                <Button
                  aria-label="reduce"
                  size="small"
                  variant="outlined"
                  color="secondary"
                  className={[classes.button, classes.coloredBorderButton].join(
                    " "
                  )}
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
              {isInCart(props) && (
                <Button
                  aria-label="count"
                  size="small"
                  variant="outlined"
                  className={[classes.button, classes.borderlessButton].join(
                    " "
                  )}
                >
                  {isInCart(props) ? selectedCartItem(props.id)[0].quantity : 0}
                </Button>
              )}
              <Button
                aria-label="increase"
                size="small"
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  setCount(count + 1);
                  isInCart(props) ? increase(props) : addProduct(props);
                }}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
