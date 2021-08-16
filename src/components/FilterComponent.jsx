import React from "react";
import {
  makeStyles,
  withStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import FilterIcon from "./FilterIcon";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { useForm, Controller } from "react-hook-form";
import { FilterContext } from "helpers/FilterContext";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

const useStyles = makeStyles((theme) => ({
  sortButton: {
    margin: theme.spacing(3),
    position: "fixed",
    bottom: "0",
    right: "0",
    zIndex: 999,
    backgroundColor: "rgb(70,70,70)",
    "&:hover": {
      backgroundColor: "rgb(70,70,70)",
    },
    "&:active": {
      backgroundColor: "rgb(70,70,70)",
    },
    [specialBreakpoint.breakpoints.up("md")]: {
      display: "none",
    },
  },
  sortIcon: {
    marginTop: "13px",
    marginRight: "10px",
  },
  filterDrawerContainer: {
    width: 300,
    justifyContent: "center",
    padding: theme.spacing(3),
  },
  slider: {
    maxWidth: 250,
    alignSelf: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  hideMobile: {
    [specialBreakpoint.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function FilterComponent(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const [size, setSize] = React.useState(1);
  const { control, errors: fieldsErrors, handleSubmit } = useForm();
  const { setFilter, filter } = React.useContext(FilterContext);
  const { slug } = props;
  const filterOptions = {
    xWrap: {
      hasSize: false,
      hasMaterial: true,
      material: [
        "گلاسه",
        "کرافت",
        "لینن",
        "رنگی",
        "یووی",
        "شاینی",
        "مخمل",
        "اوپال",
      ],
    },
    xBox: {
      hasSize: true,
      hasMaterial: false,
      material: [],
    },
    xBag: {
      hasSize: true,
      hasMaterial: true,
      material: ["گلاسه", "کرافت", "ویلو"],
    },
    xMemo: {
      hasSize: false,
      hasMaterial: false,
      material: [],
    },
    tissueBox: { hasSize: false, hasMaterial: false, material: [] },
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    const finalValue = {
      ...data,
      size: size,
    };
    setFilter(finalValue);
  };

  const checkSlug = () => {
    switch (slug) {
      case "X WRAP | کادوپیچ":
        return filterOptions.xWrap;
      case "X BOX | متال باکس":
        return filterOptions.xBox;
      case "X BAG | بگ":
        return filterOptions.xBag;
      case "باکس دستمال کاغذی":
        return filterOptions.tissueBox;
      default:
        return filterOptions.xMemo;
    }
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={classes.hideMobile}
      >
        {checkSlug().hasSize && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>سایز</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PrettoSlider
                name="sizeّ"
                defaultValue={typeof filter !== "undefined" ? filter.size : 1}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="on"
                step={1}
                min={1}
                max={18}
                key={`slider-${
                  typeof filter !== "undefined" ? filter.size : 1
                }`}
                className={classes.slider}
                onChange={(e, val) => {
                  setSize(val);
                }}
              />
            </AccordionDetails>
          </Accordion>
        )}
        {checkSlug().hasMaterial && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>متریال</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <Controller
                  control={control}
                  defaultValue={
                    typeof filter !== "undefined" ? filter.material : ""
                  }
                  name="material"
                  as={
                    <RadioGroup aria-label="gender" row>
                      {checkSlug().material.map((item, index) => {
                        return (
                          <FormControlLabel
                            value={item}
                            control={<Radio />}
                            label={item === "ویلو" ? "ویلو (مخمل)" : item}
                            key={index}
                          />
                        );
                      })}
                    </RadioGroup>
                  }
                />
              </FormControl>
            </AccordionDetails>
          </Accordion>
        )}
        {checkSlug().hasMaterial || checkSlug().hasSize ? (
          <React.Fragment>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={toggleDrawer("left", false)}
            >
              اعمال فیلتر
            </Button>
            <Button
              type="reset"
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => setFilter()}
            >
              پاک کردن فیلتر
            </Button>
          </React.Fragment>
        ) : (
          <Typography className={classes.heading}>
            فیلتر برای این دسته بندی موجود نیست
          </Typography>
        )}
      </form>
      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        <Grid
          container
          className={classes.filterDrawerContainer}
          direction="column"
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {checkSlug().hasSize && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>سایز</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <PrettoSlider
                    name="sizeّ"
                    defaultValue={
                      typeof filter !== "undefined" ? filter.size : 1
                    }
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="on"
                    step={1}
                    min={1}
                    max={18}
                    key={`slider-${
                      typeof filter !== "undefined" ? filter.size : 1
                    }`}
                    className={classes.slider}
                    onChange={(e, val) => {
                      setSize(val);
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            )}
            {checkSlug().hasMaterial && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>متریال</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl component="fieldset">
                    <Controller
                      control={control}
                      defaultValue={
                        typeof filter !== "undefined" ? filter.material : ""
                      }
                      name="material"
                      as={
                        <RadioGroup aria-label="gender" row>
                          {checkSlug().material.map((item, index) => {
                            return (
                              <FormControlLabel
                                value={item}
                                control={<Radio />}
                                label={item === "ویلو" ? "ویلو (مخمل)" : item}
                                key={index}
                              />
                            );
                          })}
                        </RadioGroup>
                      }
                    />
                  </FormControl>
                </AccordionDetails>
              </Accordion>
            )}
            {checkSlug().hasMaterial || checkSlug().hasSize ? (
              <React.Fragment>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={toggleDrawer("left", false)}
                >
                  اعمال فیلتر
                </Button>
                <Button
                  type="reset"
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={() => setFilter()}
                >
                  پاک کردن فیلتر
                </Button>
              </React.Fragment>
            ) : (
              <Typography className={classes.heading}>
                فیلتر برای این دسته بندی موجود نیست
              </Typography>
            )}
          </form>
        </Grid>
      </Drawer>
      <Fab
        size="medium"
        color="primary"
        aria-label="sort"
        className={classes.sortButton}
        onClick={toggleDrawer("left", true)}
      >
        <FilterIcon fontSize="large" className={classes.sortIcon} />
      </Fab>
    </React.Fragment>
  );
}
