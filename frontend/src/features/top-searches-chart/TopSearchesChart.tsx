import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useGetTopSearchesQuery } from "@features/api/searchesStatsApi";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const TopSearchesChart: React.FC = () => {
  const { data, error, isLoading } = useGetTopSearchesQuery({});

  if (isLoading) return <p>Loading chart...</p>;
  if (error) return <p>Error loading chart data.</p>;

  const chartData = data?.map((item) => ({
    name: `${item.searchQuery.query} (${item.searchQuery.type})`,
    value: item.percentage,
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {chartData?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value: number) => `${(value * 100).toFixed(2)}%`} />
      <Legend />
    </PieChart>
  );
};

export default TopSearchesChart;
