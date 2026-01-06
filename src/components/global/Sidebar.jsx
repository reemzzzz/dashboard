import { useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {Avatar, Box,IconButton,Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"; 
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined"; 
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"; 
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined"; 
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined"; 
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AutoStoriesIcon from '@mui/icons-material/AutoStories'; 
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { Link } from "@tanstack/react-router";
import { useAuth } from "../../contexts/authContext";

 
const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleSelect = () => {
        setSelected(title);
        localStorage.setItem("selectedPage", title); 
    };
    return (  
        
        
        <Link to={to} style={{ textDecoration: "none", color: "inherit"}}>
            <MenuItem 
                active={selected === title}
                style={{color: colors.grey[100]}}
                onClick={handleSelect}
                icon={icon}
                
                >
                <Typography variant="h7">{title}</Typography>
                

            </MenuItem>
        </Link>
    )
}
const SideBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed,setIsCollapsed] = useState(false);
    const selectedPage = localStorage.getItem("selectedPage") || "Dashboard"
    const [selected,setSelected] = useState(selectedPage);
    localStorage.setItem("selectedPage",selectedPage);
    const { user } = useAuth();
   const baseUrl = `department/$departmentId`;
  
    const nameArray = user?.name;
    
    return (
        <Box 
            sx={{
                "& .ps-sidebar-container": {
                background: "inherit !important"
                },
                "& .ps-sidebar-root": {
                background: `${colors.primary[400]} !important`,
                },
                "& .ps-menu-button": {
                    fontSize: "13px !important",    
                    maxHeight: "42px !important",    
                    lineHeight: "1.2",
                    padding: "0px 35px 0px 20px !important", 
                },
                "& .ps-menu-button:hover": {
                color: `${colors.blueAccent[700]} !important`, 
                backgroundColor:`${colors.primary[400]} !important`,
                },
                "& .ps-menu-button.ps-active": {
                // color: "#6870fa !important", 
                color: `${colors.blueAccent[600]} !important`, 
                },
                "& .ps-menu-icon": {
                backgroundColor: "transparent !important",
                },
                "& .MuiBox-root":{
                    // height: "auto"
                    // ,bottom: 0
                }
                // backgroundColor: colors.redAccent[500]
                
            }}
        >
            <Sidebar collapsed={isCollapsed}
            className="h-dvh min-h-full !bottom-0"
                rootStyles={{
                     top: 0,
                }}
                >
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 10px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box 
                            display= "flex" 
                            justifyContent="space-between" 
                            alignItems="center" 
                            // ml="15px"
                            >
                                <Box display="flex" justifyContent={"flex-start"} gap={"10px"}>
                                    <Avatar alt="El Safwa" src="../../assets/logo-icon.png" />

                                    <Typography variant="h5" color={colors.grey[100]} mt={"10px"} >
                                         ELSAFWA 
                                    </Typography>

                                </Box>
                                <IconButton onClick={()=>setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}  
                    </MenuItem>

                    {/* USER */}
                    {!isCollapsed && (
                        <Box mb = "15px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Avatar
                                    alt={user?.name || "User Profile"}
                                    src={user?.photo || "../../assets/user2.png"} // Changed to root-relative path for better compatibility
                                    sx={{
                                        width: "120px",
                                        height: "120px",
                                        borderRadius: "50%",
                                        bgcolor: colors.primary[300],                                         
                                        fontSize: "40px",                                         
                                        color: colors.grey[200], 
                                    }}
                                >
                                    {user?.name}
                                </Avatar>
                               
                            </Box>
                            <Box>
                                <Typography 
                                    variant="h5" 
                                    color={colors.grey[100]} 
                                    textAlign="center" 
                                    fontWeight="bold" 
                                    sx={{m:"10px 0 5px 0"}}
                                    >
                                        Eng. {user?nameArray:""}
                                </Typography>
                                <Typography
                                    variant="h6" 
                                    color={colors.greenAccent[500]}
                                    textAlign="center"
                                    
                                >
                                    {user?.role}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    {/* MENU ITEMS */}
                    <Box  mb="0px" py="1px">
                        
                        <Item 
                            title="Dashboard"
                            to={`/`}
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        
                        <Item 
                            title="Manage Team"
                            to={`/${baseUrl}/team`}
                            icon={<PeopleAltOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="Contacts Info"
                            to={`/${baseUrl}/contacts`}
                            icon={<ContactsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="Monthly Reports"
                            to={`/${baseUrl}/reports`}
                            icon={<SummarizeIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="Calendar"
                            to={`/${baseUrl}/calendar`}
                            icon={<CalendarTodayOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="My Current Devices"
                            to={`/${baseUrl}/devices`}
                            icon={<ManageAccountsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="Bar Chart"
                            to={`/${baseUrl}/bar`}
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="Pie Chart"
                            to={`/${baseUrl}/pie`}
                            icon={<PieChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                       <Item 
                            title="Manuals"
                            to={`/${baseUrl}/manuals`}
                            icon={<AutoStoriesIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="Spare Parts"
                            to={`/${baseUrl}/spare-parts`}
                            icon={<SettingsSuggestIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                       
                    </Box>

                </Menu>
            </Sidebar>
        </Box>
    );
};

export default SideBar;