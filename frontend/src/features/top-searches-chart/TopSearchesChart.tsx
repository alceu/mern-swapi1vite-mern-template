import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "./TopSearchesChart.module.css";

interface TopSearchItem {
  searchQuery: {
    _id: string;
    query: string;
    type: "films" | "people";
  };
  percentage: number;
  timestamp: string;
}

interface TopSearchesChartProps {
  title: string;
  data: TopSearchItem[] | undefined;
  isLoading: boolean;
  error: any;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658", "#d0ed57"];

const TopSearchesChart: React.FC<TopSearchesChartProps> = ({ title, data, isLoading, error }) => {
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${(value * 100).toFixed(2)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopSearchesChart;
