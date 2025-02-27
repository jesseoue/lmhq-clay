import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { DollarSign, CreditCard, Filter, Sparkles } from "lucide-react";
import consumptionData from "@/data/consumption.json";

interface UsageDollarBreakdownProps {
  data?: {
    month: string;
    emailFinder: number;
    emailValidation: number;
    mobileFinder: number;
    companySearch: number;
    linkedinFinder: number;
    competitorsSearch?: number;
    personalEmailFinder?: number;
  }[];
  creditData?: {
    month: string;
    emailFinder: number;
    emailValidation: number;
    mobileFinder: number;
    companySearch: number;
    linkedinFinder: number;
    competitorsSearch?: number;
    personalEmailFinder?: number;
  }[];
  title?: string;
  description?: string;
}

const UsageDollarBreakdown = ({
  data = [
    {
      month: "Apr 2024",
      emailFinder: 0.05,
      emailValidation: 0.01,
      mobileFinder: 0,
      companySearch: 0,
      linkedinFinder: 0,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "May 2024",
      emailFinder: 175.57,
      emailValidation: 2.77,
      mobileFinder: 313.12,
      companySearch: 0,
      linkedinFinder: 0,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "Jun 2024",
      emailFinder: 1111.38,
      emailValidation: 6.06,
      mobileFinder: 2124.28,
      companySearch: 4.99,
      linkedinFinder: 0,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "Jul 2024",
      emailFinder: 4282.18,
      emailValidation: 12.5,
      mobileFinder: 4261.24,
      companySearch: 119.7,
      linkedinFinder: 0,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "Aug 2024",
      emailFinder: 9820.64,
      emailValidation: 16.25,
      mobileFinder: 4431.32,
      companySearch: 1060.36,
      linkedinFinder: 0,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "Sep 2024",
      emailFinder: 13160.78,
      emailValidation: 39.27,
      mobileFinder: 4090.16,
      companySearch: 870.75,
      linkedinFinder: 0,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "Oct 2024",
      emailFinder: 13365.27,
      emailValidation: 48.62,
      mobileFinder: 4362.48,
      companySearch: 349.9,
      linkedinFinder: 2044.16,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "Nov 2024",
      emailFinder: 14301.74,
      emailValidation: 75.44,
      mobileFinder: 2507.8,
      companySearch: 458.42,
      linkedinFinder: 2440.72,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "Dec 2024",
      emailFinder: 12669.62,
      emailValidation: 64.0,
      mobileFinder: 2083.56,
      companySearch: 624.77,
      linkedinFinder: 1650.96,
      competitorsSearch: 0.74,
      personalEmailFinder: 0,
    },
    {
      month: "Jan 2025",
      emailFinder: 19256.14,
      emailValidation: 112.23,
      mobileFinder: 5083.36,
      companySearch: 602.26,
      linkedinFinder: 1100.72,
      competitorsSearch: 26.52,
      personalEmailFinder: 0,
    },
    {
      month: "Feb 2025",
      emailFinder: 22497.9,
      emailValidation: 92.99,
      mobileFinder: 4059.48,
      companySearch: 878.49,
      linkedinFinder: 314.72,
      competitorsSearch: 88.08,
      personalEmailFinder: 0.35,
    },
  ],
  creditData = [
    {
      month: "Apr 2024",
      emailFinder: 6,
      emailValidation: 1.05,
      mobileFinder: 0,
      companySearch: 0,
      linkedinFinder: 0,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "May 2024",
      emailFinder: 21946,
      emailValidation: 346.2,
      mobileFinder: 39140,
      companySearch: 0,
      linkedinFinder: 0,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "Jun 2024",
      emailFinder: 138922,
      emailValidation: 758,
      mobileFinder: 265535,
      companySearch: 624,
      linkedinFinder: 0,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "Jul 2024",
      emailFinder: 535272,
      emailValidation: 1562.05,
      mobileFinder: 532655,
      companySearch: 14963,
      linkedinFinder: 0,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "Aug 2024",
      emailFinder: 1227580,
      emailValidation: 2031.25,
      mobileFinder: 553915,
      companySearch: 132545,
      linkedinFinder: 0,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "Sep 2024",
      emailFinder: 1645098,
      emailValidation: 4908.25,
      mobileFinder: 511270,
      companySearch: 108844,
      linkedinFinder: 0,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "Oct 2024",
      emailFinder: 1670659,
      emailValidation: 6077.35,
      mobileFinder: 545310,
      companySearch: 43738,
      linkedinFinder: 255520,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "Nov 2024",
      emailFinder: 1787718,
      emailValidation: 9430.25,
      mobileFinder: 313475,
      companySearch: 57302,
      linkedinFinder: 305090,
      competitorsSearch: 0,
      personalEmailFinder: 0,
    },
    {
      month: "Dec 2024",
      emailFinder: 1583703,
      emailValidation: 7999.75,
      mobileFinder: 260445,
      companySearch: 78096,
      linkedinFinder: 206370,
      competitorsSearch: 93,
      personalEmailFinder: 0,
    },
    {
      month: "Jan 2025",
      emailFinder: 2407018,
      emailValidation: 14028.65,
      mobileFinder: 635420,
      companySearch: 75282,
      linkedinFinder: 137590,
      competitorsSearch: 3315,
      personalEmailFinder: 0,
    },
    {
      month: "Feb 2025",
      emailFinder: 3547721.0,
      emailValidation: 15024.65,
      mobileFinder: 592505.0,
      companySearch: 124287.0,
      linkedinFinder: 49120.0,
      competitorsSearch: 18650.0,
      personalEmailFinder: 48.0,
    },
  ],
  title = "Usage & Cost Breakdown",
  description = "Detailed analysis of service usage in both dollars and credits",
}: UsageDollarBreakdownProps) => {
  const [viewMode, setViewMode] = useState<"stacked" | "grouped">("stacked");
  const [timeRange, setTimeRange] = useState<"all" | "6m" | "3m">("all");
  const [valueType, setValueType] = useState<"dollars" | "credits">("dollars");
  const [selectedServices, setSelectedServices] = useState<string[]>(["all"]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>(["all"]);
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  // Available services and months for filtering
  const services = [
    { id: "all", name: "All Services" },
    { id: "emailFinder", name: "Email Finder" },
    { id: "emailValidation", name: "Email Validation" },
    { id: "mobileFinder", name: "Mobile Finder" },
    { id: "companySearch", name: "Company Search" },
    { id: "linkedinFinder", name: "Email to B2B Profile" },
    { id: "competitorsSearch", name: "Competitors Search" },
    { id: "personalEmailFinder", name: "Personal Email Finder" },
  ];

  const months = [
    { id: "all", name: "All Months" },
    ...data.map((item) => ({ id: item.month, name: item.month })),
  ];

  // Generate AI insights based on the data
  useEffect(() => {
    // This would normally be an API call to an AI service
    // For demo purposes, we're generating static insights
    const insights = [
      "Email Finder usage has grown 466,000% from April 2024 to February 2025, indicating a dramatic expansion in contact discovery operations.",
      "Mobile Finder shows the highest volatility with significant month-to-month fluctuations, suggesting campaign-based usage patterns.",
      "LinkedIn Finder adoption began in October 2024 and peaked in November before declining, potentially indicating a shift in sourcing strategy.",
      "Competitors Search shows a 11,900% growth in the last 3 months, suggesting an emerging focus on competitive intelligence.",
      "Email Validation consistently represents the smallest portion of spend despite steady growth, indicating efficient validation processes.",
    ];
    setAiInsights(insights);
  }, []);

  // Filter data based on time range, selected services and months
  const getFilteredData = () => {
    let currentData = valueType === "dollars" ? data : creditData;

    // Filter by time range
    if (timeRange !== "all") {
      const months = timeRange === "6m" ? 6 : 3;
      currentData = currentData.slice(-months);
    }

    // Filter by selected months
    if (selectedMonths.length > 0 && !selectedMonths.includes("all")) {
      currentData = currentData.filter((item) =>
        selectedMonths.includes(item.month),
      );
    }

    // Filter by selected services
    if (selectedServices.length > 0 && !selectedServices.includes("all")) {
      // Create a new array with only the selected services
      currentData = currentData.map((item) => {
        const filteredItem: any = { month: item.month };
        selectedServices.forEach((service) => {
          filteredItem[service] = item[service];
        });
        return filteredItem;
      });
    }

    return currentData;
  };

  const filteredData = getFilteredData();

  // Calculate totals for the summary cards
  const calculateTotals = () => {
    const lastMonth = filteredData[filteredData.length - 1];
    let totalLastMonth = 0;
    let totalAllTime = 0;

    // Calculate last month total based on selected services
    if (selectedServices.includes("all")) {
      // Sum all services
      totalLastMonth = Object.keys(lastMonth)
        .filter((key) => key !== "month")
        .reduce((sum, key) => sum + (lastMonth[key] || 0), 0);
    } else {
      // Sum only selected services
      totalLastMonth = selectedServices.reduce(
        (sum, service) => sum + (lastMonth[service] || 0),
        0,
      );
    }

    // Calculate all time total
    totalAllTime = filteredData.reduce((sum, month) => {
      if (selectedServices.includes("all")) {
        // Sum all services
        return (
          sum +
          Object.keys(month)
            .filter((key) => key !== "month")
            .reduce((serviceSum, key) => serviceSum + (month[key] || 0), 0)
        );
      } else {
        // Sum only selected services
        return (
          sum +
          selectedServices.reduce(
            (serviceSum, service) => serviceSum + (month[service] || 0),
            0,
          )
        );
      }
    }, 0);

    return { totalLastMonth, totalAllTime };
  };

  const { totalLastMonth, totalAllTime } = calculateTotals();

  // Custom tooltip for the charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce(
        (sum: number, entry: any) => sum + entry.value,
        0,
      );

      return (
        <div className="bg-white p-4 border rounded-md shadow-md">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm">{entry.name}:</span>
              </div>
              <span className="text-sm font-medium">
                {valueType === "dollars" ? "$" : ""}
                {entry.value.toLocaleString()}
                {valueType === "credits" ? " credits" : ""}
              </span>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total:</span>
              <span className="text-sm font-bold">
                {valueType === "dollars" ? "$" : ""}
                {total.toLocaleString()}
                {valueType === "credits" ? " credits" : ""}
              </span>
            </div>
          </div>
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

  // Handle service selection
  const handleServiceSelection = (serviceId: string) => {
    if (serviceId === "all") {
      setSelectedServices(["all"]);
    } else {
      const newSelection = selectedServices.filter((id) => id !== "all");
      if (newSelection.includes(serviceId)) {
        // Remove if already selected
        if (newSelection.length > 1) {
          setSelectedServices(newSelection.filter((id) => id !== serviceId));
        }
      } else {
        // Add if not selected
        setSelectedServices([...newSelection, serviceId]);
      }
    }
  };

  // Handle month selection
  const handleMonthSelection = (monthId: string) => {
    if (monthId === "all") {
      setSelectedMonths(["all"]);
    } else {
      const newSelection = selectedMonths.filter((id) => id !== "all");
      if (newSelection.includes(monthId)) {
        // Remove if already selected
        if (newSelection.length > 1) {
          setSelectedMonths(newSelection.filter((id) => id !== monthId));
        }
      } else {
        // Add if not selected
        setSelectedMonths([...newSelection, monthId]);
      }
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select
              value={valueType}
              onValueChange={(value: "dollars" | "credits") =>
                setValueType(value)
              }
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Value Type" />
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
              onValueChange={(value: "all" | "6m" | "3m") =>
                setTimeRange(value)
              }
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
              value={viewMode}
              onValueChange={(value: "stacked" | "grouped") =>
                setViewMode(value)
              }
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stacked">Stacked</SelectItem>
                <SelectItem value="grouped">Grouped</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                February 2025 {valueType === "dollars" ? "Spend" : "Usage"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                {valueType === "dollars" ? (
                  <DollarSign className="h-8 w-8 text-green-500 mr-3" />
                ) : (
                  <CreditCard className="h-8 w-8 text-blue-500 mr-3" />
                )}
                <div>
                  <p className="text-2xl font-bold">
                    {valueType === "dollars" && "$"}
                    {valueType === "dollars" ? "34,000" : "4,347,355.65"}
                    {valueType === "credits" && " credits"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Until February 24th, 2025
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                Average Monthly {valueType === "dollars" ? "Spend" : "Usage"}{" "}
                (Last 90 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                {valueType === "dollars" ? (
                  <DollarSign className="h-8 w-8 text-green-500 mr-3" />
                ) : (
                  <CreditCard className="h-8 w-8 text-blue-500 mr-3" />
                )}
                <div>
                  <p className="text-2xl font-bold">
                    {valueType === "dollars" && "$"}
                    {valueType === "dollars" ? "26,017.91" : "3,252,238.68"}
                    {valueType === "credits" && " credits"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Dec 2024 - Feb 2025
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                Average Monthly {valueType === "dollars" ? "Spend" : "Usage"}{" "}
                (All Time)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                {valueType === "dollars" ? (
                  <DollarSign className="h-8 w-8 text-green-500 mr-3" />
                ) : (
                  <CreditCard className="h-8 w-8 text-blue-500 mr-3" />
                )}
                <div>
                  <p className="text-2xl font-bold">
                    {valueType === "dollars" && "$"}
                    {valueType === "dollars" ? "14,901.06" : "1,862,632.50"}
                    {valueType === "credits" && " credits"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Since Beginning (Apr 2024)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service and Month Selection */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Select Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelection(service.id)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${selectedServices.includes(service.id) ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    {service.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Select Months</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {months.map((month) => (
                  <button
                    key={month.id}
                    onClick={() => handleMonthSelection(month.id)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${selectedMonths.includes(month.id) ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    {month.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bar" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="line">Line Chart</TabsTrigger>
          </TabsList>

          <TabsContent value="bar" className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="month"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {viewMode === "stacked" ? (
                  <>
                    {(selectedServices.includes("all") ||
                      selectedServices.includes("emailFinder")) && (
                      <Bar
                        dataKey="emailFinder"
                        name="Email Finder"
                        stackId="a"
                        fill="#2563eb"
                      />
                    )}
                    {(selectedServices.includes("all") ||
                      selectedServices.includes("emailValidation")) && (
                      <Bar
                        dataKey="emailValidation"
                        name="Email Validation"
                        stackId="a"
                        fill="#7c3aed"
                      />
                    )}
                    {(selectedServices.includes("all") ||
                      selectedServices.includes("mobileFinder")) && (
                      <Bar
                        dataKey="mobileFinder"
                        name="Mobile Finder"
                        stackId="a"
                        fill="#0891b2"
                      />
                    )}
                    {(selectedServices.includes("all") ||
                      selectedServices.includes("companySearch")) && (
                      <Bar
                        dataKey="companySearch"
                        name="Company Search"
                        stackId="a"
                        fill="#059669"
                      />
                    )}
                    {(selectedServices.includes("all") ||
                      selectedServices.includes("linkedinFinder")) && (
                      <Bar
                        dataKey="linkedinFinder"
                        name="Email to B2B Profile"
                        stackId="a"
                        fill="#d97706"
                      />
                    )}
                    {(selectedServices.includes("all") ||
                      selectedServices.includes("competitorsSearch")) && (
                      <Bar
                        dataKey="competitorsSearch"
                        name="Competitors Search"
                        stackId="a"
                        fill="#9333ea"
                      />
                    )}
                    {(selectedServices.includes("all") ||
                      selectedServices.includes("personalEmailFinder")) && (
                      <Bar
                        dataKey="personalEmailFinder"
                        name="Personal Email Finder"
                        stackId="a"
                        fill="#ec4899"
                      />
                    )}
                  </>
                ) : (
                  <>
                    {(selectedServices.includes("all") ||
                      selectedServices.includes("emailFinder")) && (
                      <Bar
                        dataKey="emailFinder"
                        name="Email Finder"
                        fill="#2563eb"
                      />
                    )}
                    {(selectedServices.includes("all") ||
                      selectedServices.includes("emailValidation")) && (
                      <Bar
                        dataKey="emailValidation"
                        name="Email Validation"
                        fill="#7c3aed"
                      />
                    )}
                    {(selectedServices.includes("all") ||
                      selectedServices.includes("mobileFinder")) && (
                      <Bar
                        dataKey="mobileFinder"
                        name="Mobile Finder"
                        fill="#0891b2"
                      />
                    )}
                    {(selectedServices.includes("all") ||
                      selectedServices.includes("companySearch")) && (
                      <Bar
                        dataKey="companySearch"
                        name="Company Search"
                        fill="#059669"
                      />
                    )}
                    {(selectedServices.includes("all") ||
                      selectedServices.includes("linkedinFinder")) && (
                      <Bar
                        dataKey="linkedinFinder"
                        name="Email to B2B Profile"
                        fill="#d97706"
                      />
                    )}
                    {(selectedServices.includes("all") ||
                      selectedServices.includes("competitorsSearch")) && (
                      <Bar
                        dataKey="competitorsSearch"
                        name="Competitors Search"
                        fill="#9333ea"
                      />
                    )}
                    {(selectedServices.includes("all") ||
                      selectedServices.includes("personalEmailFinder")) && (
                      <Bar
                        dataKey="personalEmailFinder"
                        name="Personal Email Finder"
                        fill="#ec4899"
                      />
                    )}
                  </>
                )}
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="line" className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="month"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {(selectedServices.includes("all") ||
                  selectedServices.includes("emailFinder")) && (
                  <Line
                    type="monotone"
                    dataKey="emailFinder"
                    name="Email Finder"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                )}
                {(selectedServices.includes("all") ||
                  selectedServices.includes("emailValidation")) && (
                  <Line
                    type="monotone"
                    dataKey="emailValidation"
                    name="Email Validation"
                    stroke="#7c3aed"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                )}
                {(selectedServices.includes("all") ||
                  selectedServices.includes("mobileFinder")) && (
                  <Line
                    type="monotone"
                    dataKey="mobileFinder"
                    name="Mobile Finder"
                    stroke="#0891b2"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                )}
                {(selectedServices.includes("all") ||
                  selectedServices.includes("companySearch")) && (
                  <Line
                    type="monotone"
                    dataKey="companySearch"
                    name="Company Search"
                    stroke="#059669"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                )}
                {(selectedServices.includes("all") ||
                  selectedServices.includes("linkedinFinder")) && (
                  <Line
                    type="monotone"
                    dataKey="linkedinFinder"
                    name="Email to B2B Profile"
                    stroke="#d97706"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                )}
                {(selectedServices.includes("all") ||
                  selectedServices.includes("competitorsSearch")) && (
                  <Line
                    type="monotone"
                    dataKey="competitorsSearch"
                    name="Competitors Search"
                    stroke="#9333ea"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                )}
                {(selectedServices.includes("all") ||
                  selectedServices.includes("personalEmailFinder")) && (
                  <Line
                    type="monotone"
                    dataKey="personalEmailFinder"
                    name="Personal Email Finder"
                    stroke="#ec4899"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>

        {/* AI Insights Section */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-medium mb-3 flex items-center text-blue-800">
            <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
            AI-Enabled Insights
          </h3>
          <ul className="space-y-3">
            {aiInsights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs font-medium text-blue-700">
                    {index + 1}
                  </span>
                </div>
                <p className="text-sm text-blue-800">{insight}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Service Breakdown Analysis
          </h3>
          <p className="text-sm text-slate-600">
            Email Finder represents your highest{" "}
            {valueType === "dollars" ? "cost" : "usage"} at approximately{" "}
            {valueType === "dollars" ? "$22,497.90" : "2,812,237 credits"} in
            February 2025, followed by Mobile Finder at{" "}
            {valueType === "dollars" ? "$4,059.48" : "507,435 credits"}.
            Consider optimizing these services for maximum cost efficiency under
            the annual plan.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageDollarBreakdown;
