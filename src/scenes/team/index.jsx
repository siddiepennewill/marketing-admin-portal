import { Box, Button, Modal, TextField, useTheme } from "@mui/material";
import React, { useState, useEffect } from 'react'; 
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { teamData } from "../../data/teamData";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import {Routes, Route} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"; // For form validation

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate(); 

  const [selectionModel, setSelectionModel] = useState([]);
  const [showPasswordId, setShowPasswordId] = useState(null); // State to track which password is revealed
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/'); // Redirect to login if not logged in
    }
  }, [navigate]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.6,
      editable: true,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    {
      field: "password",
      headerName: "Password",
      flex: 1,
      editable: true,
      renderCell: (params) => {
      const password = params.row.password;
      const maskedPassword = "•".repeat(password.length); // Create dots matching the password length

      return (
        <span
          style={{ cursor: "pointer" }}
          onClick={() =>
            setShowPasswordId(showPasswordId === params.row.id ? null : params.row.id)
          }
        >
          {showPasswordId === params.row.id ? password : maskedPassword}
        </span>
      );
    },
    },
  ];

{/*
  // Initial state for teamData
  const [teamData, setTeamData] = useState(() => {
    const savedTeam = localStorage.getItem('teamData');
    return savedTeam ? JSON.parse(savedTeam) : [
      { id: 1, name: "Clint Pierce", email: "clintpierce@marketingexchange.com", password: "MarketingMX1" },
      { id: 2, name: "Bob Martin", email: "bobmartin@marketingexchange.com", password: "MarketingMX1" },
      { id: 3, name: "Ruth Wallin-Davis", email: "ruthwallindavis@marketingexchange.com", password: "MarketingMX1" },
      { id: 4, name: "Elizabeth Andrews", email: "elizabethandrews@marketingexchange.com", password: "MarketingMX1" },
      { id: 5, name: "Bob Martin 2", email: "bobmartin@marketingexchange.us", password: "MarketingMX1" },
    ];
  });*/}

  const defaultTeamData = [
    { id: 1, name: "Clint Pierce", email: "clintpierce@marketingexchange.com", password: "MarketingMX1" },
    { id: 2, name: "Bob Martin", email: "bobmartin@marketingexchange.com", password: "MarketingMX1" },
    { id: 3, name: "Ruth Wallin-Davis", email: "ruthwallindavis@marketingexchange.com", password: "MarketingMX1" },
    { id: 4, name: "Elizabeth Andrews", email: "elizabethandrews@marketingexchange.com", password: "MarketingMX1" },
    { id: 5, name: "Bob Martin 2", email: "bobmartin@marketingexchange.us", password: "MarketingMX1" },
];

const [teamData, setTeamData] = useState(() => {
    const savedTeam = localStorage.getItem('teamData');
    return savedTeam ? JSON.parse(savedTeam) : defaultTeamData; // Use default data if none is saved
});


  useEffect(() => {
    // Save to localStorage whenever the team data changes
    console.log("Saving team to localStorage: ", teamData);
    localStorage.setItem('teamData', JSON.stringify(teamData));
  }, [teamData]);

  // Function to process row updates
  const processRowUpdate = (newRow) => {
    const updatedTeam = teamData.map((row) =>
      row.id === newRow.id ? { ...newRow } : row
    );
    setTeamData(updatedTeam);
    return newRow;
  };


  const handleClick = () => {
    // Create a new row with a unique ID
    const newRow = {
      id: Date.now(), // or use a unique ID generation method
      name: "New User",
      email: "",
      password: "",
    };

    // Update state with the new row
    setTeamData((prevTeamData) => {
      const updatedTeamData = [...prevTeamData, newRow];
      // Save the updated team data to localStorage
      localStorage.setItem('teamData', JSON.stringify(updatedTeamData));
      return updatedTeamData;
    });
  };

  const handleSelectionModelChange = (newSelectionModel) => {
    console.log("Selection model:", newSelectionModel); // Debug selection model
    setSelectionModel(newSelectionModel);
  };

  const handleRemoveUser = () => {
    console.log('Selected rows:', selectionModel); // Debug selected rows
    setTeamData((prevTeamData) => {
      const updatedTeamData = prevTeamData.filter(row => !selectionModel.includes(row.id));
      localStorage.setItem('teamData', JSON.stringify(updatedTeamData));
      return updatedTeamData;
    });
    setSelectionModel([]); // Clear the selection
  };  

  // Formik initial values and validation schema
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const newUser = {
        id: Date.now(),
        ...values,
      };
      setTeamData((prevTeamData) => [...prevTeamData, newUser]);
      setOpenModal(false); // Close modal after submission
    },
  });

  return (
    <Box m="20px">
    <Box>
        <Header title="Team" subtitle="Manage the team members" />

        <Button
                      className="button"
                      sx={{
                          backgroundColor: colors.greenAccent[400],
                          color: "white",
                          fontSize: "14px",
                          fontWeight: "bold",
                          padding: "10px 20px",
                          mr: 1,
                      }}
                       //onClick={handleClick}
                       onClick={() => setOpenModal(true)} // Open modal on button click
                
                  >
                      <PersonAddIcon sx={{ mr: "10px", color: "white" }} />
                      Add User
      </Button>
      <Button
            className="button"
            sx={{
              backgroundColor: colors.redAccent[400],
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleRemoveUser}
            //disabled={selectionModel.length === 0}
          >
            Remove User
          </Button>

    </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid 
        checkboxSelection
        rows={teamData} 
        columns={columns}
        processRowUpdate={processRowUpdate} // Add this to handle row updates
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={handleSelectionModelChange}
         />
      </Box>

      
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin="normal"
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
            />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              Add User
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Team;
