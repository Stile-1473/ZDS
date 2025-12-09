import {createContext, useState, useEffect} from "react";


 export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

        const [user, setUser] = useState(null);
    

        const clearUserInfo = () => {
            localStorage.removeItem("token");
            setUser(null);
        };

       
    const contextValue = {
        //global state and functions here

        user,
        setUser,
        clearUserInfo,
        
    };


  return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
  )
    }

