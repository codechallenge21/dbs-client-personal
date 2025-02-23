'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoginContextProps {
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
  isSignupOpen: boolean;
  setIsSignupOpen: (open: boolean) => void;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <LoginContext.Provider
      value={{ isLoginOpen, setIsLoginOpen, isSignupOpen, setIsSignupOpen }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
};
