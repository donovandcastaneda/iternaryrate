"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'


interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void ;
}


const AuthContext = createContext<AuthContextType|undefined>(undefined);



interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true")
  }, []);

  const login = (): void => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    console.log("isAuth is true ")
  };

  const logout = (): void => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
    console.log("isAuth is false ")
  };

 

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
