import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { FilterContext } from "helpers/FilterContext";
import Toolbar from "@material-ui/core/Toolbar";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Popover from "@material-ui/core/Popover";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

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
    minWidth: 250,
    maxWidth: 250,
    alignSelf: "center",
    margin: theme.spacing(4),
    marginTop: theme.spacing(6),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  filterBar: {
    backgroundColor: "rgb(240,240,240)",
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "stretch",
    flexWrap: "wrap",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  formControl: {
    minWidth: 210,
    maxWidth: 300,
    margin: theme.spacing(2),
  },
  openSizeButton: {
    width: "200px",
    height: "auto",
    backgroundColor: "transparent",
    border: "1px solid rgba(0, 0, 0, 0.27)",
    color: "rgba(0, 0, 0, 0.5)",
    boxShadow: "none",
    fontSize: "1rem",
    margin: theme.spacing(2),
    justifyContent: "space-between",
    "&:hover": {
      backgroundColor: "transparent",
      color: "rgba(0, 0, 0, 0.5)",
      border: "1px solid rgba(0, 0, 0, 0.57)",
      boxShadow: "none",
    },
  },
  buttonContainer: {
    backgroundColor: "#fff",
    position: "sticky",
    bottom: "0px",
    display: "flex",
    justifyContent: "flex-end",
  },
  submit: {
    margin: theme.spacing(1),
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: "rgb(120,120,120)",
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  getContentAnchorEl: null,
};

export default function FilterComponent(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setFilter, filter } = React.useContext(FilterContext);
  const [material, setMaterial] = React.useState(
    typeof filter !== "undefined" ? filter.materials : []
  );
  const [size, setSize] = React.useState(
    typeof filter !== "undefined" ? filter.size : undefined
  );
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

  const handleSizeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSizeClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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

  const removeUndefined = (array) => {
    return array.filter((item) => {
      return typeof item !== "undefined";
    });
  };

  const handleMaterialChange = (event) => {
    setMaterial(removeUndefined(event.target.value));
  };

  const materialSubmit = () => {
    setFilter({
      materials: material,
      size: size,
    });
    //console.log(filter);
  };

  const sizeSubmit = () => {
    setFilter({
      materials: material,
      size: size,
    });
    console.log(filter);
  };

  return (
    <React.Fragment>
      {checkSlug().hasMaterial || checkSlug().hasSize ? (
        <Toolbar className={classes.filterBar}>
          {checkSlug().hasMaterial && (
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel id="demo-mutiple-checkbox-label">متریال</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={material}
                onChange={handleMaterialChange}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map(
                      (value, index) =>
                        typeof value !== "undefined" && (
                          <Chip
                            key={index}
                            label={value === "ویلو" ? "ویلو (مخمل)" : value}
                            className={classes.chip}
                          />
                        )
                    )}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {checkSlug().material.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    <Checkbox checked={material.indexOf(name) > -1} />
                    <ListItemText
                      primary={name === "ویلو" ? "ویلو (مخمل)" : name}
                    />
                  </MenuItem>
                ))}
                <div className={classes.buttonContainer}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.submit}
                    onClick={(e) => setFilter({ materials: [], size: size })}
                  >
                    <RotateLeftIcon />
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={materialSubmit}
                  >
                    اعمال
                  </Button>
                </div>
              </Select>
            </FormControl>
          )}

          {checkSlug().hasSize && (
            <React.Fragment>
              <Button
                aria-describedby={id}
                variant="contained"
                color="primary"
                onClick={handleSizeClick}
                className={classes.openSizeButton}
              >
                سایز {size ? size : null}
                <ArrowDropDownIcon />
              </Button>
              <Popover
                id={id}
                className={classes.sizePopOver}
                open={open}
                anchorEl={anchorEl}
                onClose={handleSizeClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <PrettoSlider
                  name="sizeّ"
                  defaultValue={
                    typeof filter.size !== "undefined" ? filter.size : 1
                  }
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="on"
                  step={1}
                  min={1}
                  max={18}
                  key={`slider-${
                    typeof filter.size !== "undefined" ? filter.size : 1
                  }`}
                  className={classes.slider}
                  onChange={(e, val) => {
                    setSize(val);
                  }}
                />
                <div className={classes.buttonContainer}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.submit}
                    onClick={(e) =>
                      setFilter({ materials: material, size: undefined })
                    }
                  >
                    <RotateLeftIcon />
                  </Button>
                  <Button
                    onClick={sizeSubmit}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    اعمال
                  </Button>
                </div>
              </Popover>
            </React.Fragment>
          )}
        </Toolbar>
      ) : null}
    </React.Fragment>
  );
}
