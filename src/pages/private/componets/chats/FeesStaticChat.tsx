import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import {
    Card,
    Typography,
    useTheme,
    styled,
    Box,
    Grid,
    alpha
} from "@mui/material";
import { useOverview1Store } from "../store";


// Gradient background for card
const GradientCard = styled(Card)(({ theme }) => ({
    background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${alpha(theme.palette.primary.light, 0.05)})`,
    borderRadius: "12px",
    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 10px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
    },
}));


const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <Box
                sx={{
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: 'blur(4px)',
                    p: 1.5,
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(0,0,0,0.05)",
                }}
            >
                <Typography variant="subtitle2" fontWeight={600} color="text.primary" mb={0.5}>
                    {label}
                </Typography>
                {payload.map((entry: any) => (
                    <Box key={entry.dataKey} sx={{
                        display: "flex",
                        alignItems: "center",
                        py: 0.5
                    }}>
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                bgcolor: entry.color,
                                borderRadius: "50%",
                                mr: 1,
                            }}
                        />
                        <Typography variant="body2" sx={{ flex: 1 }}>
                            {entry.name}:
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            ₹{entry.value.toLocaleString()}
                        </Typography>
                    </Box>
                ))}
            </Box>
        );
    }
    return null;
};

const FeeSummaryLineChart = () => {
    const theme = useTheme();
    const { feeStatic } = useOverview1Store();

    
    const chartData = Array.isArray(feeStatic)
        ? feeStatic.map((item) => ({
            month: item.month,
            collected: item.totalFeesCollected,
            pending: item.totalFeesPending,
            average: item.averageFeesCollected,
        }))
        : [];


    const currentMonth = chartData[chartData.length - 1];
    const lastMonth = chartData[chartData.length - 2];

    const collectedThisMonth = currentMonth?.collected ?? 0;
    const collectedLastMonth = lastMonth?.collected ?? 0;
    const difference = collectedThisMonth - collectedLastMonth;
    const percentageChange = collectedLastMonth
        ? ((difference / collectedLastMonth) * 100).toFixed(1)
        : '0.0';

    const isPositive = difference >= 0;
    const trendColor = isPositive ? theme.palette.success.main : theme.palette.error.main;

    return (
        <GradientCard
            sx={{
                width: "50%",
                p: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >

            <Box sx={{ width: "100%", height: 350, position: "relative" }}>
                <Grid container spacing={2} sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    px: 1,
                    zIndex: 10,
                    pointerEvents: "none",
                }}>
                    <Grid item xs={6} md={3}>
                        <Box textAlign="center">
                            <Typography variant="subtitle1" fontWeight={700} color="primary">
                                ₹{collectedThisMonth.toLocaleString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                THIS MONTH
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box textAlign="center">
                            <Typography variant="subtitle1" fontWeight={600} color="primary">
                                ₹{collectedLastMonth.toLocaleString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                LAST MONTH
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box textAlign="center">
                            <Typography variant="subtitle1" fontWeight={700} sx={{ color: trendColor }}>
                                {isPositive ? "+" : ""}
                                {percentageChange}%
                            </Typography>
                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                TREND
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ width: "100%", height: "100%", pt: 9 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 10 }}
                                interval={0}
                                angle={0}
                                textAnchor="end"
                            />
                            <YAxis
                                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                                stroke="#666"
                                tick={{ fontSize: 12, fill: "#555" }}
                                tickMargin={10}
                                width={25}
                            />

                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="natural"
                                dataKey="collected"
                                name="Collected"
                                stroke="green"
                                strokeWidth={2}

                            />
                            <Line
                                type="monotone"
                                dataKey="pending"
                                name="Pending"
                                stroke="#FF9800"
                                strokeWidth={2}

                            />
                            <Line
                                type="monotone"
                                dataKey="average"
                                name="Average"
                                stroke="#8884d8"
                                strokeWidth={1}

                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </Box>

        </GradientCard>
    );
};

export default FeeSummaryLineChart;