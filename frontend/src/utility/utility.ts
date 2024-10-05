import axios from "axios";

export const updateLoggedInUser = async (token: any, dataToBeUpdated: any) => {
  try {
    const updatedUserResponse = await axios.post(
      "http://localhost:3001/api/user/update",
      dataToBeUpdated,
      { withCredentials: true } // It will attach cookie with request
      // { headers: { Authorization: `Bearer ${token}` } }
    );
    if (updatedUserResponse.status === 200) {
      const currentUserData = await axios.get(
        "http://localhost:3001/api/user/current",
        { withCredentials: true } // It will attach cookie with request
        // { headers: { Authorization: `Bearer ${token}` } }
      );
      return currentUserData.data;
    }
  } catch (err) {
    console.log(`Error while calling update user API, ${err}`);
  }
};

export const tokenExpirationWarning = (
  tokenExpiresIn: any,
  setModalOpen: any
) => {
  const tokenExpireWarningTime = tokenExpiresIn - 60000 - Date.now();
  setTimeout(() => {
    setModalOpen(true);
  }, tokenExpireWarningTime);
};
