import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "components/AddressForm";
import Header from "components/Header";
import { toast } from "react-toastify";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import ReactHookFormSelect from "components/ReactHookFormSelect";
import citiesImport from "services/citiesImport";
import provinceImport from "services/provinceImport";

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
  const [activeStep, setActiveStep] = React.useState(0);
  const {
    register,
    handleSubmit,
    control,
    errors: fieldsErrors,
    setValue,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const [province, setProvince] = React.useState("");

  const handleChangeProv = (event) => {
    setProvince(event.target.value);
    console.log("prov", province);
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    //handleNext();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main className={classes.layout}>
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
                  confirmation, and will send you an update when your order has
                  shipped.
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
                        id="shopName"
                        name="shopName"
                        label="نام فروشگاه"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="outlined"
                        inputRef={register({ required: false })}
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
                          as={
                            <Select labelId="province-label" label="استان">
                              {provinceImport.map((prov) => (
                                <MenuItem value={prov.name} key={prov.id}>
                                  {prov.name}
                                </MenuItem>
                              ))}
                            </Select>
                          }
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
                              {citiesImport.map((cities) => (
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
                            استان نمیتواند خالی باشد
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
                        id="street"
                        name="street"
                        label="خیابان"
                        fullWidth
                        autoComplete="given-street"
                        variant="outlined"
                        inputRef={register({ required: true })}
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
                        inputRef={register({ required: true })}
                        helperText={
                          fieldsErrors.phone ? "شماره همراه را به درستی" : null
                        }
                        error={fieldsErrors.phone}
                      />
                    </Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      type="submit"
                    >
                      ثبت سفارش
                    </Button>
                  </Grid>
                </form>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
