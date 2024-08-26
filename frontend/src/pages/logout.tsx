import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../provider/loggedInUserDataProvider";
import axios from "axios";


const Logout = () => {
    alert('Logged out successfully!')
    // call logout api & pass token
    // destroy user login session
    const token = localStorage.getItem('token')
    console.log('token :>> ', token);
    axios.post(
        "http://localhost:3001/api/user/logout",
        { headers: { Authorization: `Bearer ${token}` } }
    );
    
    const { setLoggedInUserData } = useContext(LoggedInUserContext);
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/login')
        setLoggedInUserData({ username: "", cartItems: [], orders: [] })
    })
    return<></>
}

export default Logout;