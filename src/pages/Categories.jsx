import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
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
  const { filter, setFilter } = React.useContext(FilterContext);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [offset, setOffset] = React.useState(10);
  const { key } = props.match.params;
  const { slug } = props.match.params;
  useDocumentTitle(slug);

  const handleGoToTop = () => {
    const anchor = document.querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const getSkuSize = (sku) => {
    return Number(sku.substr(5, 2));
  };

  const hasMaterial = (product, materials) => {
    return materials.some((material) => product.includes(material));
  };

  const filterProducts = (data) => {
    let filtered = [];
    if (filter.materials.length > 0 && typeof filter.size !== "undefined") {
      filtered = data.filter((product) => {
        return (
          getSkuSize(product.sku) === filter.size &&
          hasMaterial(product.name, filter.materials)
        );
      });
    } else if (
      filter.materials.length > 0 &&
      typeof filter.size === "undefined"
    ) {
      filtered = data.filter((product) => {
        return hasMaterial(product.name, filter.materials);
      });
    } else if (
      filter.materials.length === 0 &&
      typeof filter.size !== "undefined"
    ) {
      filtered = data.filter((product) => {
        return getSkuSize(product.sku) === filter.size;
      });
    }

    setProducts(filtered);
  };

  React.useEffect(() => {
    setLoading(true);
    setOffset(10);
    handleGoToTop();
    product
      .read(
        `/wc/v3/products?category=${key}&order=asc&status=publish&per_page=1000`
      )
      .then((res) => {
        filter.materials.length > 0 || typeof filter.size !== "undefined"
          ? filterProducts(res.data)
          : setProducts(res.data);
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
          {products.length > 0 ? (
            products.slice(0, offset).map((pr, index) => {
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
        {products.length > 0 && offset < products.length ? (
          <Button
            className={classes.loadMore}
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
