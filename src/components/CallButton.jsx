import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Grow from "@material-ui/core/Grow";
import TelegramIcon from "@material-ui/icons/Telegram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
  socialButtons: {
    position: "fixed",
    left: theme.spacing(2),
  },
  whatsapp: {
    bottom: theme.spacing(9),
    backgroundColor: "#128C7E",
  },
  telegram: {
    bottom: theme.spacing(16),
    backgroundColor: "#0088cc",
  },
}));

export default function CallButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
    console.log(open);
  };

  return (
    <React.Fragment>
      <Fab
        color="primary"
        aria-label="call"
        size="medium"
        className={classes.root}
        onClick={() => handleOpen()}
      >
        {open ? <CloseOutlinedIcon /> : <CallOutlinedIcon />}
      </Fab>
      <Grow in={open} timeout={250}>
        <Fab
          color="primary"
          aria-label="whatsapp"
          size="medium"
          className={[classes.socialButtons, classes.whatsapp].join(" ")}
        >
          <WhatsAppIcon />
        </Fab>
      </Grow>
      <Grow in={open} timeout={500}>
        <Fab
          color="primary"
          aria-label="telegram"
          size="medium"
          className={[classes.socialButtons, classes.telegram].join(" ")}
        >
          <TelegramIcon />
        </Fab>
      </Grow>
    </React.Fragment>
  );
}
