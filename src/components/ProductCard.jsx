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
import Skeleton from "@material-ui/lab/Skeleton";

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
    width: "100%",
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
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  topMargin: {
    marginTop: "10px",
  },
  media: {
    height: 358,
  },
  cardDescription: {
    flexDirection: "row-reverse",
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

  const splitName = (name) => {
    const firstRow = name.split("|")[0];
    const firstRowTemp = name.split("|")[1];
    const secondRow =
      typeof firstRowTemp !== "undefined" && firstRowTemp.split("—")[0];
    const splitedName = { firstRow: firstRow, secondRow: secondRow };
    return splitedName;
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {props.loading ? (
          <Skeleton animation="wave" variant="rect" className={classes.media} />
        ) : (
          <CardMedia
            component="img"
            alt={props.title}
            height="358"
            image={props.image}
            title={props.title}
          />
        )}
      </CardActionArea>
      <CardActions>
        <Grid container spacing={1} className={classes.cardDescription}>
          <Grid item xs={10}>
            {props.loading ? (
              <React.Fragment>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  animation="wave"
                  height={10}
                  width="60%"
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  animation="wave"
                  height={10}
                  width="60%"
                  style={{ marginBottom: 6 }}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography
                  variant="body1"
                  component="h2"
                  className={classes.topMargin}
                  align="right"
                >
                  {splitName(props.title).firstRow}
                </Typography>
                <Typography variant="body1" component="h2" align="right">
                  {splitName(props.title).secondRow}
                </Typography>
                <Typography variant="body1" component="h2" align="right">
                  X Code : {props.sku}
                </Typography>
              </React.Fragment>
            )}
          </Grid>
          {!props.loading && (
            <Grid item xs={2} className={classes.buttonContainer}>
              <ButtonGroup orientation="vertical">
                {isInCart(props) && (
                  <Button
                    aria-label="reduce"
                    size="small"
                    variant="outlined"
                    color="secondary"
                    className={[
                      classes.button,
                      classes.coloredBorderButton,
                    ].join(" ")}
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
                    {isInCart(props)
                      ? selectedCartItem(props.id)[0].quantity
                      : 0}
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
          )}
        </Grid>
      </CardActions>
    </Card>
  );
}
