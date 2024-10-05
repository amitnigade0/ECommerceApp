import { createContext, useState } from "react";

const SessionContext = createContext({
  isModalOpen: false,
  setModalOpen: (e: any) => {},
});

const SessionProvider = ({ children }: any) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <SessionContext.Provider value={{ isModalOpen, setModalOpen }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider, SessionContext };
