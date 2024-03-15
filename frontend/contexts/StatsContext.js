// StatsContext.js
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
export const StatsContext = createContext();

export const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState(null);

  return (
    <StatsContext.Provider value={{ stats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
};

StatsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};