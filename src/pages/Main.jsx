import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
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
      opacity: 1,
    },
    "&:hover $square": {
      opacity: 0.1,
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
    color: "#999",
  },
  square: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    borderRadius: 0,
    opacity: 1,
    transition: "all .5s",
    [specialBreakpoint.breakpoints.down("xs")]: {
      height: "auto",
    },
  },
  hoverInfo: {
    width: "100%",
    height: "100%",
    backgroundColor: "#eee",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0,
    transition: "all .5s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  gutterBottom: {
    width: "100%",
    height: theme.spacing(5),
  },
}));

export default function Main(props) {
  const classes = useStyles();
  useDocumentTitle("", false, true);

  const firstPageItems = [
    {
      href: "/categories/211/X BOX | باکس",
      searchParams: [{ material: "کیت باکس" }, { size: 1 }],
      image: "/kit-box.webp",
      description: "X BOX",
    },
    {
      href: "/categories/179/X MEMO | دفترچه",
      searchParams: [{ material: "دفترچه اسکچ بوکلت" }, { size: 2 }],
      image: "/sketch-booklet.webp",
      description: "X MEMO",
    },
    {
      href: "/categories/171/X BAG | بگ",
      searchParams: [{ material: "کرافت" }, { size: 2 }],
      image: "/kraft-bag.webp",
      description: "X BAG",
    },
    {
      href: "/categories/171/X BAG | بگ",
      searchParams: [{ material: "گلاسه" }, { size: 3 }],
      image: "/fancy-bag.webp",
      description: "X BAG",
    },
  ];

  return (
    <React.Fragment>
      <Container maxWidth="xl" className={classes.mainContainer}>
        <Grid container className={classes.container} spacing={2}>
          {firstPageItems.map(
            ({ href, searchParams, image, description }, index) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={4}
                className={classes.dFlex}
                key={index}
              >
                <Link
                  to={{
                    pathname: href,
                    search: searchParams
                      .map((param) => {
                        console.log(`firstPageItem[${index}]`);
                        if (Object.values(param).some((val) => val !== null)) {
                          return `${Object.keys(param)}=${Object.values(
                            param
                          )}`;
                        }
                      })
                      .join("&"),
                  }}
                  className={classes.link}
                >
                  <div className={classes.hoverInfo}>
                    <Typography
                      variant="h5"
                      component="h5"
                      className={classes.title}
                    >
                      {description}
                    </Typography>
                  </div>
                  <Avatar
                    alt="logo"
                    src={`${process.env.PUBLIC_URL}${image}`}
                    className={classes.square}
                  />
                </Link>
              </Grid>
            )
          )}
        </Grid>
        <div className={classes.gutterBottom}></div>
      </Container>
    </React.Fragment>
  );
}
