/* eslint-disable react-hooks/exhaustive-deps */
import Layout from 'pages/layout/Layout';
import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import ROUTES from './routes.constants';
import Orders from 'pages/Orders/Orders';
import LoginPage from 'pages/Login/Login';
import { useAuth } from 'contexts/useAuth/Auth.context';
import { useApp } from 'contexts/AppState.context';

const Router = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { setLoginError } = useApp();

  const naivgate = useNavigate();
  useEffect(() => {
    if (user && user.access && pathname === ROUTES.LOGIN.ROOT) {
      naivgate(ROUTES.ORDERS.ROOT);
    }
    if (user && !user.access) {
      setLoginError('You are not authorized to use this system.');
      naivgate(ROUTES.LOGIN.ROOT);
    }
    if (!user && pathname !== ROUTES.LOGIN.ROOT) {
      return naivgate(ROUTES.LOGIN.ROOT);
    }
  }, [user, pathname]);

  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Navigate replace to={ROUTES.ORDERS.ROOT} />} />
      <Route path={ROUTES.LOGIN.ROOT} element={<LoginPage />} />
      {user?.access && (
        <Route element={<Layout />}>
          <Route path={ROUTES.ORDERS.ROOT} element={<Orders />} />
        </Route>
      )}
    </Routes>
  );
};

export default Router;
