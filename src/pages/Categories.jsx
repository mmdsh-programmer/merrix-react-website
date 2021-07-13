import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "helpers/AuthContext";
import { CartContext } from "helpers/CartContext";
import Grid from "@material-ui/core/Grid";
import product from "services/crud/products";
import ProductCard from "components/ProductCard";
import Header from "components/Header";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "components/Button";
import { CircularProgress } from "@material-ui/core";

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
  },
  title: {
    marginTop: theme.spacing(13),
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
}));

export default function Categories(props) {
  const classes = useStyles();
  const { user, setUser } = React.useContext(AuthContext);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(10);
  const { key } = props.match.params;
  const { slug } = props.match.params;

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
    product
      .read(`/wc/v3/products?category=${key}&stock_status=instock&orderby=slug`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [key]);

  const CategoriesComponent = () => {
    return (
      <div>
        <Typography variant="h5" component="h1" className={classes.title}>
          {slug}
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
                  stock={pr.stock_quantity}
                />
              </Grid>
            );
          })}
        </Grid>
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
      </div>
    );
  };

  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="lg">
        {loading ? (
          <CircularProgress size={60} className={classes.loading} />
        ) : (
          <CategoriesComponent />
        )}
      </Container>
    </React.Fragment>
  );
}
