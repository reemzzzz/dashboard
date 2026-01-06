import { Avatar, Box , Button, IconButton, Typography , useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// useNavigate
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../data/mockData";
import { useNavigate } from "@tanstack/react-router";

const Team = ({user}) => {

    // 1. Initialize state: Use mockDataTeam only if localStorage is empty
    const [users, setUsers] = useState(() => { 
        const localUsers = localStorage.getItem("users");
        if (localUsers) {
            return JSON.parse(localUsers);
        }
        // If localStorage is empty, initialize with mockDataTeam and save it.
        // This ensures the initial data is present in both state and localStorage.
        localStorage.setItem("users", JSON.stringify(mockDataTeam));
        return mockDataTeam;
    });

    const handleRemoveUser = (email) => {
        // Filter out the user to be removed
        const updatedUsers = users.filter(u => u.email !== email);
        
        // 2. Update state (this causes a re-render)
        setUsers(updatedUsers);
        
        // 3. Update localStorage
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

 
    const navigate = useNavigate()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    // The columns configuration remains the same
    const columns = [
        { field: "id", headerName: "ID" },
        {field: "Photo",headerName:"",renderCell:({row})=>{
             // Use row.photo property if available, otherwise use default
            const photoSrc = row.photo ? row.photo : `assets/user2.png`;
            return(
                <Box
                    mt={1}
                    ml={5}
                >
                    <Avatar
                    alt="profile-user"
                    width="30px"
                    height="30px"
                    // Use the photo source from the row data
                    src={photoSrc} 
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                </Box>
            )
        }},
        { field: "name", headerName:"Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "profile", headerName: "Profile", flex: 1, renderCell: ({ row }) => {
            // Note: I'm using row.id here, assuming each user in 'users' has an ID
            return (
                
                    <Button
                        onClick={()=> navigate(`/profile/${row.id}`)}
                        sx={{
                            ml:5,
                            backgroundColor: colors.greenAccent[700],
                            ":hover": {
                                backgroundColor: colors.greenAccent[600]
                            }
                        }}
                    >
                        View
                    </Button>
                    
            )
        }},
        {field: "remove",headerName:"Remove Engineer",flex:1,renderCell:({row}) => {
            return (
                <Button 
                    onClick={()=> handleRemoveUser(row.email)
                    }
                     sx={{
                        ml: 5,
                     color: colors.grey[300],
                     "&:hover": { color: colors.redAccent[500]},
                    }}
                >
                    Remove
                </Button>
            )
        }}
    ]


    return (
    <Box mx={"20px"}>
        
        <Box
            height={"75vh"}

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
                }
             
            }}
        >
            <DataGrid
                overflow = {"auto"}
                rows={mockDataTeam} 
                columns={columns}
    
                showToolbar
            />
        </Box>
    </Box>);
};

export default Team;