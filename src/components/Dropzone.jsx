import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import "../index.css";

const MyDropzone = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('temp');
  const [uploadStatus, setUploadStatus] = useState('');
  const [ship_to_name, setShipToNames] = useState([]); // State to hold ship_to_name data
  const [deliveryDates, setDeliveryDates] = useState([]); // State to hold ship_to_name data
  const [units, setUnits] = useState([]); // State to hold ship_to_name data


  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles);
    setIsFileUploaded(true);
    setFileName(acceptedFiles[0].name);
    console.log(acceptedFiles[0].name);

    // Create FormData to send the file to the backend
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    // Send the file to the Python backend
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'CSV file processed successfully') {
          console.log("WORKED");
          setUploadStatus('File uploaded and processed successfully');
          setShipToNames(data.ship_to_name || []);
          setDeliveryDates(data.deliveryDates || []);
          setUnits(data.units || []);
        } else {
          setUploadStatus('File upload failed');
        }
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        setUploadStatus('File upload failed');
      });
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <Box {...getRootProps()} 
        display="flex"
        flex="1"
        textAlign="center" 
        height="100%"
        width = "100%"
    >
      <input {...getInputProps()} />
      {
        isFileUploaded ?
            <Typography 
                variant="h5" 
                color={colors.blueAccent[300]}
                textAlign="center"
                paddingTop="30px"
                //boxSizing="border-box" // Ensure padding is included in width/height
                overflow="hidden" // Hide any overflow text
            >
                {fileName + " uploaded successfully"}
            </Typography> :
            <Typography 
                variant="h5" 
                color={colors.blueAccent[300]} 
                textAlign="center"
                paddingTop="30px"
                overflow="hidden" // Hide overflow text
                textOverflow="ellipsis" // Add ellipsis for overflowing text
                whiteSpace="nowrap" // Prevent text from wrapping
            >
                {subtitle}
            </Typography>
      }
    </Box>
  );
};

export default MyDropzone;