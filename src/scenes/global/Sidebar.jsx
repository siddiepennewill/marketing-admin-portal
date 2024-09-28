import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const ItemTwo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem>
    </MenuItem>
  );
};

const CustomSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
        sx={{
            display:"flex",
            flexDirection:"column",
            height:'100vh !important', // Ensure the sidebar takes up full viewport height
            "& .ps-sidebar-container": {
            background: `${colors.primary[400]} !important`,
            height: "100%",
            flex: "1",
            },
            "& .ps-menu-button": {
            padding: "5px 35px 5px 20px !important",
            },
            "& .ps-menu-button:hover": {
            color: "#868dfb !important",
            },
            "& .ps-menu-button--active": {
            color: "#6870fa !important",
            },
        }}
        >
            <Sidebar>
                <Menu>
                    <MenuItem
                        style={{
                        margin: "10px 0 20px 18px",
                        color: colors.grey[100],
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            textAlign="center"
                            ml="15px"
                        >
                            <Typography 
                                variant="h4"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{ m: "10px 0 0 0" }}
                            >
                                MX Admin Portal
                            </Typography>
                        </Box>
                    </MenuItem>  

              <Box paddingLeft={"6%"}>
                {/*<Item
                  title="Dashboard"
                  to="/"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Data
                </Typography>*/}
                <Item
                  title="Purchase Orders"
                  to="/purchase-orders"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                {/*<Item
                  title="Generate Email"
                  to="/email"
                  icon={<EmailOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                />*/}
                <Item
                  title="Client Information"
                  to="/clients"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Team"
                  to="/team"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                {/*<Item
                  title="Add Client"
                  to="/add-client"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />*/}

                {/*<Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Pages
                </Typography>
                <Item
                  title="Profile Form"
                  to="/form"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />*/}
                
                <ItemTwo/>
                <ItemTwo/>
                <ItemTwo/>
                <ItemTwo/>
                <ItemTwo/>
                <ItemTwo/>
                <ItemTwo/>
                <ItemTwo/>
                <ItemTwo/>
                <ItemTwo/>
                <ItemTwo/>
                <ItemTwo/>
                <ItemTwo/>
                <ItemTwo/>
                <ItemTwo/>
  
              </Box>
              <Box />
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default CustomSidebar;
