import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useDocumentTitle from "hooks/useDocumentTitle";
import Avatar from "@material-ui/core/Avatar";
import { FilterContext } from "helpers/FilterContext";

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
  mainContainer: {
    [specialBreakpoint.breakpoints.down("md")]: {
      paddingLeft: "5px",
      paddingRight: "5px",
    },
  },
  container: {
    width: "auto",
    margin: 0,
  },
  dFlex: {
    display: "flex",
    width: "auto",
    height: "auto",
    [specialBreakpoint.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    "&:hover $hoverInfo": {
      opacity: 0.9
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
    position: "relative",
    color: "#999"
  },
  square: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    borderRadius: 0,
    [specialBreakpoint.breakpoints.down("xs")]: {
      height: "auto",
    },
  },
  hoverInfo: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fefefe",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    opacity: 0,
    transition: "all 0.5s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

  }
}));

export default function Main(props) {
  const classes = useStyles();
  useDocumentTitle("", false, true);
  const { setFilter } = React.useContext(FilterContext);

  const emptyFilter = () => {
    setFilter({
      materials: [],
      sizes: [],
      style: [],
      usage: [],
    });
  };

  return (
    <React.Fragment>
      <Container maxWidth="xl" className={classes.mainContainer}>
        <Grid container className={classes.container} spacing={1}>
          <Grid item xs={6} sm={6} md={4} className={classes.dFlex}>
            <Link
              to="/categories/179/X MEMO | دفترچه"
              className={classes.link}
              onClick={() => emptyFilter()}
            >
              <div className={classes.hoverInfo}>
                <Typography variant="h5" component="h5" className={classes.title}>
                  X MEMO
                </Typography>
              </div>
              <Avatar
                alt="logo"
                src={process.env.PUBLIC_URL + "/xmemo.jpg"}
                className={classes.square}
              />
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} md={4} className={classes.dFlex}>
            <Link
              to="/categories/168/X WRAP | کادوپیچ"
              className={classes.link}
              onClick={() => emptyFilter()}
            >
              <div className={classes.hoverInfo}>
                <Typography variant="h5" component="h5" className={classes.title}>
                  X WRAP
                </Typography>
              </div>
              <Avatar
                alt="logo"
                src={process.env.PUBLIC_URL + "/xwrap.jpg"}
                className={classes.square}
              />
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} md={4} className={classes.dFlex}>
            <Link
              to="/categories/171/X BAG | بگ"
              className={classes.link}
              onClick={() => emptyFilter()}
            >
              <div className={classes.hoverInfo}>
                <Typography variant="h5" component="h5" className={classes.title}>
                  X BAG
                </Typography>
              </div>
              <Avatar
                alt="logo"
                src={process.env.PUBLIC_URL + "/xbag.jpg"}
                className={classes.square}
              />
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} md={4} className={classes.dFlex}>
            <Link
              to="/categories/211/X BOX | باکس"
              className={classes.link}
              onClick={() => emptyFilter()}
            >
              <div className={classes.hoverInfo}>
                <Typography variant="h5" component="h5" className={classes.title}>
                  X BOX
                </Typography>
              </div>
              <Avatar
                alt="logo"
                src={process.env.PUBLIC_URL + "/xbox.jpg"}
                className={classes.square}
              />
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} md={4} className={classes.dFlex}>
            <Link
              to="/categories/179/X MEMO | دفترچه"
              className={classes.link}
              onClick={() => emptyFilter()}
            >
              <div className={classes.hoverInfo}>
                <Typography variant="h5" component="h5" className={classes.title}>
                  X MEMO
                </Typography>
              </div>
              <Avatar
                alt="logo"
                src={process.env.PUBLIC_URL + "/xmemo.jpg"}
                className={classes.square}
              />
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} md={4} className={classes.dFlex}>
            <Link
              to="/categories/168/X WRAP | کادوپیچ"
              className={classes.link}
              onClick={() => emptyFilter()}
            >
              <div className={classes.hoverInfo}>
                <Typography variant="h5" component="h5" className={classes.title}>
                  X WRAP
                </Typography>
              </div>
              <Avatar
                alt="logo"
                src={process.env.PUBLIC_URL + "/xwrap.jpg"}
                className={classes.square}
              />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
