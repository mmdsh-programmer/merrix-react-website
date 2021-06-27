import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "helpers/AuthContext";
import Grid from "@material-ui/core/Grid";
import product from "services/crud/products";
import ProductCard from "components/ProductCard";
import Header from "components/Header";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

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
}));

export default function Main() {
  const classes = useStyles();
  const { user, setUser } = React.useContext(AuthContext);
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    product
      .read("/wc/v3/products?orderby=popularity")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="lg">
        <Typography variant="h5" component="h1" className={classes.title}>
          پرفروش ترین محصولات
        </Typography>
        <Grid container className={classes.container} spacing={2}>
          {products.map((pr) => {
            return (
              <Grid
                item
                xs={12}
                sm={3}
                justify="center"
                className={classes.dFlex}
              >
                <ProductCard
                  image={pr.images[0].src}
                  title={pr.name}
                  key={pr.id}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
