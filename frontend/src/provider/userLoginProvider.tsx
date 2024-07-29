import React, { createContext, useState } from 'react';

const LoginContext = createContext({
    loggedInUserData: {},
    setLoggedInUserData: (e: any) => {}
});

const UserLoginProvider = ({children }: any) => {
    const [loggedInUserData, setLoggedInUserData] = useState({})
    
    return (
        <LoginContext.Provider value={{ loggedInUserData, setLoggedInUserData }}>
        { children }
    </LoginContext.Provider>
    ) 
}

export { UserLoginProvider, LoginContext }