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
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import { Avatar } from "@material-ui/core";

const StyledBadge = withStyles((theme) => ({
  badge: {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    left: -8,
    top: -4,
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: "100%",
    backgroundColor: "#fcfcfc",
  },
  button: {
    minWidth: "25px",
    padding: "1px 1px",
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
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "rgb(160,160,160)",
  },
  middleLine: {
    color: "rgb(102,102,102)",
  },
  code: {
    fontSize: "0.77rem",
    color: "rgb(160,160,160)",
  },
  media: {
    height: 358,
  },
  cardDescription: {
    flexDirection: "row-reverse",
    minHeight: 78,
  },
  customChip: {
    position: "absolute",
    right: 0,
    top: 15,
    minWidth: 65,
    borderRadius: 0,
    //backgroundColor: "#50bb50",
  },
  showPieces: {
    fontSize: "0.77rem",
    color: "rgb(160,160,160)",
    marginTop: 10,
    direction: "initial",
  },
  pack: {
    alignSelf: "center",
    whiteSpace: "pre",
    direction: "initial",
    fontSize: "0.81rem",
  },
  customBox: {
    marginTop: 10,
  },
  new: {
    width: 30,
    height: "auto",
    objectFit: "contain",
    borderRadius: 0,
    marginLeft: 5,
  },
  CardActionArea: {
    "&:hover": {
      "& $hoverImage": {
        left: 0,
      },
    },
  },
  cardImage: {
    opacity: 1,
  },
  hoverImage: {
    borderRadius: 0,
    width: "100%",
    height: 358,
    position: "absolute",
    top: 0,
    left: 300,
    transition: "all 0.6s",
    backgroundColor: "#f6f6f5",
  },
  avatarImage: {
    objectFit: "contain",
  },
}));

export default function ProductCard(props) {
  const classes = useStyles();
  const ref = React.useRef(null);
  const [count, setCount] = React.useState(0);
  const {
    cartItems,
    increase,
    addProduct,
    decrease,
    removeProduct,
  } = React.useContext(CartContext);
  const [show, setShow] = React.useState(false);

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

  const handleShowPack = () => {
    const count = isInCart(props) ? selectedCartItem(props.id)[0].quantity : 0;
    if (count + 1 == 1) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1800);
    }
  };

  const getProductSizeGuide = (sku) => {
    const category = Number(sku.substr(1, 2));
    const type = Number(sku.substr(3, 2));
    const size = Number(sku.substr(5, 2));
    if (category === 1) {
      if (type <= 2) {
        return `fantasy-xmemo/${size}.jpg`;
      } else {
        return null;
      }
    } else if (category === 2) {
      if (type === 10) {
        return `glossy-xbag/${size}.jpg`;
      } else if (type === 11) {
        return `kraft-xbag/${size}.jpg`;
      } else {
        return null;
      }
    } else if (category === 3) {
      return `metal-box/${size}.jpg`;
    } else {
      return null;
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.CardActionArea}>
        {props.loading ? (
          <Skeleton animation="wave" variant="rect" className={classes.media} />
        ) : (
          <>
            <CardMedia
              component="img"
              alt={props.title}
              height="358"
              image={props.image}
              title={props.title}
              classes={{
                img: classes.cardImage,
              }}
            />
            {getProductSizeGuide(props.sku) !== null && (
              <Avatar
                alt="second image"
                src={`${process.env.PUBLIC_URL}/${getProductSizeGuide(
                  props.sku
                )}`}
                className={classes.hoverImage}
                classes={{ img: classes.avatarImage }}
              />
            )}
          </>
        )}
      </CardActionArea>
      <CardActions
        classes={{
          root: classes.cardAction,
        }}
      >
        <Grid container spacing={1} className={classes.cardDescription}>
          <Grid item xs={10}>
            {props.loading ? (
              <React.Fragment>
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
                <Box
                  component="div"
                  display="flex"
                  textOverflow="ellipsis"
                  flexDirection="row-reverse"
                  alignItems="center"
                  overflow="hidden"
                  className={classes.customBox}
                >
                  {props.new && (
                    <Avatar
                      alt="new"
                      src={process.env.PUBLIC_URL + "/new.png"}
                      className={classes.new}
                      imgProps={{
                        style: {
                          objectFit: "contain",
                        },
                      }}
                    />
                  )}
                  <Tooltip
                    title={splitName(props.title).secondRow}
                    arrow
                    placement="top"
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                  >
                    <Typography
                      variant="body1"
                      component="h2"
                      align="right"
                      className={classes.middleLine}
                      noWrap
                    >
                      {splitName(props.title).secondRow}
                    </Typography>
                  </Tooltip>
                </Box>
                <Typography
                  variant="body1"
                  component="h2"
                  className={classes.showPieces}
                >
                  Package: {props.pieces} pcs
                </Typography>
                <Typography
                  variant="body1"
                  component="h2"
                  align="right"
                  className={classes.code}
                >
                  X Code: {props.sku}
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
                      handleShowPack();
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
                    style={{ visibility: show ? "hidden" : "visible" }}
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
                    handleShowPack();
                    setCount(count + 1);
                    isInCart(props) ? increase(props) : addProduct(props);
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
              {show && (
                <Typography
                  variant="body1"
                  component="h2"
                  className={[classes.pack, "animate__fadeInLeft"].join(" ")}
                >
                  {isInCart(props) ? selectedCartItem(props.id)[0].quantity : 0}
                  {"\t"}
                  package
                </Typography>
              )}
            </Grid>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
}
