import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../provider/loggedInUserDataProvider";
import axios from "axios";

const Logout = () => {
  // call logout api & pass token
  // destroy user login session

  //const token = localStorage.getItem('token')
  axios
    .post(
      "http://localhost:3001/api/user/logout",
      {},
      { withCredentials: true } // It will attach cookie with request
      // { headers: { Authorization: `Bearer ${token}` } }
    )
    .catch((err: any) => {
      alert("Session expired! please re-login.");
    });

  const { setLoggedInUserData } = useContext(LoggedInUserContext);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
    setLoggedInUserData({ username: "", cartItems: [], orders: [] });
  });

  return <></>;
};

export default Logout;
