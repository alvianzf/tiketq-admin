/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { AuthProvider } from './Auth/AuthProvider';
import { BookingProvider } from './Booking/BookingProvider';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <BookingProvider>{children}</BookingProvider>
    </AuthProvider>
  );
};

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProviders;
