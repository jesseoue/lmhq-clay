import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  ArrowUpRight,
  BarChart2,
  PieChart as PieChartIcon,
  TrendingUp,
  DollarSign,
  CreditCard,
  Sparkles,
  Calendar,
  Filter,
  Download,
} from "lucide-react";
import UsageDollarBreakdown from "../charts/UsageDollarBreakdown";
import CreditCosts from "./CreditCosts";
import consumptionData from "@/data/consumption.json";

interface UsageAnalysisProps {
  title?: string;
  description?: string;
}

const UsageAnalysis = ({
  title = "Usage Analysis",
  description = "Detailed breakdown of Clay.com's service usage and growth metrics",
}: UsageAnalysisProps) => {
  const [displayMode, setDisplayMode] = useState<"dollars" | "credits">(
    "credits",
  );
  const [timeRange, setTimeRange] = useState<"all" | "6m" | "3m">("6m");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [serviceData, setServiceData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [averageGrowth, setAverageGrowth] = useState<number>(0);
  const [recentGrowth, setRecentGrowth] = useState<number>(0);
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  // Process data from consumption.json
  useEffect(() => {
    if (consumptionData && consumptionData.data) {
      const data = consumptionData.data.filter(
        (item) => item.month !== "Total",
      );
      processData(data);
      generateAIInsights(data);
    }
  }, [displayMode, timeRange, selectedMonth]);

  const processData = (data: any[]) => {
    // Filter data based on time range
    let filteredData = [...data];
    if (timeRange === "6m") {
      filteredData = data.slice(-6);
    } else if (timeRange === "3m") {
      filteredData = data.slice(-3);
    }

    // Filter by selected month if not "all"
    if (selectedMonth !== "all") {
      filteredData = filteredData.filter(
        (item) => item.month === selectedMonth,
      );
    }

    // Calculate total usage and cost
    const lastMonthData =
      filteredData[filteredData.length - 1] || data[data.length - 1];
    setTotalUsage(lastMonthData.sumOfCredits || 0);
    setTotalCost(lastMonthData.totalCost || 0);

    // Calculate growth rates
    calculateGrowthRates(filteredData.length > 1 ? filteredData : data);

    // Prepare service data
    const services = [
      { key: "emailFinder", name: "Email Finder", color: "#2563eb" },
      { key: "emailValidation", name: "Email Validation", color: "#7c3aed" },
      { key: "mobileFinder", name: "Mobile Finder", color: "#0891b2" },
      { key: "companySearch", name: "Company Search", color: "#059669" },
      { key: "linkedinFinder", name: "Email to B2B Profile", color: "#d97706" },
      {
        key: "competitorsSearch",
        name: "Competitors Search",
        color: "#9333ea",
      },
      {
        key: "personalEmailFinder",
        name: "Personal Email Finder",
        color: "#ec4899",
      },
    ];

    // Create service data for the chart
    const newServiceData = services
      .map((service) => {
        const usage =
          displayMode === "dollars"
            ? (lastMonthData[service.key] || 0) * lastMonthData.costPerCredit
            : lastMonthData[service.key] || 0;

        // Calculate growth for this service
        let growth = 0;
        if (filteredData.length > 1) {
          const previousMonth = filteredData[filteredData.length - 2];
          const previousUsage = previousMonth[service.key] || 0;
          const currentUsage = lastMonthData[service.key] || 0;
          growth =
            previousUsage > 0
              ? ((currentUsage - previousUsage) / previousUsage) * 100
              : 0;
        }

        return {
          name: service.name,
          usage,
          growth: Math.round(growth),
          color: service.color,
        };
      })
      .filter((service) => service.usage > 0);

    setServiceData(newServiceData);

    // Create category data for the pie chart with small services grouped
    // Group services with less than 5% into "Other Services"
    const threshold = 5; // percentage threshold for grouping

    let newCategoryData = [];
    let otherServices = [];
    let otherValue = 0;
    let otherActualValue = 0;

    // Calculate total value for percentage calculation
    const totalValue = newServiceData.reduce(
      (sum, item) => sum + item.usage,
      0,
    );

    newServiceData.forEach((service) => {
      const percentage =
        totalValue > 0 ? (service.usage / totalValue) * 100 : 0;

      if (percentage < threshold) {
        // Add to other category
        otherServices.push({
          name: service.name,
          value: percentage,
          color: service.color,
          actualValue: service.usage,
        });
        otherValue += percentage;
        otherActualValue += service.usage;
      } else {
        // Add as a separate category
        newCategoryData.push({
          name: service.name,
          value: percentage,
          color: service.color,
          actualValue: service.usage,
        });
      }
    });

    // Add the "Other Services" category if there are any
    if (otherServices.length > 0) {
      newCategoryData.push({
        name: "Other Services",
        value: otherValue,
        color: "#64748b", // slate color for "Other"
        actualValue: otherActualValue,
        isGroup: true,
        services: otherServices,
      });
    }

    setCategoryData(newCategoryData);
  };

  const calculateGrowthRates = (data: any[]) => {
    if (data.length < 2) return;

    // Calculate average month-over-month growth
    const growthRates = [];
    for (let i = 1; i < data.length; i++) {
      const prevMonth = data[i - 1].sumOfCredits;
      const currentMonth = data[i].sumOfCredits;
      if (prevMonth > 0) {
        const monthlyGrowth = ((currentMonth - prevMonth) / prevMonth) * 100;
        growthRates.push(monthlyGrowth);
      }
    }

    const avgGrowth =
      growthRates.length > 0
        ? growthRates.reduce((sum, rate) => sum + rate, 0) / growthRates.length
        : 0;
    setAverageGrowth(Math.round(avgGrowth));

    // Calculate recent growth (last 3 months or less)
    const recentRates = growthRates.slice(-Math.min(3, growthRates.length));
    const recent =
      recentRates.length > 0
        ? recentRates.reduce((sum, rate) => sum + rate, 0) / recentRates.length
        : 0;
    setRecentGrowth(parseFloat(recent.toFixed(1)));
  };

  const generateAIInsights = (data: any[]) => {
    // Generate AI insights based on the data
    const lastMonth = data[data.length - 1];
    const insights = [
      `Email Finder represents ${Math.round((lastMonth.emailFinder / lastMonth.sumOfCredits) * 100)}% of your total API usage, making it your most utilized service.`,
      `Your usage has grown by ${Math.round((lastMonth.sumOfCredits / data[0].sumOfCredits - 1) * 100)}% since ${data[0].month}, demonstrating exceptional adoption of our API services.`,
      `Mobile Finder shows the second highest usage at ${Math.round((lastMonth.mobileFinder / lastMonth.sumOfCredits) * 100)}% of total volume, complementing your Email Finder strategy.`,
      `Email to B2B Profile usage has ${lastMonth.linkedinFinder > 0 ? "increased" : "decreased"} in recent months, suggesting a strategic shift in your data enrichment approach.`,
      `Competitors Search has grown ${lastMonth.competitorsSearch > 0 ? "significantly" : "modestly"} recently, indicating expanded competitive intelligence gathering.`,
    ];
    setAiInsights(insights);
  };

  const COLORS = categoryData.map((item) => item.color);

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="bg-white p-4 border rounded-md shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-primary font-semibold">{`${payload[0].value.toFixed(2)}%`}</p>
          <p className="text-gray-600 text-sm mt-1">
            {displayMode === "dollars" ? "$" : ""}
            {data.actualValue.toLocaleString()}
            {displayMode === "credits" ? " credits" : ""}
          </p>

          {/* Show breakdown for "Other Services" group */}
          {data.isGroup && data.services && data.services.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-1">
                Includes:
              </p>
              {data.services.map((service: any, idx: number) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-gray-600">{service.name}:</span>
                  <span className="font-medium">
                    {service.value.toFixed(1)}%
                    <span className="text-gray-500 ml-1">
                      ({displayMode === "dollars" ? "$" : ""}
                      {service.actualValue.toLocaleString()}
                      {displayMode === "credits" ? " credits" : ""})
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-md shadow-sm">
          <p className="font-medium mb-1">{label}</p>
          <p className="text-gray-700">
            {displayMode === "dollars" ? "$" : ""}
            {payload[0].value.toLocaleString()}
            {displayMode === "credits" ? " credits" : ""}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Growth: {payload[0].payload.growth}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Format Y-axis ticks
  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
    return value;
  };

  // Available months for filtering
  const months = [
    { id: "all", name: "All Months" },
    ...(consumptionData?.data || [])
      .filter((item) => item.month !== "Total")
      .map((item) => ({
        id: item.month,
        name: item.month,
      })),
  ];

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-500 mt-1">{description}</p>
          <blockquote className="mt-3 border-l-4 border-blue-500 pl-4 italic text-gray-700">
            "In 2022, Clay 10x'd revenue — a remarkable achievement. Not to be
            outdone, they came back and did it again in 2023, followed by 6x
            revenue in 2024."
          </blockquote>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <Select
            value={displayMode}
            onValueChange={(value: "dollars" | "credits") => {
              setDisplayMode(value);
            }}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Display Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dollars">
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>Dollars</span>
                </div>
              </SelectItem>
              <SelectItem value="credits">
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Credits</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={timeRange}
            onValueChange={(value: "all" | "6m" | "3m") => {
              setTimeRange(value);
              // Reset month selection when changing time range
              setSelectedMonth("all");
            }}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={selectedMonth}
            onValueChange={(value: string) => setSelectedMonth(value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.id} value={month.id}>
                  {month.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              Total All Time {displayMode === "credits" ? "Usage" : "Spend"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {displayMode === "credits" ? (
                <CreditCard className="h-8 w-8 text-blue-500 mr-3" />
              ) : (
                <DollarSign className="h-8 w-8 text-green-500 mr-3" />
              )}
              <div>
                <div className="text-3xl font-bold">
                  {displayMode === "dollars" ? "$" : ""}
                  {displayMode === "dollars"
                    ? consumptionData.data
                        .find((item) => item.month === "Total")
                        ?.totalCost.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })
                    : consumptionData.data
                        .find((item) => item.month === "Total")
                        ?.sumOfCredits.toLocaleString()}
                  {displayMode === "credits" ? " credits" : ""}
                </div>
                <div className="text-sm text-muted-foreground">
                  Since April 2024
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              Average Monthly {displayMode === "credits" ? "Usage" : "Spend"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {displayMode === "credits" ? (
                <CreditCard className="h-8 w-8 text-blue-500 mr-3" />
              ) : (
                <DollarSign className="h-8 w-8 text-green-500 mr-3" />
              )}
              <div>
                <div className="text-3xl font-bold">
                  {displayMode === "dollars" ? "$" : ""}
                  {displayMode === "dollars"
                    ? (
                        consumptionData.data.find(
                          (item) => item.month === "Total",
                        )?.totalCost /
                        (consumptionData.data.length - 1)
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })
                    : (
                        consumptionData.data.find(
                          (item) => item.month === "Total",
                        )?.sumOfCredits /
                        (consumptionData.data.length - 1)
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                  {displayMode === "credits" ? " credits" : ""}
                </div>
                <div className="text-sm text-muted-foreground">
                  Since April 2024
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowUpRight className="h-8 w-8 text-amber-500 mr-3" />
              <div>
                <div className="text-3xl font-bold">{recentGrowth}%</div>
                <div className="text-sm text-muted-foreground">
                  Last 3 months
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <UsageDollarBreakdown />
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="services">Service Breakdown</TabsTrigger>
          <TabsTrigger value="categories">Category Distribution</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="credit-costs">Credit Costs</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Usage Breakdown</CardTitle>
              <CardDescription>
                Detailed view of usage across different services
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={serviceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="usage"
                    name={
                      displayMode === "dollars" ? "Spend ($)" : "Credits Used"
                    }
                    fill="#2563eb"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Export Data
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceData.map((service, index) => (
              <Card key={index} className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {displayMode === "dollars" ? "$" : ""}
                    {service.usage.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                    {displayMode === "credits" ? " credits" : ""}
                  </div>
                  <div className="flex items-center mt-1">
                    <Badge
                      className={
                        service.growth > 0
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }
                    >
                      {service.growth > 0 ? "+" : ""}
                      {service.growth}%
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-2">
                      growth
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>
                Percentage breakdown of{" "}
                {displayMode === "dollars" ? "spend" : "usage"} by service
                category
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-center h-[500px]">
              <div className="w-full md:w-1/2 h-[300px] md:h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={110}
                      fill="#8884d8"
                      dataKey="value"
                      label={({
                        name,
                        value,
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        percent,
                      }) => {
                        // Calculate the position for the label
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius + 30;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);

                        // Only show labels for slices with more than 3% to avoid clutter
                        if (percent < 0.03) return null;

                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#333333"
                            textAnchor={x > cx ? "start" : "end"}
                            dominantBaseline="central"
                            fontSize="12"
                          >
                            {`${name}: ${value.toFixed(1)}%`}
                          </text>
                        );
                      }}
                      paddingAngle={2}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color || COLORS[index % COLORS.length]}
                          strokeWidth={entry.isGroup ? 2 : 1}
                          stroke="#fff"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      wrapperStyle={{
                        paddingLeft: "20px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-8">
                <h3 className="text-lg font-semibold mb-4">
                  Key Distribution Insights
                </h3>
                <ul className="space-y-3">
                  {categoryData
                    .filter((category) => !category.isGroup)
                    .slice(0, 2)
                    .map((category, index) => (
                      <li key={index} className="flex items-start">
                        <div
                          className="h-5 w-5 rounded-full mr-3 mt-1"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <div>
                          <p className="font-medium">
                            {category.name}: {category.value.toFixed(1)}%
                          </p>
                          <p className="text-sm text-gray-500">
                            {index === 0
                              ? `Represents the largest portion of your ${displayMode === "dollars" ? "spend" : "API usage"}, indicating this is your primary service.`
                              : `Your second most utilized service, complementing your ${categoryData[0].name} strategy.`}
                          </p>
                        </div>
                      </li>
                    ))}

                  {/* Add the "Other Services" breakdown if it exists */}
                  {categoryData.find((cat) => cat.isGroup) && (
                    <li className="flex items-start">
                      <div
                        className="h-5 w-5 rounded-full mr-3 mt-1"
                        style={{ backgroundColor: "#64748b" }}
                      ></div>
                      <div>
                        <p className="font-medium">
                          Other Services:{" "}
                          {categoryData
                            .find((cat) => cat.isGroup)
                            ?.value.toFixed(1)}
                          %
                        </p>
                        <div className="text-sm text-gray-500 mt-1">
                          <p className="mb-1">
                            Includes smaller usage services:
                          </p>
                          <ul className="space-y-1 pl-2">
                            {categoryData
                              .find((cat) => cat.isGroup)
                              ?.services.map((service: any, idx: number) => (
                                <li key={idx} className="flex justify-between">
                                  <span>{service.name}:</span>
                                  <span className="font-medium">
                                    {service.value.toFixed(1)}%
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  )}
                </ul>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Monthly Trend
                  </h4>
                  <p className="text-sm text-blue-700">
                    {categoryData[0]?.name || "Email Finder"} has consistently
                    been your most used service, representing{" "}
                    {categoryData[0]?.value.toFixed(1) || "70"}% of your total
                    usage. Consider exploring our annual plan to optimize costs
                    for this high-volume service.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Export Chart
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
                AI-Powered Usage Insights
              </CardTitle>
              <CardDescription>
                Strategic analysis of your service usage patterns and growth
                trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {aiInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-blue-700 font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-700">{insight}</p>
                      <div className="mt-2 flex items-center text-sm text-blue-600">
                        <Filter className="h-4 w-4 mr-1" />
                        <span>
                          Based on{" "}
                          {timeRange === "all"
                            ? "all-time"
                            : timeRange === "6m"
                              ? "6-month"
                              : "3-month"}{" "}
                          usage data
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
                    Strategic Recommendation
                  </h3>
                  <p className="text-amber-700">
                    Based on your usage patterns, we recommend exploring our
                    annual plan options. With your current growth trajectory,
                    you could save approximately 25% on your{" "}
                    {categoryData[0]?.name || "Email Finder"} costs, which
                    represents
                    {categoryData[0]?.value.toFixed(1) || "70"}% of your total
                    usage.
                  </p>
                  <Button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white">
                    View Annual Plan Options
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credit-costs">
          <CreditCosts />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsageAnalysis;
