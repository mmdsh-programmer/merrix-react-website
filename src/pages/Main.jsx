import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { AuthContext } from "helpers/AuthContext";
import Grid from "@material-ui/core/Grid";
import product from "services/crud/products";
import ProductCard from "components/ProductCard";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import useDocumentTitle from "hooks/useDocumentTitle";
import Avatar from "@material-ui/core/Avatar";

const specialBreakpoint = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1280,
      xl: 1920,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    width: "auto",
    margin: 0,
  },
  dFlex: {
    display: "flex",
    [specialBreakpoint.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  loading: {
    margin: "auto",
    marginTop: theme.spacing(5),
    display: "flex",
  },
  container: {
    width: "auto",
    margin: 0,
  },
  link: {
    width: "100%",
  },
  square: {
    width: "100%",
    height: "600px",
    objectFit: "cover",
    borderRadius: 0,
  },
}));

export default function Main(props) {
  const classes = useStyles();
  useDocumentTitle("", false, true);

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Grid container className={classes.container} spacing={2}>
          <Grid item xs={12} md={6} className={classes.dFlex}>
            <Link
              to="/categories/168/X WRAP | کادوپیچ"
              className={classes.link}
            >
              <Avatar
                alt="logo"
                src={process.env.PUBLIC_URL + "/xwrap.jpg"}
                className={classes.square}
              />
            </Link>
          </Grid>
          <Grid item xs={12} md={6} className={classes.dFlex}>
            <Link
              to="/categories/211/X BOX | متال باکس"
              className={classes.link}
            >
              <Avatar
                alt="logo"
                src={process.env.PUBLIC_URL + "/xbox.jpg"}
                className={classes.square}
              />
            </Link>
          </Grid>
          <Grid item xs={12} md={6} className={classes.dFlex}>
            <Link
              to="/categories/171/X BAG | بگ"
              className={classes.link}
            >
              <Avatar
                alt="logo"
                src={process.env.PUBLIC_URL + "/xbag.jpg"}
                className={classes.square}
              />
            </Link>
          </Grid>
          <Grid item xs={12} md={6} className={classes.dFlex}>
            <Link
              to="/categories/179/X MEMO | دفترچه وولن"
              className={classes.link}
            >
              <Avatar
                alt="logo"
                src={process.env.PUBLIC_URL + "/xmemo.jpg"}
                className={classes.square}
              />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
