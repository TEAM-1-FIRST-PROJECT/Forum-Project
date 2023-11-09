import { createContext } from "react";

  export const AuthContext = createContext({
    user: null,
    userData: null,
    // setContext: () => {}
    // user: localStorage.getItem('user')
    // role: localStorage.getItem('role)
    // userID: localStorage.getItem('userID');
    setUser: () => {},
    });