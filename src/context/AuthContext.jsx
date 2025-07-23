import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedStatus = localStorage.getItem("loggedIn");
        if (storedStatus === "true") setIsLoggedIn(true);
    }, []);

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem("loggedIn", "true");
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.setItem("loggedIn", "false");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
