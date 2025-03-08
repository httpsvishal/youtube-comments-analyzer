"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  key: "comments",
  dataKey: "comments",
  label: "Comments",
  color: "#8102f7",
};

export default function CustomAreaChart({ data }) {
  console.log("Chart Data:", data); // Debugging

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  return (
    <div className="p-4">
      <ChartContainer config={chartConfig}>
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="comments" fill={chartConfig.color} radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
