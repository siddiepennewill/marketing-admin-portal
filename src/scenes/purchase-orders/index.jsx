import { Box, Button, IconButton, Typography, useTheme, TextField } from "@mui/material";
import { tokens } from "../../theme.js";
import Header from "../../components/Header.jsx";
import MyDropzone from "../../components/Dropzone.jsx";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import FileDownloadDropzone from "../../components/FileDownloadDropzone.jsx";

const PurchaseOrder = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate(); 
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [ship_to_name, setShipToNames] = useState([]);
    const [delivery_dates, setDeliveryDates] = useState([]);
    const [units, setUnits] = useState([]);
    const [file, setFile] = useState(null); // State for the file
    const [filePreview, setFilePreview] = useState(null); // ADDED
    const [fileName, setFileName] = useState(""); // New state to hold file name

    useEffect(() => {
        console.log("Ship to names:", ship_to_name);
    }, [ship_to_name]);
    
    useEffect(() => {
        console.log("Delivery dates:", delivery_dates);
    }, [delivery_dates]);
    
    useEffect(() => {
        console.log("Units:", units);
    }, [units]);

    useEffect(() => {
        // Cleanup function to revoke the object URL
        return () => {
            if (filePreview) {
                URL.revokeObjectURL(filePreview);
            }
        };
    }, [filePreview]);
    

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: useCallback(acceptedFiles => {
          console.log(acceptedFiles);

          // Reset states before processing the new file
          setShipToNames([]);
          setDeliveryDates([]);
          setUnits([]);

          const file = acceptedFiles[0];
            setFile(file);
            setFileName(file.name);
            setFilePreview(URL.createObjectURL(file)); // Generate URL for the file
          
          const formData = new FormData();
          formData.append('file', file);
    
          fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
          })
            .then(response => response.json())
            .then(data => {
              if (data.message === 'File processed successfully') {
                console.log("WORKED");
                setShipToNames(data.ship_to_name || []);
                setDeliveryDates(data.delivery_dates || []); // Ensure the correct key
                setUnits(data.units || []);
              } else {
                console.log('File upload failed');
              }
            })
            .catch(error => {
              console.error('Error uploading file:', error);
            });
        }, [])
      });
    
    // Fetch clients from local storage
    useEffect(() => {
        const storedClients = JSON.parse(localStorage.getItem('clientData'));
        if (storedClients) {
            console.log("Clients loaded from localStorage:", storedClients);
        } else {
            console.log("No clients found in localStorage.");
        }
    }, []);

    const handleDragStart = (e) => {
        // If the file object is not null, set it to the dataTransfer object
        if (file) {
            e.dataTransfer.setData('application/x-files', file); // Custom MIME type
            e.dataTransfer.effectAllowed = 'copy'; // Specify that we want to copy the data
        }
    };

    const clients = JSON.parse(localStorage.getItem('clientData')) || [];


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        const client = clients.find(client => client.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setSelectedClient(client);
    };

    const spsLogin = () =>{ 
        window.open('https://auth.spscommerce.com/login?state=hKFo2SBrc0ZTSlJzX1duOE53U2hRTDBURUpxZHVnZGFhemE2VqFupWxvZ2luo3RpZNkgaFZDM3NCakNzLWR6dUx4TXktaW1obHR6dXdPcmtkbUmjY2lk2SBYZ1ZpWmV2VE1ORklpb1VsZjhWeUNXQURpc2oxYzZ4Tg&client=XgViZevTMNFIioUlf8VyCWADisj1c6xN&protocol=oauth2&response_type=token&scope=openid%20profile%20email&audience=api%3A%2F%2Fapi.spscommerce.com%2F&redirect_uri=https%3A%2F%2Fcommerce.spscommerce.com%2Fauth0%2Fcallback&auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4yMC4wIn0%3D', '_blank');
      };

    const handleClick = () =>{ 
        // Check if a file has been uploaded
        if (ship_to_name.length === 0 || delivery_dates.length === 0 || units.length === 0) {
            alert("Please upload a file before generating the email.");
            return; // Exit the function if no file has been uploaded
        }

       // navigate("/email");
       if (selectedClient) {
            if (selectedClient.email1 !== "") {
                const recipient =selectedClient.email1;

                let ccEmails = "";
                if (selectedClient.email2 !== "" && selectedClient.email3 !== "" && selectedClient.email4 !== "") {
                    ccEmails = selectedClient.email2 +","+selectedClient.email3 +","+selectedClient.email4;
                } else if (selectedClient.email2 !== "" && selectedClient.email3 !== "") {
                    ccEmails = selectedClient.email2 +","+selectedClient.email3;
                } else if (selectedClient.email2 !== "") {
                    ccEmails = selectedClient.email2;
                } 

                let name = '';
                if (selectedClient.name1 !== "") {
                    name = selectedClient.name1.split(' ')[0];
                }
         
                const formatDate = (dateStr) => {
                    const [month, day, year] = dateStr.split('/');
                    return `${month}/${day}`;
                  };
                  
                  const formatShipToName = (name) => {
                    const parts = name.split(' ');
                    // Join parts starting from the second word
                    return parts.slice(1).join(' ');
                  };

                  const totalUnits = units.slice(1).reduce((sum, current) => sum + current, 0);

                  // Function to capitalize the first letter of a string
        const capitalizeFirstLetter = (str) => {
            if (str.length === 0) return '';
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };

        // Extract the first word
        const firstWord = ship_to_name[1].split(' ')[0]; // "COSTCO"

        // Capitalize only the first letter
        const formattedStore = capitalizeFirstLetter(firstWord); // "Costco"

       let subject = encodeURIComponent("New Costco Orders");
       if (ship_to_name.length <= 2) {
            subject = encodeURIComponent("New Costco Order");
       }

       const body = encodeURIComponent(
        `${name ? name : 'Hello'},
        
New ${formattedStore} order(s) are attached - ${totalUnits} total units.
      
${ship_to_name.slice(1).map((name, index) => {
        const formattedName = formatShipToName(name);
        const formattedDate = formatDate(delivery_dates[index + 1] || '');
        const unitsCount = units[index + 1] || 0;
        return `${formattedName} - ${unitsCount} units - Due ${formattedDate}`;
      }).join('\n')}
      
Thank you,`
      );

// Reset states after generating email
setShipToNames([]);
setDeliveryDates([]);
setUnits([]);
console.log(ship_to_name);

    let mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

    if (ccEmails != "") {
       mailtoLink = `mailto:${recipient}?cc=${ccEmails}&subject=${subject}&body=${body}`;
    } 

    
    // Open the email client (Outlook or default email app) with pre-filled data
    window.location.href = mailtoLink;

            } else {
                alert("No Primary Email associated.");
            }
       } else {
        alert("No client selected. Please select a client first.");
       }
    }

    const handleFileDownload = () => {
        if (fileName === "") {
            alert("Please upload a file to download Excel file.");
            return; // Exit the function if no file has been uploaded
        }

        fetch('http://localhost:5000/download', {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error downloading file');
            }
            return response.blob();  // Get the file as a Blob
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'COSTCO POs.xlsx';  // Name of the file to be downloaded
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handDeliveryDownload = () => {
        if (fileName === "") {
            alert("Please upload a file to download Hand Delivery Form.");
            return; // Exit the function if no file has been uploaded
        }

        fetch('http://localhost:5000/generate-docx', {
            method: 'POST',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error downloading file');
            }
            return response.blob();  // Get the file as a Blob
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Hand-Delivery-Form.docx';  // Name of the file to be downloaded
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    
    return (
        <Box m ="20px">
            <Box display = "flex" justifyContent="space-between" alignItems="center">
                <Header title = "Purchase Orders" subtitle="Uploads raw Numbers file and purchase order below to generate email"/>
            </Box>

            {/** Search Bar */}
            <Box mb={3} display="flex" alignItems="center" justifyContent="space-between">
                <TextField 
                    label="Search Client" 
                    variant="outlined" 
                    value={searchQuery} 
                    onChange={handleSearch}
                    sx={{ flex: 2, marginRight: '10px' }}
                />
                <Button
                            className="button"
                            sx={{
                                backgroundColor: colors.greenAccent[400],
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",     
                                flexShrink: 0,  // Ensures the button does not shrink                   
                            }}   
                            onClick={spsLogin}            
                        >                            
                            SPS LOGIN
                        </Button>
                
            </Box>

            {/** Display Client Info Below Search Bar */}
            {selectedClient && (
                <Box mb={3}>
                    <Typography variant="h4" color={colors.blueAccent[300]} sx={{ fontWeight: "bold" }}>{selectedClient.name}</Typography>
                   
                    <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                        Email: <span style={{ fontWeight: "normal" }}>{selectedClient.email}</span>
                    </Typography>

                    <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                        SMXP: <span style={{ fontWeight: "normal" }}>{selectedClient.smxp}</span>
                    </Typography>
                </Box>
            )}



            {/** GRID AND CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(10, 1fr)"
                gridAutoRows="140px"
                gap="10px"
            >

<Box 
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ border: '2px dashed #cccccc', padding: '20px', display: "flex", flex:"1", borderRadius: "2%"}}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {
            isDragActive ?
              <Typography
                variant="h5"
                color={colors.blueAccent[300]}
                textAlign="center"
                paddingTop="30px"
                overflow="hidden"
              >
                Drop the files here ...
              </Typography> 
             : fileName ? 
                <Typography
                    variant="h5"
                    color={colors.blueAccent[300]}
                    textAlign="center"
                    paddingTop="30px"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                >
                    "{fileName}" is selected
                </Typography> :
              <Typography
                variant="h5"
                color={colors.blueAccent[300]}
                textAlign="center"
                paddingTop="30px"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                Drag & drop raw Numbers file here
              </Typography>
          }
        </Box>

{/* New dropzone for automatic file download */}
<FileDownloadDropzone /> {/* This is your new, separate dropzone */}
                    

                    {/** ROW 2 */}
                    <Box 
                        display="flex" 
                      //  justifyContent="center" 
                      justifyContent="space-between"
                        alignItems="center"
                        gridColumn="span 6"
                        gridRow="span 1"
                        mt="10px"
                    >
                        <Button
                            className="button"
                            sx={{
                                backgroundColor: colors.greenAccent[400],
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                marginRight: "10px" // Reduce this value to bring the buttons closer
                            }}
                            onClick={handleClick}
                        >
                            <EmailIcon sx={{ mr: "10px", color: "white" }} />
                            Generate Email in Outlook
                        </Button>

                        <Button
                            className="button"
                            sx={{
                                backgroundColor: colors.greenAccent[400],
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                marginRight: "10px" // Reduce this value to bring the buttons closer
                            }}
                            onClick={handleFileDownload}
                        >
                            <DownloadOutlinedIcon sx={{ mr: "10px", color: "white" }} />
                            Download Excel Spreadsheet
                        </Button>

                        <Button
                            className="button"
                            sx={{
                                backgroundColor: colors.greenAccent[400],
                                color: "white",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                            }}
                            onClick={handDeliveryDownload}
                        >
                            <DownloadOutlinedIcon sx={{ mr: "10px", color: "white" }} />
                            Download Hand Delivery Form
                        </Button>
                        
                    </Box>
                    
                
            </Box>
        </Box>
    )
}

export default PurchaseOrder;