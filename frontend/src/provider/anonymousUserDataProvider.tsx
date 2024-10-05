import { createContext, useState } from "react";

const AnonymousUserDataContext = createContext({
  anonymousUserData: { user: "anonymous", cartItems: [] },
  setAnonymousUserData: (e: any) => {},
});

const AnonymousUserDataProvider = ({ children }: any) => {
  const [anonymousUserData, setAnonymousUserData] = useState({
    user: "anonymous",
    cartItems: [],
  });

  return (
    <AnonymousUserDataContext.Provider
      value={{ anonymousUserData, setAnonymousUserData }}
    >
      {children}
    </AnonymousUserDataContext.Provider>
  );
};

export { AnonymousUserDataProvider, AnonymousUserDataContext };
