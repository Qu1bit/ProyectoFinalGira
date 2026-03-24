import React, { createContext, useContext, useState } from "react";

import { User, users } from "../../types/users";


type AuthContextType = {

  user: User | null;

  isAuthenticated: boolean;

  login: (username: string, password: string) => boolean;

  logout: () => void;

  //register: (email: string, password: string)=>Promise<void>;

};



// 1. Definir contexto

const AuthContext = createContext<AuthContextType | undefined>(undefined);



// 2. Hook personalizado

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) throw new Error('useAuth debe usarse dentro del AuthProvider');

    return context;

};



// 3. Definición de Context Provider

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);

    // iniciar sesion

        const login = (username: string, password: string): boolean => {

        const foundUser = users.find(u => u.name === username);



        if (foundUser) {

            setUser(foundUser);

            return true;

        }

       



        return false;

        };



    // Cierre de sesion

    const logout = () => {

        setUser(null);

    };



    //sesion iniciada si el objeto user no es null

    const isAuthenticated = Boolean(user);



    return (

        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>

            {children}

        </AuthContext.Provider>

    );

};