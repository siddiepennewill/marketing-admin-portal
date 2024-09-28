import React, {useEffect, useState, useCon} from "react";
import { Box, Button, Grid } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter, GridToolbarExport, GridRowModes } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import sampleFile from '../../data/SMXP.xlsx'; // Adjust the path as needed
import * as XLSX from 'xlsx';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ClientForm from '../../components/ClientForm'; // Import the new form component
import SearchToolbar from "../../components/SearchToolbar";
import { ClientsContext } from '../../context/ClientsContext';

const Clients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rowModesModel, setRowModesModel] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [sortModel, setSortModel] = useState([
    {
      field: 'name', // Column field to sort
      sort: 'asc',   // Sorting direction: 'asc' for ascending, 'desc' for descending
    },
  ]);

  const spsLogin = () =>{ 
    window.open('https://auth.spscommerce.com/login?state=hKFo2SBrc0ZTSlJzX1duOE53U2hRTDBURUpxZHVnZGFhemE2VqFupWxvZ2luo3RpZNkgaFZDM3NCakNzLWR6dUx4TXktaW1obHR6dXdPcmtkbUmjY2lk2SBYZ1ZpWmV2VE1ORklpb1VsZjhWeUNXQURpc2oxYzZ4Tg&client=XgViZevTMNFIioUlf8VyCWADisj1c6xN&protocol=oauth2&response_type=token&scope=openid%20profile%20email&audience=api%3A%2F%2Fapi.spscommerce.com%2F&redirect_uri=https%3A%2F%2Fcommerce.spscommerce.com%2Fauth0%2Fcallback&auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4yMC4wIn0%3D', '_blank');
  };

    useEffect(() => {
      const columns = [
        //  { field: "id", headerName: "ID", width: 150 },
          { field: "name", headerName: "RESTAURANT NAME", width: 150, editable: true, sortable: true },
          { field: "email", headerName: "EMAIL ADDRESS", width: 150, editable: true, sortable: true  },
          { field: "smxp", headerName: "SMXP", width: 150, editable: true, sortable: true  },
          { field: "commission", headerName: "COMMISSION", width: 150, editable: true, sortable: true  },
          { field: "units", headerName: "UNITS", width: 150, editable: true, sortable: true  },
          { field: "deliveryMode", headerName: "DELIVERY MODE", width: 150,editable: true, sortable: true  },
          { field: "name1", headerName: "PRIMARY CONTACT", width: 150,editable: true, sortable: true  },
          { field: "email1", headerName: "PRIMARY EMAIL", width: 150,editable: true, sortable: true  },
          { field: "name2", headerName: "NAME 2", width: 150, editable: true, sortable: true  },
          { field: "email2", headerName: "EMAIL 2", width: 150, editable: true, sortable: true  },
          { field: "name3", headerName: "NAME 3", width: 150, editable: true, sortable: true  },
          { field: "email3", headerName: "EMAIL 3", width: 150, editable: true, sortable: true  },
          { field: "email4", headerName: "EMAIL 4", width: 150, editable: true, sortable: true  },
          { field: "notes", headerName: "NOTES", width: 150, editable: true, sortable: true  },
          { field: "businessName", headerName: "BUSINESS NAME", width: 150, editable: true, sortable: true  },
          { field: "region", headerName: "REGION", width: 150, editable: true, sortable: true  },
          { field: "offer", headerName: "OFFER", width: 150, editable: true, sortable: true  },
          { field: "poContact", headerName: "PO CONTACT", width: 150, editable: true, sortable: true  },
          { field: "poContantEmail", headerName: "PO CONTACT EMAIL", width: 150, editable: true, sortable: true  },
          { field: "additionalContacts", headerName: "ADD'L CONTACTS FOR PO'S", width: 150, editable: true, sortable: true  },
      ];

      const loadData = () => {
        const clients = localStorage.getItem('clientData');
          if (clients) {
              setColumns(columns);
              setRows(JSON.parse(clients));
              console.log("Saving team to localStorage: ", clients);
          } else {
            fetchData();
          }
        };
      
        const fetchData = async () => {
            const response = await fetch(sampleFile);
            const data = await response.arrayBuffer();
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          //  const headers = json[0];
            const dataRows = json.slice(1);
            
            const columns = [
            //  { field: "id", headerName: "ID", width: 150 },
              { field: "name", headerName: "RESTAURANT NAME", width: 150, editable: true, sortable: true },
              { field: "email", headerName: "EMAIL ADDRESS", width: 150, editable: true, sortable: true  },
              { field: "smxp", headerName: "SMXP", width: 150, editable: true, sortable: true  },
              { field: "commission", headerName: "COMMISSION", width: 150, editable: true, sortable: true  },
              { field: "units", headerName: "UNITS", width: 150, editable: true, sortable: true  },
              { field: "deliveryMode", headerName: "DELIVERY MODE", width: 150,editable: true, sortable: true  },
              { field: "name1", headerName: "PRIMARY CONTACT", width: 150,editable: true, sortable: true  },
              { field: "email1", headerName: "PRIMARY EMAIL", width: 150,editable: true, sortable: true  },
              { field: "name2", headerName: "NAME 2", width: 150, editable: true, sortable: true  },
              { field: "email2", headerName: "EMAIL 2", width: 150, editable: true, sortable: true  },
              { field: "name3", headerName: "NAME 3", width: 150, editable: true, sortable: true  },
              { field: "email3", headerName: "EMAIL 3", width: 150, editable: true, sortable: true  },
              { field: "email4", headerName: "EMAIL 4", width: 150, editable: true, sortable: true  },
              { field: "notes", headerName: "NOTES", width: 150, editable: true, sortable: true  },
              { field: "businessName", headerName: "BUSINESS NAME", width: 150, editable: true, sortable: true  },
              { field: "region", headerName: "REGION", width: 150, editable: true, sortable: true  },
              { field: "offer", headerName: "OFFER", width: 150, editable: true, sortable: true  },
              { field: "poContact", headerName: "PO CONTACT", width: 150, editable: true, sortable: true  },
              { field: "poContantEmail", headerName: "PO CONTACT EMAIL", width: 150, editable: true, sortable: true  },
              { field: "additionalContacts", headerName: "ADD'L CONTACTS FOR PO'S", width: 150, editable: true, sortable: true  },
          ];

            // Update the rows to use the field names matching your columns
          const rows = dataRows.map((row, index) => ({
            id: index + 1,
            name: row[0] || "", // Assuming "name" is in the first column (index 0)
            email: row[1] || "", // Assuming "email" is in the second column (index 1)
            smxp: row[2] || "", // Mapping for SMXP, assuming it's in the third column (index 2)
            commission: row[3] || "", // Map commission
            units: row[4] || "", // Map units, and so on...
            deliveryMode: row[5] || "",
            name1: row[6] || "",
            email1: row[7] || "",
            name2: row[8] || "",
            email2: row[9] || "",
            name3: row[10] || "",
            email3: row[11] || "",
            email4: row[12] || "",
            notes: row[13] || "",
            businessName: row[14] || "",
            region: row[15] || "",
            offer: row[16] || "",
            poContact: row[17] || "",
            poContactEmail: row[18] || "",
            additionalContacts: row[19] || "",
          }));

            setColumns(columns);
            setRows(rows);
            localStorage.setItem('clientData', JSON.stringify(rows));
            console.log("Saved clients to localStorage:", JSON.parse(localStorage.getItem('clientData')));
        };

        loadData();
        //fetchData();
    }, []);

    const handleRemoveRow = () => {
      console.log('Rows before deletion:', rows);
      console.log('Selected Rows to delete:', selectionModel);

      const updatedRows = rows.filter((row) => !selectionModel.includes(row.id)); // Remove selected rows
      console.log('Rows after deletion:', updatedRows);
      setRows(updatedRows); // Update state
      localStorage.setItem('clientData', JSON.stringify(updatedRows)); // Update localStorage
      setSelectionModel([]); // Reset selection
    };

      

    // Function to save rows to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('clientData', JSON.stringify(rows));
    console.log("Saved clients to localStorage:", JSON.parse(localStorage.getItem('clientData')));
  };

    const handleAddRow = () => {
      const id = Date.now();
  
      // Create a new row object with default values based on your current columns
      const newRow = columns.reduce((rowObj, col) => {
          rowObj[col.field] = ''; // Initialize each field with an empty string
          return rowObj;
      }, { id, isNew: true }); // Ensure to include id and isNew properties
  
      // Prepend the new row to the beginning of the array
      setRows((oldRows) => [
          newRow, // Add the new row
          ...oldRows,
      ]);
      setRowModesModel((oldModel) => ({
          ...oldModel,
          [id]: { mode: GridRowModes.Edit, fieldToFocus: columns[0].field }, // Focus on the first field
      }));
  };

    // Custom toolbar with Quick Filter on the left
    const CustomToolbar = () => {
      return (
        <Box display="flex" justifyContent="flex-start" p={1} gap={2} >
          <GridToolbarQuickFilter />
          <GridToolbarExport />
        </Box>
      );
    };

    const processRowUpdate = (newRow) => {
      const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
      localStorage.setItem('clientData', JSON.stringify(updatedRows));
      const clients = localStorage.getItem('clientData');
        if (clients) {
            setRows(JSON.parse(clients));
        }
      return newRow;
    };

    const handleClick = () => {
      const id = Date.now()
      
      // Create a new row object with default values based on your current columns
      const newRow = columns.reduce((rowObj, col) => {
        rowObj[col.field] = ''; // Initialize each field with an empty string
        return rowObj;
      }, { id, isNew: true }); // Ensure to include id and isNew properties

      setRows((oldRows) => [
        newRow, // Add the new row
        ...oldRows,
      ]);

      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: columns[0].field }, // Focus on the first field
      }));
    };


  return (
    <Box m="20px">
      <Box display = "flex" justifyContent="space-between" alignItems="center">
                <Header title = "Clients" subtitle="Manage the clients"/>

                
            </Box>
            <Box>
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
                            onClick={spsLogin}            
                        >                            
                            SPS LOGIN
                        </Button>
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
                            onClick={handleClick}
                      
                        >
                            <PersonAddIcon sx={{ mr: "10px", color: "white" }} />
                            Add Client
                        </Button>
                        <Button
                          className="button"
                          sx={{
                            backgroundColor: colors.redAccent[400],
                            color: "white",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            mr: 1,
                          }}
                          onClick={handleRemoveRow}
                          //disabled={selectionModel.length === 0} // Disable if no row is selected
                        >
                          Remove Client
                      </Button>                      
              </Box>
      <Box
        m="10px 0 0 0"
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          processRowUpdate={processRowUpdate} // Pass this function to handle row updates
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection);
            console.log('Selected Rows:', newSelection); // Check selected row IDs
          }}
          sortModel={sortModel} // Apply the sort model here
          onSortModelChange={(model) => setSortModel(model)} // Update the sort model if it changes
        />
      </Box>
    </Box>
  );
};

export default Clients;