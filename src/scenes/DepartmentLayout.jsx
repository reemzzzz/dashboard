import { Link, Outlet, useLoaderData, useLocation } from "@tanstack/react-router";
import { createAppRouter } from "../router";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../components/global/Topbar";
// import SideBar from "../components/global/Sidebar";
// SideBar
// createAppRouter
import { ColorModeContext, useMode } from "../theme";
// import { UserProvider } from "../contexts/UserContext";
import { useMemo, useState } from "react";
import SideBar from "../components/global/Sidebar";
import { AuthProvider, useAuth } from "../contexts/authContext";
import { sidebar } from "../features/maintenance";
import Header from "../components/Header";
// Header
// sidebar
// AuthProvider

const DepartmentLayout = ()=> {

    const [theme, colorMode] = useMode();
    const auth = useAuth();
 
     const  departmentData  = useLoaderData({ strict: false });
     const handleLogout = () => {
        auth.logout();
        console.log("inside handleLogout: isLoggedIn is set to false")
      }
    const location = useLocation();
const currentPage = location.pathname; // e.g., "/department/devices"

// Extract the last segment of the path
const pathSegments = currentPage.split("/").filter(Boolean); // removes empty strings
const lastSegment = pathSegments[pathSegments.length - 1]; // "devices"

// Find the sidebar element by matching last segment
const thisPage = sidebar.find(page => page.path === lastSegment) || sidebar.find(page => page.path === "/");

if (!thisPage) {
  console.warn("No sidebar page matched!", lastSegment);
  // thisPage = sidebar.find(page=>page.path === "/")
}
else console.log("page from sidebar:", thisPage.label);






  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <div className="min-h-screen">
            <div className="block md:hidden">
              <Topbar mobileScreen onLogout={handleLogout}/>
              <Outlet />
            </div>
            <div className="hidden md:flex min-h-full">
                <SideBar className=" h-dvh bottom-0 " department={departmentData}/>
              
              <div className="flex flex-col grow-1">  
                <Box className="flex justify-between mx-3">
                   <Header title={thisPage?.label} subtitle={thisPage?.subtitle} />
                  <Box>
                    <Topbar mobileScreen={false}  onLogout = {handleLogout}  />
                  </Box>
                </Box>
                <Outlet />
              </div>
           </div>

          </div>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
export default DepartmentLayout;