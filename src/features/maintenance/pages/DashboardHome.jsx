import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../../components/Header";
import { tokens } from "../../../theme"
import Bar from "./BarChart";
import Pie from "./PieChart";
// import Topbar from "../global/Topbar";
import CalendarVisits from "../../../components/Visits";
import { Outlet } from "@tanstack/react-router";


const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const currentEvents = JSON.parse(localStorage.getItem("calendarEvents")) || [];
    console.log(colors)
    return (
        <Box className="mx-7  max-h-full flex  flex-col">
            {/* <Box className="flex justify-between mb-1 items-center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box> */}
            <Box className="flex flex-col lg:flex-row  w-full gap-7 lg:gap-7 my-3 "
            >
                <Box className="flex flex-col grow-6 gap-7">
                <Box className="flex justify-around items-center rounded-2xl h-auto p-6"
                    sx={{
                        backgroundColor: colors.primary[400],
                        boxShadow: theme.shadows[4],
                    }}
                >
                    <Box textAlign="center">
                        <Typography className="!text-2xl md:!text-3xl !font-bold" color={colors.greenAccent[400]}>
                            27
                        </Typography>
                        <Typography className="!text-m md:!text-xl !font-semibold" color={colors.grey[100]}>
                            Devices in Maintenance
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography className="!text-2xl md:!text-3xl !font-bold"  color={colors.greenAccent[400]} >
                            2
                        </Typography>
                        <Typography className="!text-m md:!text-xl !font-semibold" color={colors.grey[100]}>
                            Service Visits Today
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography className="!text-2xl md:!text-3xl !font-bold" color={colors.greenAccent[400]} fontWeight="bold">
                            145
                        </Typography>
                        <Typography className="!text-m md:!text-xl !font-semibold" color={colors.grey[100]}>
                            Spare Parts Used
                        </Typography>
                    </Box>
                </Box>
               <Box className="flex flex-col md:flex-row grow-1 gap-7">
                <Box className="rounded-2xl pt-2 flex flex-col justify-evenly items-center grow-1 h-80 md:h-100"
                    sx={{
                        backgroundColor: colors.primary[400],
                        boxShadow: theme.shadows[4],
                    }}
                >
                    <Typography variant="h6" fontWeight="600"  color={colors.grey[100]} >
                        Devices Entered the System / Week
                    </Typography>
                    <Bar isDashboard={true}  className=""/>
                </Box>
                <Box className="rounded-2xl pt-2 flex flex-col justify-evenly items-center grow-1 h-80 md:h-100"
                    sx={{
                        backgroundColor: colors.primary[400],
                        boxShadow: theme.shadows[4],
                    }}
                >
                    <Typography variant="h6" fontWeight="600"  color={colors.grey[100]}>
                        Devices by Company
                    </Typography>
                    <Pie isDashboard={true} />
                </Box>
               </Box>

                </Box>

                <Box className="rounded-2xl grow-1"
                    sx={{
                        backgroundColor: colors.primary[400],
                        boxShadow: theme.shadows[4],
                        p: 1,
                    }}
                >
                    <CalendarVisits currentEvents={currentEvents} />
                </Box>
              
            </Box>
            <div>
                <Outlet />
            </div>
        </Box>
    );
};

export default Dashboard;


