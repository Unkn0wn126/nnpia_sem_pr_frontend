import AuthService from '../services/auth.service'
import React, { createContext, useState } from "react";

const UserContext = createContext({name: '', roles: []});

export default UserContext;

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(AuthService.getCurrentUser());

    const login = (loginRequest) => {
        return AuthService.login(loginRequest);
    }

    const logout = () => {
        AuthService.logout();
        setUser(undefined);
    }

    return (
        <UserContext.Provider value={{user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export {UserContext, UserProvider} ;