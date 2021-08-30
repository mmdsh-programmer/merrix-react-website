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
  allCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionHolder: {
    marginBottom: theme.spacing(5),
  },
  description: {
    borderLeft: "1px solid #6e6e6e",
    paddingLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      borderLeft: "none",
      paddingLeft: "0",
    },
  },
}));

export default function Categories(props) {
  const classes = useStyles();
  const { filter, setFilter } = React.useContext(FilterContext);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [offset, setOffset] = React.useState(12);
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

  const hasSize = (sku, sizes) => {
    return sizes.some((size) => getSkuSize(sku) === size);
  };

  const hasAttribute = (attributes, filter, attributeName) => {
    const styleOptions = attributes.filter((attribute) => {
      return attribute.name === attributeName;
    });

    if (typeof styleOptions[0] !== "undefined") {
      return styleOptions[0].options.some((option) => filter.includes(option));
    } else {
      return false;
    }
  };

  const getFilterLength = () => {
    let count = 0;
    if (filter.materials.length > 0) {
      count++;
    }
    if (filter.sizes.length > 0) {
      count++;
    }
    if (filter.style.length > 0) {
      count++;
    }
    if (filter.usage.length > 0) {
      count++;
    }
    return count;
  };

  /*const filterProducts = (data) => {
    let filtered = [];
    if (filter.materials.length > 0 && filter.sizes.length > 0) {
      filtered = data.filter((product) => {
        return (
          hasSize(product.sku, filter.sizes) &&
          hasMaterial(product.name, filter.materials)
        );
      });
    } else if (filter.materials.length > 0 && filter.sizes.length === 0) {
      filtered = data.filter((product) => {
        return hasMaterial(product.name, filter.materials);
      });
    } else if (filter.materials.length === 0 && filter.sizes.length > 0) {
      filtered = data.filter((product) => {
        return hasSize(product.sku, filter.sizes);
      });
    }

    setProducts(filtered);
  };*/

  const count = (array_elements) => {
    const sortedArray = array_elements.sort((a, b) => {
      return a.sku - b.sku;
    });

    let result = [];

    let current = null;
    let cnt = 0;
    for (let i = 0; i < sortedArray.length; i++) {
      if (sortedArray[i] != current) {
        if (cnt >= getFilterLength()) {
          result.push(current);
        }
        current = sortedArray[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt >= getFilterLength()) {
      result.push(current);
    }
    return result;
  };

  const filterProducts = (data) => {
    let filteredMaterials = [];
    let filteredSizes = [];
    let filteredStyle = [];
    let filteredUsage = [];
    if (filter.materials.length > 0) {
      filteredMaterials = data.filter((product) => {
        return hasMaterial(product.name, filter.materials);
      });
    }
    if (filter.sizes.length > 0) {
      filteredSizes = data.filter((product) => {
        return hasSize(product.sku, filter.sizes);
      });
    }
    if (filter.style.length > 0) {
      filteredStyle = data.filter((product) => {
        return hasAttribute(product.attributes, filter.style, "style");
      });
    }
    if (filter.usage.length > 0) {
      filteredUsage = data.filter((product) => {
        return hasAttribute(product.attributes, filter.usage, "usage");
      });
    }

    const finalFilter = filteredMaterials.concat(
      filteredSizes,
      filteredStyle,
      filteredUsage
    );

    setProducts(count(finalFilter));
  };

  React.useEffect(() => {
    setLoading(true);
    setOffset(12);
    handleGoToTop();

    product
      .read(
        `/wc/v3/products?category=${key}&order=asc&stock_status=instock&per_page=1000`
      )
      .then((res) => {
        console.log(res.data);
        filter.materials.length > 0 ||
        filter.sizes.length > 0 ||
        filter.style.length > 0 ||
        filter.usage.length > 0
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
              setOffset(offset + 12);
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
      <Container maxWidth="lg" className={classes.descriptionHolder}>
        <Grid
          container
          className={classes.container}
          spacing={2}
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" component="h1" className={classes.title}>
              {slug}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              component="p"
              className={classes.description}
              align="justify"
            >
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
              و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای
              زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و
              متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان
              رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی
              ایجاد کرد
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg">
        <Grid container className={classes.container} spacing={2}>
          {loading ? (
            [...Array(4).keys()].map((virtual) => {
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
