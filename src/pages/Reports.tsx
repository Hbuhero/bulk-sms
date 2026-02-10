
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { BarChart, FileText, TrendingUp, Download, Calendar as CalendarIcon, MessageSquare, Mail, Users, Activity } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Reports = () => {
  const [selectedReportType, setSelectedReportType] = useState("sms");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const reportTypes = [
    { value: "sms", label: "SMS Reports", icon: MessageSquare, color: "text-blue-600" },
    { value: "sender", label: "Sender Reports", icon: Users, color: "text-purple-600" },
    { value: "campaign", label: "Campaign Reports", icon: Activity, color: "text-green-600" },
    { value: "channel", label: "Channel Reports", icon: BarChart, color: "text-orange-600" },
  ];

  const getReportData = () => {
    switch (selectedReportType) {
      case "sms":
        return {
          title: "SMS Report",
          description: "Detailed analytics for SMS campaigns",
          stats: [
            { name: "Total SMS Sent", value: "45,678", change: "+12%", color: "text-blue-600" },
            { name: "Delivered", value: "44,215", change: "+11%", color: "text-green-600" },
            { name: "Failed", value: "923", change: "-5%", color: "text-red-600" },
            { name: "Delivery Rate", value: "96.8%", change: "+2.1%", color: "text-purple-600" },
          ]
        };
      case "sender":
        return {
          title: "Sender Report",
          description: "Performance analysis by sender IDs",
          stats: [
            { name: "Active Senders", value: "24", change: "+3", color: "text-blue-600" },
            { name: "Top Performer", value: "MARKETING", change: "98.5%", color: "text-green-600" },
            { name: "Blocked Senders", value: "2", change: "0", color: "text-red-600" },
            { name: "Avg. Success Rate", value: "94.2%", change: "+1.8%", color: "text-purple-600" },
          ]
        };
      case "campaign":
        return {
          title: "Campaign Report",
          description: "Comprehensive campaign performance metrics",
          stats: [
            { name: "Total Campaigns", value: "156", change: "+18", color: "text-blue-600" },
            { name: "Active Campaigns", value: "23", change: "+5", color: "text-green-600" },
            { name: "Completed", value: "133", change: "+13", color: "text-purple-600" },
            { name: "Success Rate", value: "92.3%", change: "+3.1%", color: "text-orange-600" },
          ]
        };
      case "channel":
        return {
          title: "Channel Report",
          description: "Multi-channel communication analysis",
          stats: [
            { name: "SMS Messages", value: "45,678", change: "+12%", color: "text-blue-600" },
            { name: "Email Messages", value: "23,456", change: "+8%", color: "text-green-600" },
            { name: "WhatsApp Messages", value: "12,345", change: "+25%", color: "text-emerald-600" },
            { name: "Total Reach", value: "81,479", change: "+15%", color: "text-purple-600" },
          ]
        };
      default:
        return {
          title: "SMS Report",
          description: "Detailed analytics for SMS campaigns",
          stats: []
        };
    }
  };

  const reportData = getReportData();

  const topCampaigns = [
    { name: "Summer Sale SMS", type: "SMS", sent: 2340, delivered: 2305, rate: "98.5%" },
    { name: "Weekly Newsletter", type: "Email", sent: 5678, delivered: 5521, rate: "97.2%" },
    { name: "Product Launch", type: "SMS", sent: 1250, delivered: 1213, rate: "97.0%" },
    { name: "Welcome Series", type: "Email", sent: 3200, delivered: 3072, rate: "96.0%" },
  ];

  const monthlyChartData = [
    { month: "Jan", day: "01", sms: 12500, email: 8900 },
    { month: "Feb", day: "01", sms: 15200, email: 9800 },
    { month: "Mar", day: "01", sms: 18900, email: 11200 },
    { month: "Apr", day: "01", sms: 16800, email: 12100 },
    { month: "May", day: "01", sms: 22100, email: 13800 },
    { month: "Jun", day: "01", sms: 25400, email: 15200 },
  ];

  const chartConfig = {
    sms: {
      label: "SMS Sent",
      color: "#3b82f6",
    },
    email: {
      label: "Email Sent",
      color: "#10b981",
    },
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Report Generator</h1>
          <p className="text-gray-600 mt-2">Generate detailed reports for your communication channels.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Report Configuration
          </CardTitle>
          <CardDescription>
            Select report type and date range to generate your custom report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Report Type Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center">
                        <type.icon className={`h-4 w-4 mr-2 ${type.color}`} />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick end date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="mt-6">
            <Button className="w-full">
              <BarChart className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {(() => {
              const selectedType = reportTypes.find(type => type.value === selectedReportType);
              if (selectedType) {
                const IconComponent = selectedType.icon;
                return <IconComponent className={`h-5 w-5 mr-2 ${selectedType.color}`} />;
              }
              return null;
            })()}
            {reportData.title}
          </CardTitle>
          <CardDescription>
            {reportData.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reportData.stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-sm ${stat.color} font-medium`}>
                        <TrendingUp className="h-3 w-3 inline mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-100">
                      <BarChart className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Channel Performance Trends
          </CardTitle>
          <CardDescription>
            Multi-channel communication performance over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            sms: { label: "SMS", color: "#3b82f6" },
            email: { label: "Email", color: "#10b981" },
            whatsapp: { label: "WhatsApp", color: "#25D366" }
          }} className="h-[400px]">
            <LineChart data={[
              { month: "Jan", sms: 12500, email: 8900, whatsapp: 3200 },
              { month: "Feb", sms: 15200, email: 9800, whatsapp: 4100 },
              { month: "Mar", sms: 18900, email: 11200, whatsapp: 5300 },
              { month: "Apr", sms: 16800, email: 12100, whatsapp: 6200 },
              { month: "May", sms: 22100, email: 13800, whatsapp: 7800 },
              { month: "Jun", sms: 25400, email: 15200, whatsapp: 9100 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="sms" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                name="SMS"
              />
              <Line 
                type="monotone" 
                dataKey="email" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                name="Email"
              />
              <Line 
                type="monotone" 
                dataKey="whatsapp" 
                stroke="#25D366" 
                strokeWidth={3}
                dot={{ fill: "#25D366", strokeWidth: 2, r: 4 }}
                name="WhatsApp"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Report Summary Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
              SMS Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold">96.8%</p>
              <p className="text-sm text-gray-600">Delivery Rate</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Sent</span>
                <span className="font-medium">45,678</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivered</span>
                <span className="text-green-600 font-medium">44,215</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Failed</span>
                <span className="text-red-600 font-medium">923</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-green-600" />
              Email Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold">94.2%</p>
              <p className="text-sm text-gray-600">Delivery Rate</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Sent</span>
                <span className="font-medium">23,456</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivered</span>
                <span className="text-green-600 font-medium">22,095</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Bounced</span>
                <span className="text-red-600 font-medium">1,361</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaWhatsapp className="h-5 w-5 mr-2" style={{ color: '#25D366' }} />
              WhatsApp Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold">98.1%</p>
              <p className="text-sm text-gray-600">Delivery Rate</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Sent</span>
                <span className="font-medium">12,345</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivered</span>
                <span className="text-green-600 font-medium">12,111</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Failed</span>
                <span className="text-red-600 font-medium">234</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default Reports;
