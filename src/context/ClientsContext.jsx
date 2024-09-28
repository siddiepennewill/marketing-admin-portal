import React, { createContext, useState } from 'react';

// Create the context
export const ClientsContext = createContext();

// Create a provider component
export const ClientsProvider = ({ children }) => {
    const [clientsData, setClientsData] = useState([]);

    const value = {
        clientsData,
        setClientsData
    };

    return (
        <ClientsContext.Provider value={value}>
            {children}
        </ClientsContext.Provider>
    );
};
