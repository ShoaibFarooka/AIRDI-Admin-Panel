import React from "react";
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.js';
import routes from './RouteConfig'; // Import RouteConfig component

const Router = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.protected ? <ProtectedRoute showSidebar={route.showSidebar}>{route.element}</ProtectedRoute> : route.element}
        />
      ))}
    </Routes>
  );
};

export default Router;
