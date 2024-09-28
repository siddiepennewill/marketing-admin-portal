import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

const SearchToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarQuickFilter />
    {/* Add other toolbar components if needed */}
    <GridToolbarExport />
  </GridToolbarContainer>
);

export default SearchToolbar;