/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../lib/Layout/DashboardLayout/DashboardLayout';

/**
 * Main Menu when login
 */
export function DashboardLayoutExample() {
  return (
    <BrowserRouter>
      <DashboardLayout />
    </BrowserRouter>
  );
}
