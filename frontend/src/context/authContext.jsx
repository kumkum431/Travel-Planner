import { createContext, useEffect, useState } from "react";

export const authContext = createContext(null);

export default function AuthState ({ children }) {
    
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </authContext.Provider>

  );
}
