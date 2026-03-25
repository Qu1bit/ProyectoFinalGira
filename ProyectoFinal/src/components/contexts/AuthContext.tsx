import React, { createContext, useContext, useState } from "react";
import { User } from "../../types/users";
import { useAppSelector } from "../../store/hooks"; 

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro del AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  //Obtener la lista de usuarios desde Redux
  const usersFromRedux = useAppSelector((state) => state.users.users);

  const login = (username: string, password: string): boolean => {
    //Buscamos en la lista dinamica de Redux
    const foundUser = usersFromRedux.find(u => u.name.toLowerCase() === username.toLowerCase());

    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};