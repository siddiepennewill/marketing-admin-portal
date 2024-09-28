import { Box, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import MyDropzone from "../../components/Dropzone";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";

const Email = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    return (
        <Box m ="20px">
            <Box display = "flex" justifyContent="space-between" alignItems="center">
                <Header title = "Review Email" subtitle="Double check the spreadsheet and PO attached"/>
            </Box>
            <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": { undefined : "span 4" },
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Recipient(s)"
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email Message"
                        sx={{ gridColumn: "span 4" }}
                    />        
                </Box>
            
        </Box>
    )
}

export default Email;