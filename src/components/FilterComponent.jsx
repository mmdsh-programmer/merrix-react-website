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
import FormLabel from "@material-ui/core/FormLabel";
import Divider from "@material-ui/core/Divider";
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

export default function FilterComponent() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const [size, setSize] = React.useState(undefined);
  const {
    control,
    errors: fieldsErrors,
    trigger,
    register,
    handleSubmit,
  } = useForm();
  const { setFilter, filter } = React.useContext(FilterContext);

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
    return `${value}°C`;
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    const finalValue = { ...data, size: size };
    setFilter(finalValue);
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
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="on"
                  step={1}
                  min={1}
                  max={18}
                  className={classes.slider}
                  onChange={(e, val) => setSize(val)}
                />
              </AccordionDetails>
            </Accordion>
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
                        <FormControlLabel
                          value="گلاسه"
                          control={<Radio />}
                          label="گلاسه"
                        />
                        <FormControlLabel
                          value="کرافت"
                          control={<Radio />}
                          label="کرافت"
                        />
                        <FormControlLabel
                          value="لینن"
                          control={<Radio />}
                          label="لینن"
                        />
                        <FormControlLabel
                          value="رنگی"
                          control={<Radio />}
                          label="رنگی"
                        />
                        <FormControlLabel
                          value="یو وی"
                          control={<Radio />}
                          label="یو وی"
                        />
                        <FormControlLabel
                          value="طلاکوب"
                          control={<Radio />}
                          label="طلاکوب"
                        />
                        <FormControlLabel
                          value="مخمل"
                          control={<Radio />}
                          label="مخمل"
                        />
                        <FormControlLabel
                          value="اوپال"
                          control={<Radio />}
                          label="اوپال"
                        />
                      </RadioGroup>
                    }
                  />
                </FormControl>
              </AccordionDetails>
            </Accordion>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              اعمال فیلتر
            </Button>
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
