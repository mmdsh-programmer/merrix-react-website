import React from "react";
import { useHistory } from "react-router-dom";
import {
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
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
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
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import searchresult from "services/crud/search";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { FilterContext } from "helpers/FilterContext";

const specialBreakpoint = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 769,
      lg: 1280,
      xl: 1920,
      menuItem: 991,
    },
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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
    margin: "10px",
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
  const [searchLoading, setSearchLoading] = React.useState("first time");
  const { setFilter } = React.useContext(FilterContext);
  const [searchResult, setSearchResult] = React.useState([]);
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

  const handleOpenModal = () => {
    setOpenModal(true);
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

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
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

  const handleSearchChange = (data) => {
    setSearchLoading(true);
    searchresult
      .read(`/wc/v3/products?search=${data}&stock_status=instock`)
      .then((res) => {
        setSearchResult(typeof res.data != "undefined" && res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSearchLoading(false);
      });
  };

  React.useEffect(() => {
    const filteredBranch = [];
    const filteredSubBranch = [];
    category
      .read("/wc/v3/products/categories?per_page=100")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
        res.data.map((cat) => {
          cat.parent === 0 && filteredBranch.push(cat);
          cat.parent === 0 &&
            filteredSubBranch.push(filterCategories(res.data, cat.id));
        });
        setBranch(filteredBranch);
        setSubBranch(filteredSubBranch);
        console.log("sub branch", filteredSubBranch);
        console.log("branch", filteredBranch);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [history]);

  return (
    <div className={classes.bottomMargin}>
      <Dialog fullScreen open={openModal} onClose={handleCloseModal}>
        <AppBar className={classes.dialogAppBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseModal}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              جست و جو
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Grid container className={classes.container} spacing={2}>
            <TextField
              autoFocus
              margin="dense"
              id="search"
              name="search"
              label="نام محصول"
              type="search"
              variant="outlined"
              fullWidth
              className={classes.searchField}
              inputRef={register({ required: "Required" })}
              onChange={(e) => {
                e.target.value.length > 0
                  ? handleSearchChange(e.target.value)
                  : setSearchResult([]);
              }}
            />
            {searchResult.length > 0 ? (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">
                        تصویر محصول
                      </StyledTableCell>
                      <StyledTableCell align="left">محصول</StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchResult.map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          <Avatar
                            alt={row.images[0].alt}
                            src={row.images[0].src}
                            className={classes.large}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <ButtonGroup>
                            <Button
                              aria-label="increase"
                              onClick={() => {
                                const product = {
                                  id: row.id,
                                  title: row.name,
                                  image: row.images[0].src,
                                  stock: row.stock_quantity,
                                };
                                isInCart(product)
                                  ? increase(product)
                                  : addProduct(product);
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </Button>
                          </ButtonGroup>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="h6" className={classes.title}>
                {searchLoading == "first time" && searchResult.length == 0
                  ? "جستجو کنید..."
                  : "موردی یافت نشد"}
              </Typography>
            )}
          </Grid>
        </Container>
      </Dialog>
      <AppBar position="fixed" className={classes.mainAppBar}>
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
          <Typography
            variant="h6"
            onClick={() => history.push(`/`)}
            className={classes.merrixLogo}
          >
            Merrix
          </Typography>
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
                    item !== "X MEMO | دفترچه وولن" && setFilter();
                    item === "X MEMO | دفترچه وولن" && handleDropDownOpen(e);
                    item !== "X MEMO | دفترچه وولن" &&
                      history.push(
                        `/categories/${navBarItemsId[index]}/${item}`
                      );
                  }}
                >
                  <ListItemText primary={item} />
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
                        setFilter();
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

          {auth && (
            <div>
              <IconButton
                aria-label="search"
                aria-controls="menu-appbar"
                color="inherit"
                onClick={handleOpenModal}
              >
                <SearchOutlinedIcon />
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
                سبد خرید خالی است
              </Typography>
            )}
            {cartItems.length > 0 && (
              <ListItem>
                <ButtonGroup
                  className={classes.styledButton}
                  fullWidth
                  orientation="vertical"
                  color="primary"
                  aria-label="vertical outlined primary button group"
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      history.push(`/cart`);
                      setState({ right: false });
                      console.log(state.right);
                    }}
                  >
                    مشاهده سبد خرید
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      history.push(`/checkout`);
                      setState({ right: false });
                      console.log(state.right);
                    }}
                  >
                    تسویه حساب
                  </Button>
                </ButtonGroup>
              </ListItem>
            )}
          </List>
        </Drawer>
        <Drawer
          anchor="left"
          open={state.mainMenuOpen}
          onClose={handleDrawerClose}
        >
          <List className={classes.list}>
            <ListItem
              button
              selected={selectedIndex === 4}
              onClick={(event) => {
                history.push(`/`);
                handleListItemClick(event, 4);
                setFilter();
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
                    item !== "X MEMO | دفترچه وولن" && setFilter();
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
                          setFilter();
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
