import React, { createContext, useContext, useState } from "react";

// Definicion de roles
type Role = 'admin' | 'common';

type User = {
    role: Role;
} | null;

type AuthContextType = {
    user: User;
    isAuthenticated: boolean; // estado que da la sesion como iniciada 
    login: (role: Role) => void; // Funcion para guardar el rol
    logout: () => void; // Funcion para regresar a Login
}

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
    const [user, setUser] = useState<User>(null);

    // iniciar sesion
    const login = (role: Role) => {
        setUser({ role }); // Guardar rol seleccionado
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