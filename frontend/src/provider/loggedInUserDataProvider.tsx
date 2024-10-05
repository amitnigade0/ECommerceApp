import React, { createContext, useState } from "react";

const LoggedInUserContext = createContext({
  loggedInUserData: { username: "", cartItems: [], orders: [] },
  setLoggedInUserData: (e: any) => {},
});

const LoggedInUserDataProvider = ({ children }: any) => {
  const [loggedInUserData, setLoggedInUserData] = useState({
    username: "",
    cartItems: [],
    orders: [],
  });

  return (
    <LoggedInUserContext.Provider
      value={{ loggedInUserData, setLoggedInUserData }}
    >
      {children}
    </LoggedInUserContext.Provider>
  );
};

export { LoggedInUserDataProvider, LoggedInUserContext };
