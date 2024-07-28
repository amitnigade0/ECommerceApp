import React, { createContext, useState } from 'react';

const LoginContext = createContext({
    isUserLoggedIn: false,
    setIsUserLoggedIn: (e: any) => {}
});

const UserLoginProvider = ({children }: any) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    
    return (
        <LoginContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
        { children }
    </LoginContext.Provider>
    ) 
}

export { UserLoginProvider, LoginContext }