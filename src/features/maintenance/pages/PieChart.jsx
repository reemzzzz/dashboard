import { ResponsivePie } from '@nivo/pie';
import { mockPieData as data } from '../../../data/mockData';
import {tokens} from '../../../theme';
import { Box,useTheme } from '@mui/material';
import Header from '../../../components/Header';
// Header
const Pie = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box 
            className="mx-7"
            sx={{
                height: isDashboard ? "70%" : "70vh",
                width: isDashboard ? "100%" : "50vw",
            }}>
            {/* {
                !isDashboard?<Header title="PIE CHART" subtitle="Devices entered the system this month" />:""
            } */}

            <ResponsivePie
                data={data}
                theme={{
                    axis: {
                        domain: { line: { stroke: colors.grey[100] } },
                        legend: { text: { fill: colors.grey[100] } },
                        ticks: {
                            line: { stroke: colors.grey[100], strokeWidth: 1 },
                            text: { fill: colors.grey[100] },
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
                margin={
                    isDashboard
                        ? { top: 20, right: 20, bottom: 20, left: 20 }
                        : { top: 40, right: 80, bottom: 80, left: 80 }
                }
                innerRadius={0.5}
                padAngle={1}
                cornerRadius={2}
                activeOuterRadiusOffset={8}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={colors.grey[100]}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                enableArcLabels={isDashboard?false:true}
                enableArcLinkLabels={isDashboard?false:true}
    
                legends={
                    isDashboard
                        ? [] // ✅ hide legends on dashboard
                        : [
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                translateY: 56,
                                itemWidth: 100,
                                itemHeight: 18,
                                symbolShape: 'circle',
                            },
                        ]
                }
    
                // ✅ Disable tooltip completely in dashboard view
                // tooltip={isDashboard ? () => null : undefined}
            />
        </Box>
    );
};

export default Pie;
