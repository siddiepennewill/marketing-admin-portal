import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import visibility icons
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false); // State to handle login errors
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const hardcodedUsers = [
    { email: 'clintpierce@marketingexchange.com', password: 'MarketingMX1' },
    { email: 'bobmartin@marketingexchange.com', password: 'MarketingMX1' },
    { email: 'ruthwallindavis@marketingexchange.com', password: 'MarketingMX1' },
    { email: 'elizabethandrews@marketingexchange.com', password: 'MarketingMX1' },
    { email: 'bobmartin@marketingexchange.us', password: 'MarketingMX1' },
    { email: 'customerservice@marketingexchange.us', password: 'MarketingMX1' },
    
];

const handleLogin = () => {
    console.log('Attempting to log in with:', { email, password });

    const user = hardcodedUsers.find(
        (member) => member.email === email && member.password === password
    );

    if (user) {
        setIsAuthenticated(true);
        navigate('/'); // Redirect to the main page after login
    } else {
        console.log('Login failed: Invalid email or password');
        setLoginError(true);
    }
};


  {/*const handleLogin = () => {
    const savedTeamData = JSON.parse(localStorage.getItem('teamData')) || [];
    console.log('Saved Team Data:', savedTeamData); // Debugging line
    console.log('Attempting to log in with:', { email, password }); // Debugging line

    const user = savedTeamData.find(
        (member) => member.email === email && member.password === password
    );

    if (user) {
        setIsAuthenticated(true);
        navigate('/'); // Redirect to the main page after login
    } else {
        setLoginError(true); // Show an error message if login fails
    }
};*/}

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box
        p={4}
        bgcolor="white"
        borderRadius={2}
        boxShadow={3}
        maxWidth="400px"
        width="100%"
      >
        <Typography variant="h4" mb={2}>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          //type="password"
          type={showPassword ? 'text' : 'password'} // Toggle password visibility
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {loginError && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            Invalid email or password
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

