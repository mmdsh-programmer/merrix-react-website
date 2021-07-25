import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import FilterIcon from "./FilterIcon";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

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
    marginTop: theme.spacing(2),
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
          <Typography
            id="discrete-slider"
            gutterBottom
            component="h6"
            variant="h6"
          >
            سایز
          </Typography>
          <PrettoSlider
            defaultValue={1}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={1}
            min={1}
            max={18}
            className={classes.slider}
          />
          <Divider light />
          
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
