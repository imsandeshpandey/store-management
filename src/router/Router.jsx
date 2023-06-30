/* eslint-disable react-hooks/exhaustive-deps */
import Layout from 'pages/layout/Layout';
import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import ROUTES from './routes.constants';
import Orders from 'pages/Orders/Orders';
import LoginPage from 'pages/Login/Login';
import { useAuth } from 'contexts/AuthContext';
import { useApp } from 'contexts/AppContext';
import Customers from 'pages/Customers/Customers';

const Router = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { setLoginError } = useApp();
  const naivgate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (user && user.access && pathname === ROUTES.LOGIN.ROOT) {
      naivgate(state?.from || ROUTES.ORDERS.ROOT);
    }
    if (user && !user.access) {
      setLoginError('You are not authorized to use this system.');
      naivgate(ROUTES.LOGIN.ROOT);
    }
    if (!user && pathname !== ROUTES.LOGIN.ROOT) {
      return naivgate(ROUTES.LOGIN.ROOT, {
        state: {
          from: pathname,
        },
      });
    }
  }, [user, pathname]);

  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Navigate replace to={ROUTES.ORDERS.ROOT} />} />
      <Route path={ROUTES.LOGIN.ROOT} element={<LoginPage />} />
      {user?.access && (
        <Route element={<Layout />}>
          <Route path={ROUTES.ORDERS.ROOT} element={<Orders />} />
          <Route path={ROUTES.CUSTOMERS.ROOT} element={<Customers />} />
          <Route path={ROUTES.MY_STORE.ROOT} element={<Customers />} />
        </Route>
      )}
    </Routes>
  );
};

export default Router;
