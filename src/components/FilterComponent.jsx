import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Fab from "@material-ui/core/Fab";
import FilterIcon from "./FilterIcon";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

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
  },
}));

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
        <Grid container spacing={1} className={classes.filterDrawerContainer}>
          <Typography id="discrete-slider" gutterBottom>
            سایز
          </Typography>
          <Slider
            defaultValue={1}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={1}
            marks
            min={1}
            max={18}
            className={classes.slid}
          />
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
