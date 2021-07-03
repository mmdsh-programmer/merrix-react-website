import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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
import { Autocomplete } from "@material-ui/lab";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
}));

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    right: false,
    mobileView: false,
    mainMenuOpen: false,
  });
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState();
  const { mobileView } = state;
  const categoriesId = [168, 211, 171, 179];
  const { cartItems, itemCount, removeProduct } = React.useContext(CartContext);

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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const displayMobile = () => {
    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
          }}
          onClick={handleDrawerOpen}
          className={classes.mrAuto}
        >
          <MenuIcon />
        </IconButton>
        {auth && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <PermIdentityOutlinedIcon />
            </IconButton>
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
              <Badge badgeContent={itemCount} color="secondary">
                <LocalMallOutlinedIcon />
              </Badge>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>پروفایل</MenuItem>
              <MenuItem onClick={handleClose}>حساب کاربری</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    );
  };

  const displayDesktop = () => {
    return (
      <Toolbar>
        <Typography variant="h6" onClick={() => history.push(`/`)}>
          Merrix
        </Typography>
        <List component="nav" className={classes.flexNav}>
          {["کاغذ کادو", "باکس هدیه", "پاکت هدیه", "دفترچه فانتزی"].map(
            (text, index) => (
              <ListItem
                button
                key={text}
                className={[classes.navItem, { selected: classes.active }]}
                selected={selectedIndex === index}
                onClick={(event) => {
                  history.push(`/categories/${categoriesId[index]}/${text}`);
                  handleListItemClick(event, index);
                }}
              >
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        {auth && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <PermIdentityOutlinedIcon />
            </IconButton>
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
              <Badge badgeContent={itemCount} color="secondary">
                <LocalMallOutlinedIcon />
              </Badge>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>پروفایل</MenuItem>
              <MenuItem onClick={handleClose}>حساب کاربری</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    );
  };

  React.useEffect(() => {
    category
      .read()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    const setResponsiveness = () => {
      return window.innerWidth < 768
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  return (
    <div className={classes.bottomMargin}>
      <div>
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">جست و جو</DialogTitle>
          <DialogContent>
            <DialogContentText>
              جست و جوی محصولات بر اساس نام...
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="نام محصول"
              type="search"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              بستن
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <AppBar position="fixed">
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
      <React.Fragment>
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          <List className={classes.list}>
            {cartItems.length > 0 ? (
              cartItems.map((value, index) => (
                <ListItem button key={value.id}>
                  <ListItemAvatar>
                    <Badge
                      badgeContent={value.quantity}
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
              <Typography variant="body1" component="p" align="center">
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
                    onClick={() => history.push(`/cart`)}
                  >
                    مشاهده سبد خرید
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => history.push(`/checkout`)}
                  >
                    تسویه حساب
                  </Button>
                </ButtonGroup>
              </ListItem>
            )}
          </List>
        </SwipeableDrawer>
        <Drawer
          anchor="left"
          open={state.mainMenuOpen}
          onClose={handleDrawerClose}
        >
          <List className={classes.list}>
            {["کاغذ کادو", "باکس هدیه", "پاکت هدیه", "دفترچه فانتزی"].map(
              (text, index) => (
                <ListItem
                  button
                  key={text}
                  selected={selectedIndex === index}
                  onClick={(event) => {
                    history.push(`/categories/${categoriesId[index]}/${text}`);
                    handleListItemClick(event, index);
                  }}
                >
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
