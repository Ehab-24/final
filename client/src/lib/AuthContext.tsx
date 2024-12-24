import React from 'react';
import { createContext, useContext, useState } from "react";
import * as api from "../api";
import * as TokensManager from "./TokensManager";

type TAuthContext = {
    isLoggedIn: boolean;
    signup: (username: string, password: string) => void;
    login: (username: string, password: string) => void;
    logout: () => void;
};

const AuthContext = createContext<TAuthContext>(
    {
        isLoggedIn: false,
        signup: () => { },
        login: () => { },
        logout: () => { }
    }
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(TokensManager.hasToken())

    async function signup(username: string, password: string) {
        const resp = await api.register(username, password)
        if (!!resp && !resp.error) {
            console.log('user signed up')
            TokensManager.setToken(resp.token)
            setIsLoggedIn(true)
        } else {
            alert(resp?.error ?? 'User already exists')
        }
    }

    async function login(username: string, password: string) {
        const resp = await api.login(username, password)
        if (!!resp && !resp.error) {
            console.log('user logged in')
            TokensManager.setToken(resp.token)
            setIsLoggedIn(true)
        } else {
            alert('Incorrect credentials')
        }
    }

    function logout() {
        console.log('user logged out')
        TokensManager.removeToken()
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn, signup, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};

