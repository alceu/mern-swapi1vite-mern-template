import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./TopSearchesChart.module.css";
import { useGetTopSearchesQuery } from "@features/api/searchesStatsApi";

interface TopSearchesChartProps {
  title: string;
  type: "films" | "people";
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#d0ed57",
];

const TopSearchesChart: React.FC<TopSearchesChartProps> = ({ title, type }) => {
  const { data, error, isLoading } = useGetTopSearchesQuery({ type });

  if (isLoading) return <p>Loading {title} chart...</p>;
  if (error) return <p>Error loading {title} chart data.</p>;
  if (!data || data.length === 0) return <p>No {title} data available.</p>;

  const chartData = data.map((item) => ({
    name: item.searchQuery.query,
    value: item.percentage,
  }));

  return (
    <div className={styles.chartWrapper}>
      <h3>{title}</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `${(value * 100).toFixed(2)}%`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopSearchesChart;
