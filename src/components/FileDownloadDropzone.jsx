import React, { useCallback } from 'react';
import { Typography, Box, useTheme } from "@mui/material";
import { useDropzone } from 'react-dropzone';
import { tokens } from "../theme";

const FileDownloadDropzone = () => {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Get theme colors

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    // Create a temporary download link for the file
    const downloadUrl = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = file.name; // Set the file name for the download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Revoke the URL after the download
    URL.revokeObjectURL(downloadUrl);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box 
      gridColumn="span 4"
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{ border: '2px dashed #cccccc', padding: '20px', display: "flex", flex:"1", borderRadius: "2%" }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      
          <Typography
            variant="h5"
            color={colors.blueAccent[300]}
            textAlign="center"
            paddingTop="30px"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            Drag & drop Purchase Order PDF here
          </Typography>
        
    
    </Box>
  );
};

export default FileDownloadDropzone;
