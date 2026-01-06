import { Avatar, Badge, Box, ClickAwayListener, Divider, Fade, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Popper, SwipeableDrawer, Typography, useTheme } from "@mui/material";
import { use, useContext, useEffect, useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"; 
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation, useParams , Link as RouterLink } from "@tanstack/react-router";
import { ColorModeContext, tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../../contexts/authContext";
// Menu
// MenuItem
// Avatar
// useParams
// SwipeableDrawer
const Topbar = ({onLogout , mobileScreen}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [currentMode,setCurrentMode] = useState(theme.palette.mode); 
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const {user} = useAuth();

  const [anchorNotifications, setAnchorNotifications] = useState(null);
  const navigate = useNavigate();    
  const { departmentId } = useParams({ strict:false })



  const openNotifications = Boolean(anchorNotifications);
  const location = useLocation();
  const isSignUpForm = location.pathname.includes("/form");
    
  const notifications = [
  { id: 1, message: "New engineer registered", time: "2 min ago", unread: true },
  { id: 2, message: "New device added to the system", time: "1 hour ago", unread: true },
  { id: 3, message: "Monthly report generated", time: "Yesterday", unread: false },
  { id: 4, message: "Spare parts inventory updated", time: "2 days ago", unread: false },
  { id: 5, message: "System maintenance completed", time: "3 days ago", unread: false },
];

  
  const NotificationsPopper = () => {
  return (
    <Popper
      open={openNotifications}
      anchorEl={anchorNotifications}
      placement="bottom-end"
      transition
      sx={{ zIndex: 1400 }}
      onClick={()=>{
        setAnchorEl(null)
        setMobileDrawerOpen(false)
      }

      }
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={200}>
          <Box
             sx={{
                width: 340,
                bgcolor: theme.palette.mode === "dark" ? "oklch(37.2% 0.044 257.287)" : "#ffffff", // distinct surface color
                borderRadius: "14px",
                boxShadow: theme.shadows[8], // lifts the popper
                overflow: "hidden",
                border: `1px solid ${theme.palette.mode === "dark" ? "#2c2c3d" : "#e0e0e0"}`,
              }}
          >
            {/* Header */}
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: `2px solid ${colors.blueAccent[700]}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography fontWeight={700} fontSize="0.95rem">
                  Notifications
                </Typography>
              </Box>
            </Box>

            {/* List */}
            <List
              disablePadding
              sx={{
                maxHeight: 320,
                overflowY: "auto",
              }}
            >
              {notifications.length === 0 && (
                <Typography
                  align="center"
                  fontSize="0.85rem"
                  color={colors.grey[400]}
                  py={3}
                >
                  No new notifications
                </Typography>
              )}

              {notifications.map((n) => (
                <ListItem
                  key={n.id}
                  alignItems="flex-start"
                  sx={{
                    px: 2,
                    py: 1.3,
                    gap: 1.5,
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === "dark"? `${colors.blueAccent[400]}25`: `${colors.blueAccent[900]}95`,
                    },
                  }}
                >
                  {/* Unread Dot */}
                  <Box
                    sx={{
                      mt: 0.8,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: n.unread
                        ? colors.blueAccent[500]
                        : "transparent",
                      flexShrink: 0,
                    }}
                  />

                  {/* Content */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      fontSize="0.85rem"
                      fontWeight={n.unread ? 600 : 400}
                      color={colors.grey[100]}
                      lineHeight={1.3}
                    >
                      {n.message}
                    </Typography>
                    <Typography
                      fontSize="0.7rem"
                      color={colors.grey[200]}
                      mt={0.3}
                    >
                      {n.time}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>

            {/* Footer */}
            <Box
              sx={{
                px: 2,
                py: 1,
                borderTop: `2px solid ${colors.blueAccent[700]}`,
                textAlign: "center",
                backgroundColor: theme.palette.mode === "dark"?`${colors.blueAccent[900]}75` : colors.blueAccent[900]
              }}
            >
              <Typography
                fontSize="0.75rem"
                fontWeight={600}
                color={colors.blueAccent[400]}
                sx={{ cursor: "pointer" }}
              >
                View all notifications
              </Typography>
            </Box>
          </Box>
        </Fade>
      )}
    </Popper>
  );
};

  
    useEffect(() => {
        localStorage.setItem("themeMode",currentMode);
    },[currentMode])

    useEffect(() => {
        const savedMode = localStorage.getItem("themeMode");
        setCurrentMode(savedMode);
    }, []);

    const handleThemeToggle = () => {
        colorMode.toggleColorMode(); 
        setCurrentMode(prev => (prev === "light" ? "dark" : "light")); 
    };

    const handleNavigation = (path) => {
        navigate({ to: path, params: { departmentId } });
        setMobileDrawerOpen(false);
    };



    const handleNotificationClick = (event) => {
        setAnchorNotifications(anchorNotifications ? null : event.currentTarget)
        // setAnchorEl(null);
        setMobileDrawerOpen(false);
        setAnchorEl(null)
        // setAnchorNotifications(event.currentTarget)
    }




    const handleClickAway = () => {
        setAnchorNotifications(null);
        setAnchorEl(null);
        setMobileDrawerOpen(false);
  };

    
    return (
    <ClickAwayListener onClickAway={handleClickAway}>
        {!mobileScreen?
        (<Box className="flex justify-end pt-5 pr-4"
         >
           
         
            {/* ICONS */}
            <Box 
            className="flex rounded-3xl px-3 py-1 gap-1" 

            sx={{
                 backgroundColor: `${colors.primary[400]}95`, 
                 borderRadius: '50px', 
                 backdropFilter: 'blur(8px)',
                 border: `1px solid ${colors.primary[300]}95`
            }}>
            <IconButton onClick={handleThemeToggle}>
                    {theme.palette.mode === "dark"? (
                    <DarkModeOutlinedIcon />
                    ) : ( 
                        <LightModeOutlinedIcon /> 
                    ) }
            </IconButton>
            {/* {NOTIFICATIONS ICON} */}
                <IconButton  onClick={handleNotificationClick}  >
                    <Badge badgeContent={notifications.length} sx={{
                    '& .MuiBadge-badge': {
                        backgroundColor: colors.redAccent[500],
                        color: 'white', 
                    },}}>
                        <NotificationsOutlinedIcon />
                    </Badge>
                </IconButton>

                <NotificationsPopper />
                
                
                {/* <IconButton>
                  {isSignUpForm? 
                  <HomeOutlinedIcon 
                    onClick={()=> navigate({
                      to: "/department/$departmentId/",
                      params: {departmentId},
                  })}/>
                : <PersonAddAltIcon 
                    onClick={()=> navigate({
                      to: "/department/$departmentId/form",
                      params: {departmentId},
                  })}
                  />
                }
                </IconButton> */}

                 <IconButton 
                onClick={()=> {setMobileDrawerOpen(true);}}
                >
                    <PersonOutlinedIcon />
                </IconButton> 
                <SwipeableDrawer
                    anchor="right"
                    open={mobileDrawerOpen}
                    onClose={() => setMobileDrawerOpen(false)}
                    onOpen={() =>{ 
                      setMobileDrawerOpen(true);
                      setAnchorNotifications(null);
                      setAnchorEl(null)
                    }}
                    disableBackdropTransition={false}
                    PaperProps={{
                        sx: { 
                            width: '85%', 
                            maxWidth: '320px',
                            backgroundColor: colors.primary[400], 
                            backgroundImage: 'none',
                            borderRadius: '20px 0 0 20px'
                        }
                    }}
                >
                    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box display="flex" justifyContent="flex-end">
                            <IconButton onClick={() => setMobileDrawerOpen(false)} sx={{ backgroundColor: `${colors.primary[300]}55` }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {/* User Profile Info Section */}
                        <Box display="flex" flexDirection="column" alignItems="center" my={4}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#44b700',
                                        color: '#44b700',
                                        boxShadow: `0 0 0 2px ${colors.primary[400]}`,
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                    }
                                }}
                            >
                                <Avatar 
                                    src={user?.photo} 
                                    sx={{ width: 85, height: 85, border: `3px solid ${colors.blueAccent[500]}`, boxShadow: theme.shadows[10] }}
                                />
                            </Badge>
                            <Typography variant="h5" fontWeight="800" color={colors.grey[100]} sx={{ mt: 2 }}>
                                {user?.name || "Member"}
                            </Typography>
                            <Typography variant="body2" color={colors.blueAccent[400]} fontWeight="600" sx={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {user?.role || "Team Member"}
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 2, borderColor: `${colors.grey[700]}55` }} />

                        {/* Mobile Navigation List */}
                        <List sx={{ flexGrow: 1 }}>
                            <ListItem disablePadding sx={{ mb: 1 }}>
                                <ListItemButton 
                                    onClick={() => handleNavigation("/department/$departmentId/profile")}
                                    sx={{ borderRadius: '12px', py: 1.5 }}
                                >
                                    <ListItemIcon sx={{ minWidth: 45 }}><PersonOutlinedIcon color="secondary" /></ListItemIcon>
                                    <ListItemText primary="My Profile"  primaryTypographyProps={{ fontWeight: 600 }} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding sx={{ mb: 1 }}>
                                <ListItemButton 
                                    onClick={() => handleNavigation(isSignUpForm ? "/department/$departmentId" : "/department/$departmentId/form")}
                                    sx={{ borderRadius: '12px', py: 1.5 }}
                                >
                                    <ListItemIcon sx={{ minWidth: 45 }}>
                                        {isSignUpForm ? <HomeOutlinedIcon color="secondary" /> : <PersonAddAltIcon color="secondary" />}
                                    </ListItemIcon>
                                    <ListItemText primary={isSignUpForm ? "Return to Dashboard" : "Register Engineer"} 
                                    primaryTypographyProps={{ fontWeight: 600 }} />
                                </ListItemButton>
                            </ListItem>
                        </List>

                        {/* Bottom Actions */}
                        <Box sx={{ mt: 'auto', mb: 2 }}>
                            <Divider sx={{ mb: 2, borderColor: `${colors.grey[700]}55` }} />
                            <ListItemButton 
                                onClick={onLogout}
                                sx={{ 
                                    borderRadius: '12px', 
                                    py: 1.5,
                                    backgroundColor: `${theme.palette.error.main}11`,
                                    '&:hover': { backgroundColor: `${theme.palette.error.main}22` }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 45 }}><LogoutIcon sx={{ color: theme.palette.error.main }} /></ListItemIcon>
                                <ListItemText primary="Sign Out" primaryTypographyProps={{ color: theme.palette.error.main, fontWeight: 700 }} />
                            </ListItemButton>
                        </Box>
                    </Box>
                </SwipeableDrawer>

                
                
                {/* <IconButton 
                onClick={()=> navigate({
                    to: "/department/$departmentId/profile",
                    params: {departmentId},
                })}
                >
                    <PersonOutlinedIcon />
                </IconButton>  */}



                <IconButton onClick={onLogout}>
                  <LogoutIcon sx={{color: theme.palette.error.main}}/>
                </IconButton>
            </Box>
        </Box>)
        :
        (
          <Box className="sticky top-0 z-100 mb-3 ">
            <Box
              className={` flex justify-between py-3 px-7 items-center rounded-b-3xl border-b-3
              
                ${theme.palette.mode === "dark"?"border-b-indigo-600":"border-b-gray-300"}`}
              sx={{
                backgroundColor: colors.primary[400],
                // borderBottom: 
              }}
            >
              {/* LEFT: Logo + Title */}
              <Box display="flex" alignItems="center" gap={1.5}>
                <Avatar
                  alt="El Safwa"
                  src="../../assets/logo-icon.png"
                  sx={{
                    width: 40,
                    height: 40,
                    // border: `2px solid ${colors.primary[300]}`,
                  }}
                />
              </Box>

              <Box>
                  <IconButton onClick={handleThemeToggle}>
                    {theme.palette.mode === "dark"? 
                    <DarkModeOutlinedIcon />:<LightModeOutlinedIcon />  }
            </IconButton>
            {/* {NOTIFICATIONS ICON} */}
                <IconButton  onClick={handleNotificationClick}  >
                    <Badge badgeContent={notifications.length} sx={{
                    '& .MuiBadge-badge': {
                        backgroundColor: colors.redAccent[500],
                        color: 'white', 
                    },}}>
                        <NotificationsOutlinedIcon />
                    </Badge>
                </IconButton>

                <NotificationsPopper />
                

                
                
                <IconButton 
                onClick={()=> navigate({
                    to: "/department/$departmentId/profile",
                    params: {departmentId},
                })}
                >
                    <PersonOutlinedIcon />
                </IconButton> 
                <SwipeableDrawer
                    anchor="right"
                    open={mobileDrawerOpen}
                    onClose={() => setMobileDrawerOpen(false)}
                    onOpen={() =>{ 
                      setMobileDrawerOpen(true);
                      setAnchorNotifications(null);
                      setAnchorEl(null)
                    }}
                    disableBackdropTransition={false}
                    PaperProps={{
                        sx: { 
                            width: '85%', 
                            maxWidth: '320px',
                            backgroundColor: colors.primary[400], 
                            backgroundImage: 'none',
                            borderRadius: '20px 0 0 20px'
                        }
                    }}
                >
                    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box display="flex" justifyContent="flex-end">
                            <IconButton onClick={() => setMobileDrawerOpen(false)} sx={{ backgroundColor: `${colors.primary[300]}55` }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {/* User Profile Info Section */}
                        <Box display="flex" flexDirection="column" alignItems="center" my={4}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#44b700',
                                        color: '#44b700',
                                        boxShadow: `0 0 0 2px ${colors.primary[400]}`,
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                    }
                                }}
                            >
                                <Avatar 
                                    src={user?.photo} 
                                    sx={{ width: 85, height: 85, border: `3px solid ${colors.blueAccent[500]}`, boxShadow: theme.shadows[10] }}
                                />
                            </Badge>
                            <Typography variant="h5" fontWeight="800" color={colors.grey[100]} sx={{ mt: 2 }}>
                                {user?.name || "Member"}
                            </Typography>
                            <Typography variant="body2" color={colors.blueAccent[400]} fontWeight="600" sx={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {user?.role || "Team Member"}
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 2, borderColor: `${colors.grey[700]}55` }} />

                        {/* Mobile Navigation List */}
                        <List sx={{ flexGrow: 1 }}>
                            <ListItem disablePadding sx={{ mb: 1 }}>
                                <ListItemButton 
                                    onClick={() => handleNavigation("/department/$departmentId/profile")}
                                    sx={{ borderRadius: '12px', py: 1.5 }}
                                >
                                    <ListItemIcon sx={{ minWidth: 45 }}><PersonOutlinedIcon color="secondary" /></ListItemIcon>
                                    <ListItemText primary="My Profile"  primaryTypographyProps={{ fontWeight: 600 }} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding sx={{ mb: 1 }}>
                                <ListItemButton 
                                    onClick={() => handleNavigation(isSignUpForm ? "/department/$departmentId" : "/department/$departmentId/form")}
                                    sx={{ borderRadius: '12px', py: 1.5 }}
                                >
                                    <ListItemIcon sx={{ minWidth: 45 }}>
                                        {isSignUpForm ? <HomeOutlinedIcon color="secondary" /> : <PersonAddAltIcon color="secondary" />}
                                    </ListItemIcon>
                                    <ListItemText primary={isSignUpForm ? "Return to Dashboard" : "Register Engineer"} 
                                    primaryTypographyProps={{ fontWeight: 600 }} />
                                </ListItemButton>
                            </ListItem>
                        </List>

                        {/* Bottom Actions */}
                        <Box sx={{ mt: 'auto', mb: 2 }}>
                            <Divider sx={{ mb: 2, borderColor: `${colors.grey[700]}55` }} />
                            <ListItemButton 
                                onClick={onLogout}
                                sx={{ 
                                    borderRadius: '12px', 
                                    py: 1.5,
                                    backgroundColor: `${theme.palette.error.main}11`,
                                    '&:hover': { backgroundColor: `${theme.palette.error.main}22` }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 45 }}><LogoutIcon sx={{ color: theme.palette.error.main }} /></ListItemIcon>
                                <ListItemText primary="Sign Out" primaryTypographyProps={{ color: theme.palette.error.main, fontWeight: 700 }} />
                            </ListItemButton>
                        </Box>
                    </Box>
                </SwipeableDrawer>
              </Box>



              {/* RIGHT: Menu Button */}
              <IconButton
                onClick={(e) =>{ 
                  setAnchorEl(e.currentTarget)
                  setAnchorNotifications(null)
                  setMobileDrawerOpen(false)
                  
                }}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark"?
                    `${colors.primary[300]}35`:`${colors.primary[300]}10`,
                  },
                }}
                className="relative flex flex-col "
              >
                <span
                  className={`absolute h-0.5 w-6  transition-all duration-300
                  ${theme.palette.mode === "dark"? "bg-white":"bg-gray-500"}
                  ${open ? "rotate-45" : "-translate-y-2"}`}
                />
                <span
                  className={`absolute h-0.5 w-6 transition-all duration-300
                    ${theme.palette.mode === "dark"? "bg-white":"bg-gray-500"}
                  ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute h-0.5 w-6 transition-all duration-300
                    ${theme.palette.mode === "dark"? "bg-white":"bg-gray-500"}
                  ${open ? "-rotate-45" : "translate-y-2"}`}
                />
              </IconButton>
            </Box>

            {/* MENU */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              onClick={() => {setAnchorEl(null); setAnchorNotifications(null);}}
              // className="!text-center"
              // className="!min-w-100"
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 5,
                    sx: {
                        mt: 1.5,
                        minWidth: 220,
                        overflow: 'visible',
                        borderRadius: "16px",
                        backgroundColor: colors.primary[400],
                        backgroundImage: "none",
                        border: `1px solid ${colors.grey[800]}`,
                        width: "100%",
                        // textAlign:"center",
                        // className=""
                        "& .MuiMenuItem-root": {
                            fontSize: "1.2rem",
                            fontWeight: 500,
                            py: 1.2,
                            mx: 1,
                            justifyContent: "center", // horizontal centering
                            textAlign: "center",      // text alignment
                            borderRadius: "8px",
                            transition: "all 0.2s",
                            
                            "&:hover": { backgroundColor: colors.blueAccent[700], color: "#fff" }
                        },
                        "&:before": {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: colors.primary[400],
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            borderLeft: `1px solid ${colors.grey[800]}`,
                            borderTop: `1px solid ${colors.grey[800]}`,
                        },
                    },
              }}
            >
              <MenuItem onClick={() => {setAnchorEl(null); handleNavigation("/department/$departmentId");}}>Home</MenuItem>
              <MenuItem onClick={() => {setAnchorEl(null); handleNavigation("/department/$departmentId/devices");}}>Devices</MenuItem>
              <MenuItem onClick={() => {setAnchorEl(null); handleNavigation("/department/$departmentId/manuals");}}>Manuals</MenuItem>
              <MenuItem onClick={() => {setAnchorEl(null); handleNavigation("/department/$departmentId/spare-parts");}}>Spare Parts</MenuItem>
              <MenuItem onClick={() => {setAnchorEl(null); handleNavigation("/department/$departmentId/reports");}}>Monthly Reports</MenuItem>
            </Menu>
            
            
            
          </Box>
        )


        }
        
    </ClickAwayListener>
    );
}; 

export default Topbar;