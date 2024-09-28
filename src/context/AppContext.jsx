import React, { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
  // Define global states here
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [teamData, setTeamData] = useState([
    { id: 1, name: "Clint Pierce", email: "clintpierce@marketingexchange.com", password: "MarketingMX1" },
    { id: 2, name: "Bob Martin", email: "bobmartin@marketingexchange.com", password: "MarketingMX1" },
    { id: 3, name: "Ruth Wallin-Davis", email: "ruthwallindavis@marketingexchange.com", password: "MarketingMX1" },
    { id: 4, name: "Elizabeth Andrews", email: "elizabethandrews@marketingexchange.com", password: "MarketingMX1" },
    { id: 5, name: "Bob Martin 2", email: "bobmartin@marketingexchange.us", password: "MarketingMX1" },
  ]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        teamData,
        setTeamData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
