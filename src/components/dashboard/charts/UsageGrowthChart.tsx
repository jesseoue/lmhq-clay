import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface UsageGrowthChartProps {
  data?: {
    month: string;
    usage: number;
    previousUsage: number;
  }[];
  title?: string;
  subtitle?: string;
}

const UsageGrowthChart = ({
  data = [
    { month: "Apr 2024", usage: 0.06, previousUsage: 0, credits: 7.05 },
    { month: "May 2024", usage: 491.46, previousUsage: 0.06, credits: 61432.2 },
    {
      month: "Jun 2024",
      usage: 3246.71,
      previousUsage: 491.46,
      credits: 405839,
    },
    {
      month: "Jul 2024",
      usage: 8675.62,
      previousUsage: 3246.71,
      credits: 1084452.05,
    },
    {
      month: "Aug 2024",
      usage: 15328.57,
      previousUsage: 8675.62,
      credits: 1916071.25,
    },
    {
      month: "Sep 2024",
      usage: 18160.96,
      previousUsage: 15328.57,
      credits: 2270120.25,
    },
    {
      month: "Oct 2024",
      usage: 20170.43,
      previousUsage: 18160.96,
      credits: 2521304.35,
    },
    {
      month: "Nov 2024",
      usage: 19784.12,
      previousUsage: 20170.43,
      credits: 2473015.25,
    },
    {
      month: "Dec 2024",
      usage: 17093.65,
      previousUsage: 19784.12,
      credits: 2136706.75,
    },
    {
      month: "Jan 2025",
      usage: 26181.23,
      previousUsage: 17093.65,
      credits: 3272653.65,
    },
    {
      month: "Feb 2025",
      usage: 34778.85,
      previousUsage: 26181.23,
      credits: 4347355.65,
    },
  ],

  title = "Monthly Spend",
  subtitle = "Monthly dollar amount spent on services",
}: UsageGrowthChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const formatYAxisTick = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value;
  };

  const formatTooltipValue = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  const calculateGrowthPercentage = () => {
    if (data.length < 3) return 0;
    const lastThreeMonths = data.slice(-3);
    const monthlyGrowthRates = [];

    for (let i = 1; i < lastThreeMonths.length; i++) {
      const prevMonth = lastThreeMonths[i - 1].usage;
      const currentMonth = lastThreeMonths[i].usage;
      const monthlyGrowth =
        prevMonth === 0 ? 0 : ((currentMonth - prevMonth) / prevMonth) * 100;
      monthlyGrowthRates.push(monthlyGrowth);
    }

    const avgGrowth =
      monthlyGrowthRates.reduce((sum, rate) => sum + rate, 0) /
      monthlyGrowthRates.length;
    return avgGrowth;
  };

  const growthPercentage = calculateGrowthPercentage();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-primary">
            Current: ${formatTooltipValue(payload[0].value)}
          </p>
          <p className="text-muted-foreground">
            Previous: ${formatTooltipValue(payload[1].value)}
          </p>
          <p className="text-blue-500">
            Credits: {formatTooltipValue(payload[0].payload.credits)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full h-full bg-card">
      <CardHeader>
        <CardTitle className="flex flex-col gap-1">
          <span>{title}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {subtitle}
          </span>
          <span className="text-lg font-bold text-primary">
            {growthPercentage.toFixed(0)}% Growth
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            onMouseMove={(e) => {
              if (e.activeTooltipIndex !== undefined) {
                setActiveIndex(e.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <defs>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#64748b" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0", strokeWidth: 1 }}
            />
            <YAxis
              tickFormatter={formatYAxisTick}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0", strokeWidth: 1 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="previousUsage"
              name="Previous Period"
              stroke="#64748b"
              fillOpacity={1}
              fill="url(#colorPrevious)"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="usage"
              name="Current Usage"
              stroke="#2563eb"
              fillOpacity={1}
              fill="url(#colorUsage)"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default UsageGrowthChart;
