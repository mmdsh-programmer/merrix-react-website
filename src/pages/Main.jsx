import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { AuthContext } from "helpers/AuthContext";
import Grid from "@material-ui/core/Grid";
import product from "services/crud/products";
import ProductCard from "components/ProductCard";
import Header from "components/Header";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";
import FilterComponent from "components/FilterComponent";

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
}));

export default function Main() {
  const classes = useStyles();
  const { user, setUser } = React.useContext(AuthContext);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(true);
    product
      .read("/wc/v3/products?orderby=popularity&stock_status=instock")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  const ProductsComponent = () => {
    return (
      <div>
        <Typography variant="h5" component="h1" className={classes.title}>
          پرفروش ترین محصولات
        </Typography>
        <Grid container className={classes.container} spacing={2}>
          {products.map((pr) => {
            return (
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                key={pr.id}
                className={classes.dFlex}
              >
                <ProductCard
                  image={
                    typeof pr.images[0] !== "undefined"
                      ? pr.images[0].src
                      : "https://merrix.com/wp-content/uploads/woocommerce-placeholder.png"
                  }
                  title={pr.name}
                  key={pr.id}
                  id={pr.id}
                  sku={pr.sku}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Grid container className={classes.container} spacing={2}>
          {loading ? (
            <CircularProgress size={60} className={classes.loading} />
          ) : (
            <ProductsComponent />
          )}
        </Grid>
      </Container>
      <FilterComponent />
    </React.Fragment>
  );
}
