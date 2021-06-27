import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Header from "components/Header";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { CartContext } from "helpers/CartContext";
import Avatar from "@material-ui/core/Avatar";
import { Badge } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  title: {
    marginTop: theme.spacing(13),
    marginBottom: theme.spacing(5),
  },
}));

export default function Cart(props) {
  const classes = useStyles();
  const {
    cartItems,
    increase,
    addProduct,
    decrease,
    removeProduct,
  } = React.useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  const selectedCartItem = (id) => {
    return cartItems.filter((e) => e.id === id);
  };

  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="lg">
        <Typography variant="h5" component="h1" className={classes.title}>
          سبد خرید
        </Typography>
        {cartItems.length > 0 ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">تصویر محصول</StyledTableCell>
                  <StyledTableCell align="left">محصول</StyledTableCell>
                  <StyledTableCell align="left">تعداد</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      <Avatar
                        alt={row.title}
                        src={row.image}
                        className={classes.large}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.title}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.quantity}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <ButtonGroup>
                        <Button
                          aria-label="increase"
                          onClick={() => {
                            increase(row);
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </Button>
                        {isInCart(row) && (
                          <Button
                            aria-label="reduce"
                            onClick={() => {
                              selectedCartItem(row.id)[0].quantity === 1
                                ? removeProduct(row)
                                : decrease(row);
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                        )}
                        <Button
                          aria-label="remove"
                          onClick={() => {
                            removeProduct(row);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </ButtonGroup>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" component="p" align="center">
            سبد خرید خالی است
          </Typography>
        )}
      </Container>
    </React.Fragment>
  );
}
