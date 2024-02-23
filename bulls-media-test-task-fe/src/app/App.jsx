import { Navigate, Route, Routes } from 'react-router';

import { PrivateRoute } from '../hoc/PrivateRoute.jsx';

import { Layout } from '../components';
import { AdminPanel, LoginPage, RegistrationPage } from '../features';

import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </div>
  );
};
