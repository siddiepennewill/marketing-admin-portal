import React, { useState } from 'react';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { Routes, Route, Navigate } from 'react-router-dom';
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Clients from "./scenes/clients";
import PurchaseOrder from "./scenes/purchase-orders";
import Email from "./scenes/email";
import Team from "./scenes/team";
import Form from "./scenes/userForm";
import AddClient from "./scenes/addClient";
import Login from "./scenes/login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          component="app"
          sx={{ display: 'flex', height: '100vh' }}
        >
          
          {isAuthenticated ? (
            <>
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Routes>
                  <Route path="/" element={<Navigate to="/team" />} />
                  <Route path="/purchase-orders" element={<PurchaseOrder />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/email" element={<Email />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/add-client" element={<AddClient />} />
                </Routes>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexGrow: 1,
                height: '100vh',
                //color: 'white' // Optional: Set background color for login page
              }}
            >
              <Routes>
                <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="*" element={<Navigate to="/" />} /> // Redirect all other paths to login 
              </Routes>
            </Box>
          )}
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;


{/*
  import React, { useContext } from 'react';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { Routes, Route, Navigate } from 'react-router-dom';
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Clients from "./scenes/clients";
import PurchaseOrder from "./scenes/purchase-orders";
import Email from "./scenes/email";
import Team from "./scenes/team";
import Form from "./scenes/userForm";
import AddClient from "./scenes/addClient";
import Login from "./scenes/login";

// Import the AppProvider and AppContext
import { AppProvider, AppContext } from './context/AppContext';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <AppProvider> 
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="app" sx={{ display: 'flex', height: '100vh' }}>
     
        <AppContent />
      </Box>
    </ThemeProvider>
  </ColorModeContext.Provider>
</AppProvider>
);
}

function AppContent() {
// Now the context is available because AppContent is inside AppProvider
const { isAuthenticated } = useContext(AppContext);

return isAuthenticated ? (
<>
  <Sidebar />
  <Box component="main" sx={{ flexGrow: 1 }}>
    <Routes>
      <Route path="/" element={<Navigate to="/team" />} />
      <Route path="/purchase-orders" element={<PurchaseOrder />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/email" element={<Email />} />
      <Route path="/team" element={<Team />} />
      <Route path="/form" element={<Form />} />
      <Route path="/add-client" element={<AddClient />} />
    </Routes>
  </Box>
</>
) : (
<Box
  sx={{
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    height: '100vh',
  }}
>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="*" element={<Navigate to="/" />} /> 
  </Routes>
</Box>
);
}

export default App;
  */}