import { Box, Typography, Select, MenuItem, FormControl, InputLabel, useTheme, Chip, Grid, Card, CardContent, Button } from "@mui/material";
import { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// useNavigate
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import BarChartIcon from '@mui/icons-material/BarChart';
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { mockReportsData } from "../../../data/mockData";
import { useNavigate } from "@tanstack/react-router";


const teamOptions = ["All Teams", "Engineering", "Sales", "HR"];
const monthOptions = ["All Months", "2025-05", "2025-04", "2025-03"]; 

const MonthlyReports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const [selectedMonth, setSelectedMonth] = useState("2025-05");
    const [selectedTeam, setSelectedTeam] = useState("All Teams");

    const filteredReports = useMemo(() => {
        const filtered = mockReportsData.filter(report => {
            const monthMatch = selectedMonth === "All Months" || report.month === selectedMonth;
            const teamMatch = selectedTeam === "All Teams" || report.team === selectedTeam;
            return monthMatch && teamMatch;
        });

        return filtered;
    }, [selectedMonth, selectedTeam]);

    const getStatusProps = (status) => {
        switch (status) {
            case "High Performer":
                return { 
                    color: colors.greenAccent[700], 
                    bgColor: colors.greenAccent[800], 
                    icon: <TrendingUpIcon fontSize="small" /> 
                };
            case "On Target":
                return { 
                    color: colors.blueAccent[700], 
                    bgColor: colors.blueAccent[800], 
                    icon: <BarChartIcon fontSize="small" /> 
                };
            case "Needs Focus":
            default:
                return { 
                    color: colors.redAccent[700], 
                    bgColor: colors.redAccent[800], 
                    icon: <TrendingDownIcon fontSize="small" /> 
                };
        }
    };

    const renderEmployeeCard = (report) => {
        const { color, bgColor, icon: StatusIcon } = getStatusProps(report.performanceStatus);
        
        return (
            <Grid item xs={12} sm={6} lg={4} key={report.id} className="w-md md:w-sm ">
                <Card className="p-3 !rounded-3xl "
                    sx={{
                        backgroundColor: colors.primary[400],
                        borderLeft: `5px solid ${color}`, 
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: '0.2s',
                        '&:hover': {
                            boxShadow: `0 6px 12px ${color}70`,
                        }
                    }}
                >
                    <CardContent className="p-3">
                        <Box className="flex justify-between items-center mb-1">
                            <Typography className="!mr-1" variant="h5" fontWeight="bold" color={colors.grey[100]} >
                                {report.employee}
                            </Typography>
                            <Chip
                                label={report.performanceStatus}
                                size="small"
                                icon={StatusIcon}
                                sx={{
                                    backgroundColor: bgColor,
                                    color: colors.grey[100],
                                    fontWeight: 'bold',
                                }}
                            />
                        </Box>

                        <Typography variant="body2" color={colors.blueAccent[300]} mb={2}>
                            Team: {report.team}
                        </Typography>

                        <Grid container spacing={1} mb={2}>
                            <Grid item xs={4}>
                                <Typography variant="caption" color={colors.grey[300]}>
                                    Tasks Comp.
                                </Typography>
                                <Typography variant="h6" fontWeight={700} color={colors.greenAccent[400]}>
                                    {report.tasksCompleted}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="caption" color={colors.grey[300]}>
                                    Success Rate
                                </Typography>
                                <Typography variant="h6" fontWeight={700} color={colors.blueAccent[400]}>
                                    {Math.round(report.successRate * 100)}%
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="caption" color={colors.grey[300]}>
                                    Efficiency Score
                                </Typography>
                                <Typography variant="h6" fontWeight={700} color={colors.greenAccent[300]}>
                                    {report.efficiencyScore.toFixed(1)}
                                </Typography>
                            </Grid>
                        </Grid>
                        
                        <Button 
                            fullWidth
                            onClick={() => navigate(`/reports/detail/${report.id}`)}
                            variant="contained"
                            size="small"
                            endIcon={<RemoveRedEyeIcon />}
                            sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                '&:hover': {
                                    backgroundColor: colors.blueAccent[600],
                                }
                            }}
                        >
                            View Monthly Details
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        );
    };

    return (
        <Box  className="mx-7 max-h-full flex flex-col">
            <Box className="mb-5">
                {/* <Header  title={"DEP. REPORTS"} subtitle={"Automated monthly performance reports"}/> */}
            </Box>

            <Box display="flex" gap={3} mb={3}>
                <FormControl  variant="filled" sx={{ minWidth: 180, backgroundColor: colors.primary[400], borderRadius: '8px' }}>
                    <InputLabel id="month-select-label">Reporting Month</InputLabel>
                    <Select
                        labelId="month-select-label"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        label="Reporting Month"
                    >
                        {monthOptions.map(month => (
                            <MenuItem key={month} value={month}>{month}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant="filled" sx={{ minWidth: 180, backgroundColor: colors.primary[400], borderRadius: '8px' }}>
                    <InputLabel id="team-select-label">Employee Team</InputLabel>
                    <Select
                        labelId="team-select-label"
                        value={selectedTeam}
                        onChange={(e) => setSelectedTeam(e.target.value)}
                        label="Employee Team"
                    >
                        {teamOptions.map(team => (
                            <MenuItem key={team} value={team}>{team}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box 
                pb={2}
            >
                <Grid container spacing={3}>
                    {filteredReports.length > 0 ? (
                        filteredReports.map(renderEmployeeCard)
                    ) : (
                        <Box p={3}>
                            <Typography variant="h5" color={colors.redAccent[400]}>
                                No automated reports found for the selected filters.
                            </Typography>
                        </Box>
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

export default MonthlyReports;