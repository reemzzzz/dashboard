import { ResponsiveBar } from '@nivo/bar';
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { mockBarData as data } from '../../../data/mockData';
import Header from '../../../components/Header';
// Header
const Bar = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box className="mx-7"
            sx={{
                height: isDashboard ? "60%" : "70vh",
                width: isDashboard ? "60%" : "50vw",
            }}
        >
            {/* {
                !isDashboard?<Header title="BAR CHART" subtitle="Status of Devices entered the system this month"  />:""
            } */}
            <ResponsiveBar
                data={data}
                theme={{
                    axis: {
                        domain: { line: { stroke: colors.grey[100] } },
                        legend: {
                            text: { fill: colors.grey[100], fontSize: 14 },
                        },
                        ticks: {
                            line: { stroke: colors.grey[100], strokeWidth: 1 },
                            text: { fill: colors.grey[100], fontSize: 12 },
                        },
                    },
                    legends: {
                        text: { fill: colors.grey[100], fontSize: 14 },
                    },
                    tooltip: {
                        container: {
                            background: colors.primary[400],
                            color: colors.grey[100],
                            fontSize: 12,
                            borderRadius: "4px",
                        },
                    },
                }}
                keys={['استلام', 'فحص', 'امر شغل', 'تمت الصيانة']}
                indexBy="Week"
                enableLabel={!isDashboard}
                labelSkipWidth={20}
                labelSkipHeight={6}
                legends={
                    isDashboard
                        ? []
                        : [
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                translateX: 112,
                                itemsSpacing: 3,
                                itemWidth: 100,
                                itemHeight: 16,
                            },
                        ]
                }
                axisBottom={
                    isDashboard
                        ? null
                        : { legend: "Weeks", legendOffset: 36 }
                }
                axisLeft={
                    isDashboard
                        ? null
                        : { legend: "Devices", legendOffset: -40 }
                }
                margin={
                    isDashboard
                        ? { top: 10, right: 20, bottom: 30, left: 30 }
                        : { top: 50, right: 130, bottom: 50, left: 60 }
                }
                
                // ✅ Disable tooltip in dashboard
                // tooltip={isDashboard ? () => null : undefined}
            />
        </Box>
    );
};

export default Bar;
