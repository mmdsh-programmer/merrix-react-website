import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
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
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import TuneIcon from "@material-ui/icons/Tune";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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
    marginBottom: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    position: "sticky",
    top: "0",
    zIndex: 1,
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
    marginTop: 0,
    [specialBreakpoint.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobileFormControl: {
    minWidth: 210,
    maxWidth: 300,
    margin: theme.spacing(2),
    marginTop: 0,
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
  mobileFilterButton: {
    minWidth: 250,
    maxWidth: 450,
    [specialBreakpoint.breakpoints.up("md")]: {
      display: "none",
    },
  },
  container: {
    marginTop: theme.spacing(10),
  },
  fixedSubmitContainer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  fixedSubmit: {
    borderRadius: 0,
    minHeight: 50,
  },
  mobileFilterToolbar: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(10),
    justifyContent: "center",
  },
}));

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
  const [openMobileFilter, setOpenMobileFilter] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setFilter, filter } = React.useContext(FilterContext);
  const [material, setMaterial] = React.useState(
    typeof filter !== "undefined" ? filter.materials : []
  );
  const [size, setSize] = React.useState(
    typeof filter !== "undefined" ? filter.sizes : []
  );
  const [styleFilter, setStyleFilter] = React.useState(
    typeof filter !== "undefined" ? filter.style : []
  );
  const [usage, setUsage] = React.useState(
    typeof filter !== "undefined" ? filter.usage : []
  );
  const { slug } = props;
  const filterOptions = {
    xWrap: {
      hasSize: false,
      hasMaterial: true,
      hasStyle: true,
      hasUsage: true,
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
      style: ["عاشقانه", "ایرانی", "تم تولد"],
      usage: ["کتاب", "ماگ"],
    },
    xBox: {
      hasSize: true,
      hasMaterial: false,
      hasStyle: true,
      hasUsage: true,
      material: [],
      style: ["عاشقانه", "ایرانی", "تم تولد"],
      usage: ["کتاب", "ماگ"],
    },
    xBag: {
      hasSize: true,
      hasMaterial: true,
      hasStyle: true,
      hasUsage: true,
      material: ["گلاسه", "کرافت", "ویلو"],
      style: ["عاشقانه", "ایرانی", "تم تولد"],
      usage: ["کتاب", "ماگ"],
    },
    xMemo: {
      hasSize: false,
      hasMaterial: false,
      hasStyle: true,
      hasUsage: true,
      material: [],
      style: ["عاشقانه", "ایرانی", "تم تولد"],
      usage: ["کتاب", "ماگ"],
    },
    tissueBox: {
      hasSize: false,
      hasMaterial: false,
      hasStyle: true,
      hasUsage: true,
      material: [],
      style: ["عاشقانه", "ایرانی", "تم تولد"],
      usage: ["کتاب", "ماگ"],
    },
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  let materials = material;

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

  const handleSizeChange = (event) => {
    setSize(removeUndefined(event.target.value));
  };

  const handleStyleChange = (event) => {
    setStyleFilter(removeUndefined(event.target.value));
  };

  const handleUsageChange = (event) => {
    setUsage(removeUndefined(event.target.value));
  };

  const handleSubmit = () => {
    setFilter({
      materials: material,
      sizes: size,
      style: styleFilter,
      usage: usage,
    });
  };

  const handleMobileFilterOpen = () => {
    setOpenMobileFilter(true);
  };

  const handleMobileFilterClose = () => {
    setOpenMobileFilter(false);
  };

  return (
    <React.Fragment>
      {checkSlug().hasMaterial ||
      checkSlug().hasSize ||
      checkSlug().hasStyle ||
      checkSlug().hasUsage ? (
        <Toolbar className={classes.filterBar}>
          <Button
            variant="outlined"
            color="default"
            className={classes.mobileFilterButton}
            startIcon={<TuneIcon />}
            onClick={handleMobileFilterOpen}
          >
            فیلتر ها
          </Button>
          <Dialog
            fullScreen
            open={openMobileFilter}
            onClose={handleMobileFilterClose}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleMobileFilterClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  فیلتر ها
                </Typography>
              </Toolbar>
            </AppBar>

            <Toolbar className={classes.mobileFilterToolbar}>
              {checkSlug().hasMaterial && (
                <FormControl className={classes.mobileFormControl} fullWidth>
                  <InputLabel id="demo-mutiple-checkbox-label">
                    متریال
                  </InputLabel>
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
                  </Select>
                </FormControl>
              )}
              {checkSlug().hasSize && (
                <FormControl className={classes.mobileFormControl} fullWidth>
                  <InputLabel id="size-mutiple-checkbox-label">سایز</InputLabel>
                  <Select
                    labelId="size-mutiple-checkbox-label"
                    id="size-mutiple-checkbox"
                    multiple
                    value={size}
                    onChange={handleSizeChange}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map(
                          (value, index) =>
                            typeof value !== "undefined" && (
                              <Chip
                                key={index}
                                label={`سایز ${value}`}
                                className={classes.chip}
                              />
                            )
                        )}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {[...Array(18).keys()].map((name, index) => (
                      <MenuItem key={index} value={name + 1}>
                        <Checkbox checked={size.indexOf(name + 1) > -1} />
                        <ListItemText primary={`سایز ${name + 1}`} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {checkSlug().hasStyle && (
                <FormControl className={classes.mobileFormControl} fullWidth>
                  <InputLabel id="style-mutiple-checkbox-label">طرح</InputLabel>
                  <Select
                    labelId="style-mutiple-checkbox-label"
                    id="style-mutiple-checkbox"
                    multiple
                    value={styleFilter}
                    onChange={handleStyleChange}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map(
                          (value, index) =>
                            typeof value !== "undefined" && (
                              <Chip
                                key={index}
                                label={value}
                                className={classes.chip}
                              />
                            )
                        )}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {checkSlug().style.map((name, index) => (
                      <MenuItem key={index} value={name}>
                        <Checkbox checked={styleFilter.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {checkSlug().hasUsage && (
                <FormControl className={classes.mobileFormControl} fullWidth>
                  <InputLabel id="usage-mutiple-checkbox-label">
                    کاربرد
                  </InputLabel>
                  <Select
                    labelId="usage-mutiple-checkbox-label"
                    id="usage-mutiple-checkbox"
                    multiple
                    value={usage}
                    onChange={handleUsageChange}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map(
                          (value, index) =>
                            typeof value !== "undefined" && (
                              <Chip
                                key={index}
                                label={value}
                                className={classes.chip}
                              />
                            )
                        )}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {checkSlug().usage.map((name, index) => (
                      <MenuItem key={index} value={name}>
                        <Checkbox checked={usage.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Toolbar>

            <div className={classes.fixedSubmitContainer}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<TuneIcon />}
                onClick={handleMobileFilterOpen}
                fullWidth
                className={classes.fixedSubmit}
                onClick={() => {
                  handleSubmit();
                  handleMobileFilterClose();
                }}
              >
                اعمال فیلتر ها
              </Button>
            </div>
          </Dialog>
          {checkSlug().hasMaterial && (
            <FormControl className={classes.formControl}>
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
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                  >
                    اعمال
                  </Button>
                </div>
              </Select>
            </FormControl>
          )}
          {checkSlug().hasSize && (
            <FormControl className={classes.formControl}>
              <InputLabel id="size-mutiple-checkbox-label">سایز</InputLabel>
              <Select
                labelId="size-mutiple-checkbox-label"
                id="size-mutiple-checkbox"
                multiple
                value={size}
                onChange={handleSizeChange}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map(
                      (value, index) =>
                        typeof value !== "undefined" && (
                          <Chip
                            key={index}
                            label={`سایز ${value}`}
                            className={classes.chip}
                          />
                        )
                    )}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {[...Array(18).keys()].map((name, index) => (
                  <MenuItem key={index} value={name + 1}>
                    <Checkbox checked={size.indexOf(name + 1) > -1} />
                    <ListItemText primary={`سایز ${name + 1}`} />
                  </MenuItem>
                ))}
                <div className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                  >
                    اعمال
                  </Button>
                </div>
              </Select>
            </FormControl>
          )}
          {checkSlug().hasStyle && (
            <FormControl className={classes.formControl}>
              <InputLabel id="style-mutiple-checkbox-label">طرح</InputLabel>
              <Select
                labelId="style-mutiple-checkbox-label"
                id="style-mutiple-checkbox"
                multiple
                value={styleFilter}
                onChange={handleStyleChange}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map(
                      (value, index) =>
                        typeof value !== "undefined" && (
                          <Chip
                            key={index}
                            label={value}
                            className={classes.chip}
                          />
                        )
                    )}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {checkSlug().style.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    <Checkbox checked={styleFilter.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
                <div className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                  >
                    اعمال
                  </Button>
                </div>
              </Select>
            </FormControl>
          )}
          {checkSlug().hasUsage && (
            <FormControl className={classes.formControl}>
              <InputLabel id="usage-mutiple-checkbox-label">کاربرد</InputLabel>
              <Select
                labelId="usage-mutiple-checkbox-label"
                id="usage-mutiple-checkbox"
                multiple
                value={usage}
                onChange={handleUsageChange}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map(
                      (value, index) =>
                        typeof value !== "undefined" && (
                          <Chip
                            key={index}
                            label={value}
                            className={classes.chip}
                          />
                        )
                    )}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {checkSlug().usage.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    <Checkbox checked={usage.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
                <div className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                  >
                    اعمال
                  </Button>
                </div>
              </Select>
            </FormControl>
          )}
        </Toolbar>
      ) : null}
    </React.Fragment>
  );
}
