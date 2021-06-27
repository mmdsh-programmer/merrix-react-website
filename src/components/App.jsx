import React from "react";
import RTL from "components/RTL";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { faIR } from "@material-ui/core/locale";
import Shabnam from "fonts/Shabnam.ttf";
import Main from "pages/Main";
import Signin from "pages/Signin";
import Signup from "pages/Signup";
import NotFound from "pages/NotFound";
import Categories from "pages/Categories";
import Cart from "pages/Cart";
import { PrivateRoute } from "components/PrivateRoute";
import AuthContextProvider from "helpers/AuthContext";
import CartContextProvider from "helpers/CartContext";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../styles/App.css";

const shabnam = {
  fontFamily: "Shabnam",
  fontStyle: "normal",
  src: `url(${Shabnam}) format('ttf')`,
};

const theme = createMuiTheme(
  {
    typography: {
      fontFamily: "Shabnam",
    },
    direction: "rtl",
  },
  faIR
);

export default function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <RTL>
        <CssBaseline />
        <AuthContextProvider>
          <CartContextProvider>
            <Router>
              <Switch>
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path={["/", "/home"]} component={Main} />
                <Route path="/categories/:key" component={Categories} />
                <Route component={() => <NotFound />} />
              </Switch>
            </Router>
          </CartContextProvider>
        </AuthContextProvider>
        <ToastContainer bodyClassName="rtl" />
      </RTL>
    </ThemeProvider>
  );
}
