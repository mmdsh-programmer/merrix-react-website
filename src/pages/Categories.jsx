import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { AuthContext } from "helpers/AuthContext";
import Grid from "@material-ui/core/Grid";
import product from "services/crud/products";
import ProductCard from "components/ProductCard";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "components/Button";
import { FilterContext } from "helpers/FilterContext";
import FilterComponent from "components/FilterComponent";
import useDocumentTitle from "hooks/useDocumentTitle";

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
    flexGrow: 0,
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
    marginTop: theme.spacing(13),
    display: "flex",
  },
  loadMore: {
    display: "flex",
    margin: "30px auto",
  },
  infoText: {
    width: "100%",
    textAlign: "center",
  },
}));

export default function Categories(props) {
  const classes = useStyles();
  const { user, setUser } = React.useContext(AuthContext);
  const { filter } = React.useContext(FilterContext);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(10);
  const { key } = props.match.params;
  const { slug } = props.match.params;
  useDocumentTitle(slug);

  const loadMore = (endpoint) => {
    product
      .read(endpoint)
      .then((res) => {
        setButtonLoading(false);
        setProducts(products.concat(res.data));
      })
      .catch((error) => {
        setButtonLoading(false);
        console.log(error.message);
      });
  };

  React.useEffect(() => {
    setLoading(true);
    const { size, material } = filter || {};
    console.log(filter);
    product
      .read(
        `/wc/v3/products?category=${key}&stock_status=instock&orderby=slug&search=${material} ${size}`
      )
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [key, filter]);

  const CategoriesComponent = () => {
    return (
      <div>
        <Typography variant="h5" component="h1" className={classes.title}>
          {slug}
        </Typography>
        <Grid
          container
          className={products.length > 0 ? classes.container : classes.dFlex}
          spacing={2}
        >
          {products.length > 0 ? (
            products.map((pr) => {
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
                    stock={pr.stock_quantity}
                  />
                </Grid>
              );
            })
          ) : (
            <Typography
              variant="body1"
              component="p"
              className={classes.infoText}
            >
              محصولی یافت نشد
            </Typography>
          )}
        </Grid>
        {products.length > 0 && (
          <Button
            className={classes.loadMore}
            loading={buttonLoading}
            variant="outlined"
            onClick={() => {
              setButtonLoading(true);
              setOffset(offset + 10);
              loadMore(
                `/wc/v3/products?category=${key}&offset=${offset}&stock_status=instock`
              );
            }}
          >
            محصولات بیشتر
          </Button>
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Grid container className={classes.container} spacing={2}>
          {loading ? (
            [...Array(10).keys()].map((virtual) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={3}
                  key={virtual}
                  className={classes.dFlex}
                >
                  <ProductCard
                    image={null}
                    title={null}
                    key={virtual}
                    id={virtual}
                    sku={null}
                    loading={loading}
                  />
                </Grid>
              );
            })
          ) : (
            <CategoriesComponent />
          )}
        </Grid>
      </Container>
      <FilterComponent />
    </React.Fragment>
  );
}
