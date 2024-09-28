// ClientForm.js
import React, { useState } from 'react';
import { Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ClientForm = ({ open, onClose, onSave }) => {
  const [restaurantName,setRestaurantName] = useState('');
  const [email, setEmail] = useState('');
  const [smxp, setSXMP] = useState('');
  const [commission, setCommission] = useState('');
  const [units, setUnits] = useState('');
  const [deliveryMode, setDeliveryMode] = useState('');
  const [name, setName] = useState('');

  const handleSave = () => {
    if (name && restaurantName && email && smxp && commission && units && deliveryMode) {
      onSave({ restaurantName, email, smxp, commission, units, deliveryMode, name });
      setRestaurantName('');
      setEmail('');
      setSXMP('');
      setCommission('');
      setUnits('');
      setDeliveryMode('');
      setName('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Client</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="16px">
          <TextField
            label="Restaurant Name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email Addresses"
            value={name}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="SMXP"
            value={smxp}
            onChange={(e) => setSXMP(e.target.value)}
            fullWidth
          />
          <TextField
            label="Commission"
            type="number"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            fullWidth
          />
          <TextField
            label="Units"
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            fullWidth
          />
          <TextField
            label="Delivery Mode"
            value={deliveryMode}
            onChange={(e) => setDeliveryMode(e.target.value)}
            fullWidth
          />
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientForm;
