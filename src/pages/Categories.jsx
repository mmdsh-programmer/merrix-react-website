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
import useFilter from "hooks/useFilter";

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
  w100: {
    width: "100%",
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
    textAlign: "center",
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
  gutter: {
    width: "100%",
    height: "80px",
  },
}));

export default function Categories(props) {
  const classes = useStyles();
  const { user, setUser } = React.useContext(AuthContext);
  const { filter, setFilter } = React.useContext(FilterContext);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(10);
  const { key } = props.match.params;
  const { slug } = props.match.params;
  useDocumentTitle(slug);
  let [, , filteredProducts] = useFilter(products);

  const handleGoToTop = () => {
    const anchor = document.querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  /*const getSkuSize = (sku) => {
    return Number(sku.substr(5, 2));
  };

  const hasMaterial = (product, material) => {
    if (product.includes(material)) return true;
    return false;
  };

  const filterProducts = (data) => {
    let filteredProducts = [];
    console.log(filter);
    if (
      slug.includes("X WRAP | کادوپیچ") ||
      slug.includes("باکس دستمال کاغذی")
    ) {
      data.map((product) => {
        if (
          hasMaterial(
            product.name,
            typeof material !== "undefined" ? material : ""
          )
        ) {
          filteredProducts.push(product);
        }
      });
    } else {
      data.map((product) => {
        if (
          hasMaterial(
            product.name,
            typeof material !== "undefined" ? material : ""
          ) &&
          getSkuSize(product.sku) === size
        ) {
          filteredProducts.push(product);
        }
      });
    }
    setProducts(filteredProducts);
  };*/

  React.useEffect(() => {
    console.log(filter);
    setLoading(true);
    setOffset(10);
    handleGoToTop();
    product
      .read(
        `/wc/v3/products?category=${key}&order=asc&status=publish&per_page=1000`
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
      <div className={classes.w100}>
        <Typography variant="h5" component="h1" className={classes.title}>
          {slug}
        </Typography>
        <FilterComponent slug={slug} />
        <Grid
          container
          className={products.length > 0 ? classes.container : classes.dFlex}
          spacing={2}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.slice(0, offset).map((pr, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={3}
                  key={index}
                  className={classes.dFlex}
                >
                  <ProductCard
                    image={
                      typeof pr.images[0] !== "undefined"
                        ? pr.images[0].src
                        : "https://merrix.com/wp-content/uploads/woocommerce-placeholder.png"
                    }
                    title={pr.name}
                    key={index}
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
        {filteredProducts.length > 0 && offset < filteredProducts.length ? (
          <Button
            className={classes.loadMore}
            loading={buttonLoading}
            variant="outlined"
            onClick={() => {
              setOffset(offset + 10);
            }}
          >
            محصولات بیشتر
          </Button>
        ) : (
          <div className={classes.gutter}></div>
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
    </React.Fragment>
  );
}
