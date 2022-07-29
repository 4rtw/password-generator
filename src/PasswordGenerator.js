import generatePassword from "./Service/PasswordService";
import {
  Alert,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  Link
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Slide from "@mui/material/Slide";

const PasswordGenerator = ({ setTheme }) => {
  const [lengthValue, setLenghtValue] = useState(5);
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ type: "info", text: "" });

  const generateNewPassword = useCallback(() => {
    try {
      setPassword(generatePassword(lengthValue));
    } catch (e) {
      console.log(e.message);
      let length = 5;
      let text = "You cannot have a password with less than 5 characters.";
      if (e.message.includes("big")) {
        length = 40;
        text = "You cannot have a password with more than 40 characters.";
      }
      popAlertUp("error", text);
      setLenghtValue(length);
    }
  }, [lengthValue]);

  const handleLengthChange = (e) => {
    setLenghtValue(e.target.value);
  };

  useEffect(() => {
    generateNewPassword();
  }, [generateNewPassword]);

  const handleClipBoardCopy = () => {
    navigator.clipboard.writeText(password).then(() => {
      popAlertUp("info", "The password has been copied in your clipboard");
    });
  };

  const popAlertUp = (severity, text) => {
    setOpen(true);
    setMessage({ type: severity, text: text });
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ padding: 15 }}
    >
      <Grid item xs={12}>
        <Typography variant="h5" textAlign={"center"}>
          Just a simple password generator. Nothing less, nothing more ;) <br />
          Check my code <Link href="https://github.com/4rtw/password-generator">here</Link>.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{ maxWidth: "90%", minWidth: "500px", overflow: "auto" }}
          variant="h2"
          textAlign={"center"}
        >
          {password}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          color="primary"
          type="number"
          sx={{ width: 100 }}
          value={lengthValue}
          label="Length"
          onChange={(e) => {
            handleLengthChange(e);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <IconButton
          color="primary"
          onClick={() => {
            setTheme();
          }}
        >
          <DarkModeIcon />
        </IconButton>
        <Snackbar open={open} TransitionComponent={Slide}>
          <Alert severity={message.type} sx={{ width: "100%" }}>
            {message.text}
          </Alert>
        </Snackbar>
        <IconButton
          color="primary"
          onClick={() => {
            handleClipBoardCopy();
          }}
        >
          <ContentCopyIcon />
        </IconButton>
        <IconButton
          color="primary"
          onClick={() => {
            generateNewPassword();
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default PasswordGenerator;
