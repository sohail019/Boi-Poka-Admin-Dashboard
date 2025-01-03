import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { name: "Action", value: 400 },
  { name: "Drama", value: 300 },
  { name: "Comedy", value: 300 },
  { name: "Horror", value: 200 },
  { name: "Sci-Fi", value: 278 },
  { name: "Romance", value: 189 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF", "#FF00AA"];

const chartConfig = {
  genres: {
    label: "Genres",
    color: COLORS[0],
  },
} satisfies ChartConfig;

const PopularGenre = () => {
  return (
    <div className=" p-4 rounded-lg shadow-md">
      <ChartContainer config={chartConfig} >
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="80%"
              labelLine={false}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
          </PieChart>
      </ChartContainer>
    </div>
  );
};

export default PopularGenre;
