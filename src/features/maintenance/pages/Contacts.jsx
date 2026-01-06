import { Box  , useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import { mockDataContacts } from "../../../data/mockData";





const Contacts = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const columns = [
        {field: "id", headerName: "ID"},
        {field :"name",headerName:"Name",flex:1,cellClassName:"name-column--cell"},
        {field:"company",headerName:"Company",flex:1},
        // {field:"name",headername:"Company Name",flex:1},
        {field:"email",headerName:"Email",flex:1},
        {field:"phone",headerName:"Phone Number",flex:1},
        {field: "other", headerName: "Other Info",flex:1},
]
    return (
        <Box 
            mx="20px">
            {/* height= */}
            {/* <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="CONTACTS" subtitle="contacts of all companies"/>
            </Box> */}
            
            <Box 
                
                height={"75vh"}
                // m={"20px 0 0 0"}
                sx={{
                    
                    "& .MuiDataGrid-root": {
                    backgroundColor: "transparent !important",
                    border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },"& .MuiDataGrid-row": {
                        
                    },
                    
                    "& .MuiDataGrid-row:hover": {
                        backgroundColor:
                        theme.palette.mode === "dark"
                        ? `${colors.primary[400]} !important`
                        : `${colors.grey[900]} !important`,
                    },
                    "& .MuiDataGrid-columnHeader":{
                        backgroundColor: `${colors.blueAccent[700]} !important`,
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: `${colors.primary[400]} !important`,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: `${colors.blueAccent[700]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    }
                
                 }}>
                 
                <DataGrid
                    overflow={"auto"}
                    rows={mockDataContacts}
                    columns={columns}
                    
                    showToolbar
                    // components={{Toolbar: GridToolbar}}
                     
                    
                    
                />
            </Box>
            
        </Box>
    )

};

export default Contacts;