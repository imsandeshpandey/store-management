/* eslint-disable react-hooks/exhaustive-deps */
import { useResponsive } from 'hooks/useResponsive';
import { useColorScheme } from '@mui/joy';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

const useApp = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const { isTablet } = useResponsive();
  const { mode, setMode } = useColorScheme();
  const [appState, setAppState] = useState({
    userAgent: /Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
    appLoading: true,
    headerHeight: 0,
    sidebarExpanded: !isTablet,
    isLoggedIn: false,
    darkTheme: mode === 'dark',
    loginError: null,
  });

  useEffect(() => {
    setAppState((prevState) => ({
      ...prevState,
      darkTheme: mode === 'dark',
    }));
  }, [mode]);

  useEffect(() => {
    setAppState((prevState) => ({
      ...prevState,
      sidebarExpanded: !isTablet,
    }));
  }, [isTablet]);

  //helper functions

  const setAppLoading = (loading) => {
    setAppState((prevState) => ({
      ...prevState,
      appLoading: loading,
    }));
  };

  const setLoginError = (error) => {
    setAppState((prevState) => ({
      ...prevState,
      loginError: error,
    }));
  };

  const login = () => {
    setAppState((prevState) => ({
      ...prevState,
      isLoggedIn: true,
    }));
  };

  const setHeaderHeight = (height) => {
    setAppState((prevState) => ({
      ...prevState,
      headerHeight: height,
    }));
  };

  const toggleSidebar = () => {
    setAppState((prevState) => ({
      ...prevState,
      sidebarExpanded: !prevState.sidebarExpanded,
    }));
  };

  const logout = () => {
    setAppState((prevState) => ({
      ...prevState,
      isLoggedIn: false,
    }));
  };

  const toggleTheme = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppContext.Provider
      value={{
        ...appState,
        login,
        logout,
        toggleTheme,
        toggleSidebar,
        setHeaderHeight,
        setAppLoading,
        setLoginError,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider, useApp };
