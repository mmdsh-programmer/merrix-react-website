import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
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
  const [size, setSize] = React.useState(undefined);
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
        "طلاکوب",
        "مخمل",
        "اوپال",
      ],
    },
    xBox: {
      hasSize: true,
      hasMaterial: true,
      material: ["دایره", "مربع"],
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

  const valuetext = (value) => {
    return value;
  };

  const textToNum = (text) => {
    switch (text) {
      case "یک":
        return 1;
      case "دو":
        return 2;
      case "سه":
        return 3;
      case "چهار":
        return 4;
      case "پنج":
        return 5;
      case "شش":
        return 6;
      case "هفت":
        return 7;
      case "هشت":
        return 8;
      case "نه":
        return 9;
      case "ده":
        return 10;
      case "یازده":
        return 11;
      case "دوازده":
        return 12;
      case "سیزده":
        return 13;
      case "چهارده":
        return 14;
      case "پانزده":
        return 15;
      case "شانزده":
        return 16;
      case "هفده":
        return 17;
      case "هجده":
        return 18;
    }
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    const finalValue = { ...data, size: size };
    setFilter(finalValue);
  };

  const checkSlug = () => {
    switch (slug) {
      case "کاغذ کادو":
        return filterOptions.xWrap;
      case "باکس هدیه":
        return filterOptions.xBox;
      case "پاکت هدیه":
        return filterOptions.xBag;
      case "باکس دستمال کاغذی":
        return filterOptions.tissueBox;
      default:
        return filterOptions.xMemo;
    }
  };

  return (
    <React.Fragment>
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
                      typeof filter !== "undefined" ? textToNum(filter.size) : 1
                    }
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="on"
                    step={1}
                    min={1}
                    max={18}
                    key={`slider-${
                      typeof filter !== "undefined" ? textToNum(filter.size) : 1
                    }`}
                    className={classes.slider}
                    onChange={(e, val) => {
                      switch (val) {
                        case 1:
                          setSize("یک");
                          break;
                        case 2:
                          setSize("دو");
                          break;
                        case 3:
                          setSize("سه");
                          break;
                        case 4:
                          setSize("چهار");
                          break;
                        case 5:
                          setSize("پنج");
                          break;
                        case 6:
                          setSize("شش");
                          break;
                        case 7:
                          setSize("هفت");
                          break;
                        case 8:
                          setSize("هشت");
                          break;
                        case 9:
                          setSize("نه");
                          break;
                        case 10:
                          setSize("ده");
                          break;
                        case 11:
                          setSize("یازده");
                          break;
                        case 12:
                          setSize("دوازده");
                          break;
                        case 13:
                          setSize("سیزده");
                          break;
                        case 14:
                          setSize("چهارده");
                          break;
                        case 15:
                          setSize("پانزده");
                          break;
                        case 16:
                          setSize("شانزده");
                          break;
                        case 17:
                          setSize("هفده");
                          break;
                        case 18:
                          setSize("هجده");
                          break;
                      }
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
                        typeof filter !== "undefined" ? filter.material : "none"
                      }
                      name="material"
                      as={
                        <RadioGroup aria-label="gender" row>
                          {checkSlug().material.map((item, index) => {
                            return (
                              <FormControlLabel
                                value={item}
                                control={<Radio />}
                                label={item}
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
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                اعمال فیلتر
              </Button>
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
