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
    padding: theme.spacing(3, 0, 5),
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
}));

const steps = ["مشخصات شما"];

export default function Checkout() {
  const classes = useStyles();
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

  const selectedProvId = (value) => {
    setFinalProvince(value);
    return provinceImport.filter((e) => e.name === value);
  };

  const selectedCityId = (value) => {
    setFinalCities(citiesImport.filter((e) => e.province_id === value));
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    setLoading(true);
    const products = [];
    cartItems.map((item) => {
      products.push({ product_id: item.id, quantity: item.quantity });
    });
    const finalData = {
      payment_method: "dbt",
      payment_method_title: "انتقال مستقیم بانکی",
      set_paid: true,
      billing: {
        first_name: data.firstName,
        last_name: data.lastName,
        address_1: data.address,
        address_2: "",
        city: data.city,
        receivables: data.receivables,
        state: finalProvince,
        postcode: "",
        country: "IR",
        phone: data.phone.toString(),
      },
      shipping: {
        first_name: data.firstName,
        last_name: data.lastName,
        company: data.shopName,
        address_1: data.address,
        address_2: "",
        city: data.city,
        state: finalProvince,
        postcode: "",
        country: "IR",
      },
      line_items: products,
    };

    order
      .create(finalData, "/wc/v3/orders")
      .then((res) => {
        toast.success("سفارش با موفقیت ثبت شد");
        handleCheckout();
        reset();
      })
      .catch((error) => {
        console.log(error);
        toast.error("مشکلی در ثبت سفارش رخ داد");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main className={classes.layout}>
        {cartItems.length > 0 && (
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              تسویه حساب
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
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
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                      <Grid item xs={12}>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          required
                          error={fieldsErrors.receivables}
                        >
                          <InputLabel id="receivables">وصول مطالبات</InputLabel>
                          <Controller
                            as={
                              <Select
                                labelId="receivables-label"
                                label="وصول مطالبات"
                              >
                                <MenuItem value="چکی">چکی</MenuItem>
                                <MenuItem value="نقدی">نقدی</MenuItem>
                                <MenuItem value="اعتباری">اعتباری</MenuItem>
                              </Select>
                            }
                            name="receivables"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                          />
                          {fieldsErrors.receivables && (
                            <FormHelperText>
                              وصول مطالبات نمیتواند خالی باشد
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
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
                      <Grid item xs={6}>
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
                          id="phone"
                          name="phone"
                          label="شماره موبایل"
                          fullWidth
                          autoComplete="given-phone"
                          variant="outlined"
                          inputProps={{ type: "numeric" }}
                          inputRef={register({
                            required: true,
                            valueAsNumber: true,
                          })}
                          helperText={
                            fieldsErrors.phone
                              ? "شماره همراه را به درستی"
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
            سبد خرید شما خالی است. لطفا ابتدا سبد خرید خود را پر نمایید
          </Typography>
        )}
      </main>
    </React.Fragment>
  );
}
