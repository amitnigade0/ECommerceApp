import axios from "axios";

export const updateLoggedInUser = async (token: any, cartItems: any) => {
    try {
      const updatedUserResponse = await axios.post(
        "http://localhost:3001/api/user/update",
        { cartItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (updatedUserResponse.status === 200) {
        const currentUserData = await axios.get(
          "http://localhost:3001/api/user/current",
          { headers: { Authorization: `Bearer ${token}` } }
        );
          return currentUserData.data;
      }
    } catch (err) {
      console.log(`Error while calling update user API, ${err}`);
    }
};
