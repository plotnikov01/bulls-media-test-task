import React from 'react';

import { Outlet } from 'react-router';

import './layout.scss';

export const Layout = (props) => {
  const { children } = props;

  return <div className="layout">{children ?? <Outlet />}</div>;
};
