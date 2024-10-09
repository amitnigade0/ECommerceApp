import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SessionContext } from "../provider/sessionProvider";
import { Fragment, useContext } from "react";
import { LoggedInUserContext } from "../provider/loggedInUserDataProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { tokenExpirationWarning } from "../utility/utility";

export default function SessionExpireModal() {
  const { isModalOpen, setModalOpen } = useContext(SessionContext);
  const { loggedInUserData } = useContext(LoggedInUserContext);

  if (loggedInUserData.username.length < 1) {
    setModalOpen(false);
  }

  const naviagate = useNavigate();

  const handleContinueSession = async () => {
    setModalOpen(false);
    try {
      // refresh token API Call
      const res = await axios.post(
        "http://localhost:3001/api/user/refresh-token",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        tokenExpirationWarning(res?.data?.tokenExpiresIn, setModalOpen);
      }
    } catch (err) {
      console.log(`Error while calling refresh token API, ${err}`);
      naviagate("/logout");
    }
  };

  const handleLogout = () => {
    setModalOpen(false);
    naviagate("/logout");
  };

  return (
    <Fragment>
      <Dialog
        open={isModalOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Session timeout warning"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            `You session will expire automatically in 60 seconds. Select
            <b> Continue Session</b> to extend your session.`
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout}>Log Out</Button>
          <Button onClick={handleContinueSession} autoFocus>
            Continue Session
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
