import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);
export { AuthContextProvider, useAuthContext };
