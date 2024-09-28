import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../theme";

const ClientInfoBox = ({ title, subtitle}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box width = "100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{color: colors.grey[100]}}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        variant="h4"
                        fontStyle="italic"
                        sx={{color: colors.greenAccent[600]}}
                    >
                        {title}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ClientInfoBox;