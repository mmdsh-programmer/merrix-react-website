import React from "react";
import { useHistory, Link } from "react-router-dom";
import {
  alpha,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import category from "services/crud/categories";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { CartContext } from "helpers/CartContext";
import { Badge } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useForm, Controller } from "react-hook-form";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { FilterContext } from "helpers/FilterContext";
import SearchIcon from "@material-ui/icons/Search";
import Search from "./Search";

const specialBreakpoint = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 769,
      lg: 1280,
      xl: 1920,
    },
  },
});

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "&$selected": {
      backgroundColor: "red",
      "&:hover": {
        backgroundColor: "yellow",
      },
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    flexShrink: 0,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  bottomMargin: {
    marginBottom: theme.spacing(8),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  flexNav: {
    display: "flex",
    margin: "auto",
    [specialBreakpoint.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  navItem: {
    width: "auto",
  },
  avatar: {
    width: "55px",
    height: "55px",
    borderRadius: "0",
    marginRight: "7px",
  },
  secondaryItemText: {
    marginTop: "10px",
  },
  mrAuto: {
    marginRight: "auto",
  },
  styledButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  drawerButton: {
    margin: "5px 0",
  },
  active: {
    backgroundColor: "red",
  },
  dialogAppBar: {
    position: "relative",
    backgroundColor: "rgb(70,70,70)",
  },
  searchField: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    borderRadius: "0",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  cartEmptyText: {
    marginTop: theme.spacing(3),
  },
  mobileMenuIcon: {
    [specialBreakpoint.breakpoints.up("md")]: {
      display: "none",
    },
    [specialBreakpoint.breakpoints.down("sm")]: {
      marginRight: "0",
    },
  },
  merrixLogo: {
    [specialBreakpoint.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  sortButton: {
    margin: theme.spacing(3),
    position: "fixed",
    bottom: "0",
    right: "0",
    zIndex: 999,
  },
  sortIcon: {
    marginTop: "13px",
    marginRight: "10px",
  },
  mainAppBar: {
    backgroundColor: "rgb(70,70,70)",
  },
  navItemText: {
    textAlign: "center",
  },
  square: {
    width: "140px",
    height: "auto",
    borderRadius: 0,
  },
  link: {
    [specialBreakpoint.breakpoints.down("sm")]: {
      margin: "auto",
    },
  },
  flex: {
    display: "flex",
  },
  stickyButtonGroup: {
    position: "sticky",
    bottom: 0,
    backgroundColor: "#f7f7f7",
    zIndex: 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    right: false,
  });
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState();

  const { setFilter } = React.useContext(FilterContext);

  const [openSearch, setOpenSearch] = React.useState(false);
  const {
    cartItems,
    itemCount,
    removeProduct,
    increase,
    addProduct,
  } = React.useContext(CartContext);
  const [branch, setBranch] = React.useState([]);
  const [subBranch, setSubBranch] = React.useState([]);
  const [openSubBranch, setOpenSubBranch] = React.useState({});
  const { control, errors: fieldsErrors, trigger, register } = useForm();
  const [dropDownAnchorEl, setDropDownAnchorEl] = React.useState(null);
  const navBarItems = [
    "X WRAP | کادوپیچ",
    "X BOX | متال باکس",
    "X BAG | بگ",
    "X MEMO | دفترچه وولن",
    "باکس دستمال کاغذی",
  ];
  const navBarItemsId = [168, 211, 171, 179, 270];
  const subNavbarItems = [
    "X MEMO | دفترچه وولن سایز یک (Brick)",
    "X MEMO | دفترچه وولن سایز دو (Micro)",
    "X MEMO | دفترچه وولن سایز سه (Mini)",
    "X MEMO | دفترچه وولن سایز چهار (slim)",
    "X MEMO | دفترچه وولن سایز پنج (Mid)",
    "X MEMO | دفترچه وولن سایز شش (Square)",
  ];
  const subNavbarItemsId = [236, 231, 232, 180, 224, 268];

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDrawerOpen = () => {
    setState((prevState) => ({ ...prevState, mainMenuOpen: true }));
  };

  const handleDrawerClose = () => {
    setState((prevState) => ({ ...prevState, mainMenuOpen: false }));
  };

  const selectedCartItem = (id) => {
    return cartItems.filter((e) => e.id === id);
  };

  const filterCategories = (array, id) => {
    return array.filter((e) => e.parent === id);
  };

  const handleExpand = (name) => {
    setOpenSubBranch({ [name]: !openSubBranch[name] });
  };

  const handleDropDownOpen = (event) => {
    setDropDownAnchorEl(event.currentTarget);
  };

  const handleDropDownClose = () => {
    setDropDownAnchorEl(null);
  };

  const handleSearchOpen = () => {
    setOpenSearch(!openSearch);
  };

  const handleSearchClose = () => {
    setOpenSearch(false);
  };

  const splitTitle = (title) => {
    return title.split("|");
  };

  React.useEffect(() => {
    const filteredBranch = [];
    const filteredSubBranch = [];
    category
      .read("/wc/v3/products/categories?per_page=100")
      .then((res) => {
        //console.log(res.data);
        setCategories(res.data);
        res.data.map((cat) => {
          cat.parent === 0 && filteredBranch.push(cat);
          cat.parent === 0 &&
            filteredSubBranch.push(filterCategories(res.data, cat.id));
        });
        setBranch(filteredBranch);
        setSubBranch(filteredSubBranch);
        /*console.log("sub branch", filteredSubBranch);
        console.log("branch", filteredBranch);*/
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [history]);

  return (
    <div className={classes.bottomMargin}>
      <AppBar position="absolute" className={classes.mainAppBar}>
        <Toolbar>
          <IconButton
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
            }}
            onClick={handleDrawerOpen}
            className={[classes.mrAuto, classes.mobileMenuIcon].join(" ")}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className={classes.link}>
            <Avatar
              alt="logo"
              src={process.env.PUBLIC_URL + "/logo.png"}
              className={classes.square}
            />
          </Link>

          <List component="nav" className={classes.flexNav}>
            {navBarItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  button
                  key={index}
                  className={[
                    classes.navItem,
                    { selected: classes.active },
                  ].join(" ")}
                  onClick={(e) => {
                    item !== "X MEMO | دفترچه وولن" &&
                      setFilter({
                        materials: [],
                        sizes: [],
                        style: [],
                        usage: [],
                      });
                    item === "X MEMO | دفترچه وولن" && handleDropDownOpen(e);
                    item !== "X MEMO | دفترچه وولن" &&
                      history.push(
                        `/categories/${navBarItemsId[index]}/${item}`
                      );
                  }}
                >
                  <ListItemText
                    className={classes.navItemText}
                    primary={splitTitle(item)[0]}
                    secondaryTypographyProps={{
                      style: {
                        color: "white",
                      },
                    }}
                    secondary={
                      splitTitle(item).length > 1 ? splitTitle(item)[1] : null
                    }
                  />
                </ListItem>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={dropDownAnchorEl}
                  keepMounted
                  open={Boolean(dropDownAnchorEl)}
                  onClose={handleDropDownClose}
                >
                  {subNavbarItems.map((sub, index) => (
                    <StyledMenuItem
                      key={index}
                      onClick={(event) => {
                        setFilter({
                          materials: [],
                          sizes: [],
                          style: [],
                          usage: [],
                        });
                        history.push(
                          `/categories/${subNavbarItemsId[index]}/${sub}`
                        );
                      }}
                    >
                      <ListItemText primary={sub} />
                    </StyledMenuItem>
                  ))}
                </StyledMenu>
              </React.Fragment>
            ))}
          </List>

          <Search open={openSearch} onClose={handleSearchClose} />

          {auth && (
            <div className={classes.flex}>
              <IconButton
                color="inherit"
                aria-label="search"
                onClick={handleSearchOpen}
              >
                <SearchIcon />
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="add to shopping cart"
                onClick={toggleDrawer(["right"], true)}
              >
                <Badge badgeContent={itemCount} max={2000} color="secondary">
                  <LocalMallOutlinedIcon />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          className={classes.cartDrawer}
        >
          <List className={classes.list}>
            {cartItems.length > 0 ? (
              cartItems.map((value, index) => (
                <ListItem button key={value.id}>
                  <ListItemAvatar>
                    <Badge
                      badgeContent={value.quantity}
                      max={2000}
                      color="secondary"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <Avatar
                        alt={value.title}
                        src={value.image}
                        className={classes.avatar}
                      />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        component="p"
                        variant="body1"
                        color="textPrimary"
                      >
                        {value.title}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        removeProduct(value);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <Typography
                variant="body1"
                component="p"
                align="center"
                className={classes.cartEmptyText}
              >
                سبد سفارشات خالی است
              </Typography>
            )}
            {cartItems.length > 0 && (
              <ListItem className={classes.stickyButtonGroup}>
                <div className={classes.styledButton}>
                  <Button
                    className={classes.drawerButton}
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      history.push(`/cart`);
                      setState({ right: false });
                      console.log(state.right);
                    }}
                  >
                    ویرایش سفارش
                  </Button>
                  <Button
                    className={classes.drawerButton}
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      history.push(`/checkout`);
                      setState({ right: false });
                      console.log(state.right);
                    }}
                  >
                    ثبت سفارش
                  </Button>
                </div>
              </ListItem>
            )}
          </List>
        </Drawer>
        <Drawer
          anchor="left"
          open={state.mainMenuOpen}
          onClose={handleDrawerClose}
          className={classes.menuDrawer}
        >
          <List className={classes.list}>
            <ListItem
              button
              selected={selectedIndex === 4}
              onClick={(event) => {
                history.push(`/`);
                handleListItemClick(event, 4);
                setFilter({
                  materials: [],
                  sizes: [],
                  style: [],
                  usage: [],
                });
                handleDrawerClose();
              }}
            >
              <ListItemText primary="صفحه اصلی" />
            </ListItem>
            {navBarItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  button
                  key={index}
                  className={[
                    classes.navItem,
                    { selected: classes.active },
                  ].join(" ")}
                  onClick={(e) => {
                    //handleDropDownOpen(e);
                    item !== "X MEMO | دفترچه وولن" &&
                      setFilter({
                        materials: [],
                        sizes: [],
                        style: [],
                        usage: [],
                      });
                    item !== "X MEMO | دفترچه وولن" && handleDrawerClose();
                    item === "X MEMO | دفترچه وولن" && handleExpand(item);
                    item !== "X MEMO | دفترچه وولن" &&
                      history.push(
                        `/categories/${navBarItemsId[index]}/${item}`
                      );
                  }}
                >
                  <ListItemText primary={item} />
                  {item === "X MEMO | دفترچه وولن" ? (
                    openSubBranch[item] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : null}
                </ListItem>
                <Collapse in={openSubBranch[item]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {subNavbarItems.map((sub, index) => (
                      <ListItem
                        button
                        className={classes.nested}
                        key={index}
                        onClick={(event) => {
                          setFilter({
                            materials: [],
                            sizes: [],
                            style: [],
                            usage: [],
                          });
                          handleDrawerClose();
                          history.push(
                            `/categories/${subNavbarItemsId[index]}/${sub}`
                          );
                          handleListItemClick(event, subNavbarItemsId[index]);
                        }}
                      >
                        <ListItemText primary={sub} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
