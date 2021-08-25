import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "components/Button";
import Typography from "@material-ui/core/Typography";
import Header from "components/Header";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import citiesImport from "services/citiesImport";
import provinceImport from "services/provinceImport";
import { CartContext } from "helpers/CartContext";
import order from "services/crud/order";
import Alert from "@material-ui/lab/Alert";
import useDocumentTitle from "hooks/useDocumentTitle";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(13),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 1),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  alert: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  form: {
    marginTop: theme.spacing(3),
  },
}));

const steps = ["مشخصات شما"];

export default function Checkout() {
  const classes = useStyles();
  useDocumentTitle("ثبت سفارش");
  const {
    register,
    handleSubmit,
    control,
    errors: fieldsErrors,
    reset,
  } = useForm();

  const [activeStep, setActiveStep] = React.useState(0);
  const { cartItems, handleCheckout } = React.useContext(CartContext);
  const [finalProvince, setFinalProvince] = React.useState("");
  const [finalCities, setFinalCities] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [hasAlert, setHasAlert] = React.useState(false);
  const [outOfStockProducts, setOutOfStockProducts] = React.useState([]);
  const [phone, setPhone] = React.useState([]);

  const selectedProvId = (value) => {
    setFinalProvince(value);
    return provinceImport.filter((e) => e.name === value);
  };

  const selectedCityId = (value) => {
    setFinalCities(citiesImport.filter((e) => e.province_id === value));
  };

  const checkPhone = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    setLoading(true);
    setOutOfStockProducts([]);
    const products = [];
    const hasError = false;
    let errorCount = 0;
    cartItems.map((item) => {
      if (item.stock < item.quantity) {
        setOutOfStockProducts((prev) => [...prev, item]);
        errorCount++;
      } else {
        products.push({ product_id: item.id, quantity: item.quantity });
      }
    });

    if (errorCount === 0) {
      console.log(data);
      sendData(data, products);
    } else {
      setLoading(false);
      toast.error("لطفا ابتدا سبد سفارشات خود رااصلاح کنید.");
    }
  };

  const sendData = (data, products) => {
    const finalData = {
      payment_method: "درگاه بانکی",
      payment_method_title: "انتقال مستقیم بانکی",
      set_paid: true,
      billing: {
        first_name: data.firstName,
        last_name: data.lastName,
        address_1: data.address,
        billing_company: data.shopName,
        address_2: "",
        city: data.city,
        company: data.shopName,
        state: finalProvince,
        postcode: "",
        country: "IR",
        email: data.email,
        phone: data.phone.toString(),
      },
      shipping: {
        first_name: data.firstName,
        last_name: data.lastName,
        billing_company: data.shopName,
        address_1: data.address,
        address_2: "",
        city: data.city,
        state: finalProvince,
        company: data.shopName,
        postcode: "",
        country: "IR",
      },
      line_items: products,
    };
    console.log(outOfStockProducts.length);
    order
      .create(finalData, "/wc/v3/orders?status=processing")
      .then((res) => {
        toast.success("سفارش با موفقیت ثبت شد");
        handleCheckout();
        reset();
      })
      .catch((error) => {
        toast.error(`مشکلی در ثبت سفارش رخ داد. (${error})`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        {cartItems.length > 0 && (
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              ثبت سفارش
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {outOfStockProducts.length > 0
              ? outOfStockProducts.map((item) => (
                  <Alert severity="error" className={classes.alert}>
                    موجودی انبار محصول {item.title} کمتر از تعداد انتخاب شده
                    میباشد
                  </Alert>
                ))
              : null}
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className={classes.form}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="firstName"
                          name="firstName"
                          label="نام"
                          fullWidth
                          autoComplete="given-name"
                          variant="outlined"
                          inputRef={register({ required: true })}
                          helperText={
                            fieldsErrors.firstName ? "نام را وارد کنید" : null
                          }
                          error={fieldsErrors.firstName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="lastName"
                          name="lastName"
                          label="نام خانوادگی"
                          fullWidth
                          autoComplete="family-name"
                          variant="outlined"
                          inputRef={register({ required: true })}
                          helperText={
                            fieldsErrors.lastName
                              ? "نام خانوادگی را وارد کنید"
                              : null
                          }
                          error={fieldsErrors.lastName}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="shopName"
                          name="shopName"
                          label="نام فروشگاه"
                          fullWidth
                          autoComplete="shipping address-line1"
                          variant="outlined"
                          defaultValue=""
                          inputRef={register({ required: true })}
                          helperText={
                            fieldsErrors.shopName
                              ? "نام فروشگاه را وارد کنید"
                              : null
                          }
                          error={fieldsErrors.shopName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          required
                          error={fieldsErrors.province}
                        >
                          <InputLabel id="province">استان</InputLabel>
                          <Controller
                            render={(props) => (
                              <Select
                                labelId="province-label"
                                label="استان"
                                onChange={(e) => {
                                  props.onChange(() => {
                                    const selectedProvince = selectedProvId(
                                      e.target.value
                                    );
                                    selectedCityId(selectedProvince[0].id);
                                  });
                                }}
                              >
                                {provinceImport.map((prov) => (
                                  <MenuItem value={prov.name} key={prov.id}>
                                    {prov.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                            name="province"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                          />
                          {fieldsErrors.province && (
                            <FormHelperText>
                              استان نمیتواند خالی باشد
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          required
                          error={fieldsErrors.city}
                        >
                          <InputLabel id="city">شهر</InputLabel>
                          <Controller
                            as={
                              <Select labelId="city-label" label="شهر">
                                {finalCities.map((cities) => (
                                  <MenuItem value={cities.name} key={cities.id}>
                                    {cities.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            }
                            name="city"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                          />
                          {fieldsErrors.city && (
                            <FormHelperText>
                              شهر نمیتواند خالی باشد
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="address"
                          name="address"
                          label="آدرس"
                          fullWidth
                          autoComplete="given-address"
                          variant="outlined"
                          inputRef={register({ required: true })}
                          helperText={
                            fieldsErrors.address ? "آدرس را وارد کنید" : null
                          }
                          error={fieldsErrors.address}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="email"
                          name="email"
                          label="آدرس ایمیل"
                          fullWidth
                          autoComplete="given-email"
                          variant="outlined"
                          inputRef={register({
                            required: true,
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "ایمیل وارد شده معتبر نیست",
                            },
                          })}
                          helperText={
                            fieldsErrors.email
                              ? "آدرس ایمیل را به درستی وارد کنید"
                              : null
                          }
                          error={fieldsErrors.email}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="phone"
                          name="phone"
                          label="شماره موبایل"
                          fullWidth
                          type="tel"
                          autoComplete="given-phone"
                          variant="outlined"
                          value={phone}
                          onChange={(e) => checkPhone(e)}
                          inputRef={register({
                            required: true,
                          })}
                          helperText={
                            fieldsErrors.phone
                              ? "شماره همراه را به درستی وارد کنید"
                              : null
                          }
                          error={fieldsErrors.phone}
                        />
                      </Grid>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        type="submit"
                        loading={loading}
                      >
                        ثبت سفارش
                      </Button>
                    </Grid>
                  </form>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        )}
        {cartItems.length === 0 && (
          <Typography component="h1" variant="h4" align="center">
            سبد شفارشات شما خالی است. لطفا ابتدا سبد سفارشات خود را تکمیل نمایید
          </Typography>
        )}
      </main>
    </React.Fragment>
  );
}
