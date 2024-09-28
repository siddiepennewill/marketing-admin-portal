import React, {useEffect, useState} from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import NotificationsIcon from '@mui/icons-material/Notifications';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import {Routes, Route} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Clients from "../clients/index.jsx";
import ClientForm from '../../components/ClientForm'; // Import the new form component

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate(); 
    const [open, setOpen] = useState(false); // State to control the modal visibility

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () =>{ 
        // add a client to the data grid
        setOpen(true);
    };

    const handleClick = () =>{ 
        navigate("/clients");
    }
  

    return (
        <Box m ="20px">
            <Box display = "flex" justifyContent="space-between" alignItems="center">
                <Header title = "Portal" subtitle="Welcome to your dashboard"/>

                <Box>
                        <Button
                            className="button"
                            sx={{
                                backgroundColor: colors.greenAccent[400],
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                            }}
                            onClick={handleClickOpen}
                        >
                            <PersonAddIcon sx={{ mr: "10px", color: "white" }} />
                            Add Client
                        </Button>
              </Box>
            </Box>

            {/* GRID & CHARTS 
        <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
        >
            {/* ROW 1 
            <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            <StatBox
                title="13"
                subtitle="PO's to Complete"
                progress="0.50"
                increase="+21%"
                icon={
                <NotificationsIcon
                    sx={{ color: colors.blueAccent[300], fontSize: "26px" }}
                />
                }
            />
            </Box>
            <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            <StatBox
                title="361"
                subtitle="Emails Sent"
                progress="0.75"
                increase="+14%"
                icon={
                <EmailIcon
                    sx={{ color: colors.blueAccent[300], fontSize: "26px" }}
                />
                }
            />
            </Box>
            <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            <StatBox
                title="24"
                subtitle="New Clients"
                progress="0.30"
                increase="+5%"
                icon={
                <PersonAddIcon
                    sx={{ color: colors.blueAccent[300], fontSize: "26px" }}
                />
                }
            />
            </Box>
        </Box>
        */}
        <ClientForm open={open} onClose={handleClose}  />
     </Box>
    )
}

export default Dashboard;