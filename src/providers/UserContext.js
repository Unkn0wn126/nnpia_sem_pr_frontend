import AuthService from '../services/auth.service'
import React, { createContext, useState } from "react";

const UserContext = createContext({name: '', roles: []});

export default UserContext;

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(AuthService.getCurrentUser());
    const [isAdmin, setIsAdmin] = useState(AuthService.isAdmin());

    const login = (loginRequest) => {
        return AuthService.login(loginRequest);
    }

    const logout = () => {
        AuthService.logout();
        setUser(AuthService.getCurrentUser());
        setIsAdmin(AuthService.isAdmin());
    }

    return (
        <UserContext.Provider value={{isAdmin, user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export {UserContext, UserProvider} ;