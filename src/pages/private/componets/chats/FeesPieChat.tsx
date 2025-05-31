import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useOverview1Store } from "../store";
import { Card, Typography, Box } from "@mui/material";
import { ChartDataItem, FeeStaticItem } from "../interface";

const COLORS = ["#0e41a7", "#FF9800"]; // blue and orange

const FeesPieChart = () => {
  const { feeStatic } = useOverview1Store() as { feeStatic: FeeStaticItem[] | undefined };

  const totalCollected = feeStatic?.reduce((sum, item) => sum + item.totalFeesCollected, 0) ?? 0;
  const totalPending = feeStatic?.reduce((sum, item) => sum + item.totalFeesPending, 0) ?? 0;

  const chartData: ChartDataItem[] = [
    { name: "Collected", value: totalCollected },
    { name: "Pending", value: totalPending },
  ];

  const hasData = chartData.some(item => item.value > 0);

  return (
    <Card
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "6px",
        backgroundColor: "#fff",
        width: "100%",
        maxWidth: 200,
        height: "100%",
        maxHeight: 350,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      {!hasData ? (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          No data available
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              flex: "1 1 auto",
              width: "100%",
              minHeight: 0,
              mb: 1,
              position: "relative",
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="35%"
                  outerRadius={75}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  dataKey="value"
                  nameKey="name"
                  labelLine={false}
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                {/* <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} /> */}
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={0.5}
            mb="10px"
          >
            <Typography
              sx={{ fontSize: "13px", display: "flex", alignItems: "center", color: COLORS[0] }}
            >
              <Box
                component="span"
                sx={{
                  backgroundColor: COLORS[0],
                  height: 10,
                  width: 10,
                  borderRadius: "50%",
                  display: "inline-block",
                  mr: 1.5,
                }}
              />
              Total Received: ₹{totalCollected.toLocaleString()}
            </Typography>

            <Typography
              sx={{ fontSize: "13px", display: "flex", alignItems: "center", color: COLORS[1] }}
            >
              <Box
                component="span"
                sx={{
                  backgroundColor: COLORS[1],
                  height: 10,
                  width: 10,
                  borderRadius: "50%",
                  display: "inline-block",
                  mr: 1.5,
                }}
              />
              Total Pending: ₹{totalPending.toLocaleString()}
            </Typography>
          </Box>
        </>
      )}
    </Card>
  );
};

export default FeesPieChart;
