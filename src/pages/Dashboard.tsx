import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { MessageSquare, Mail, Users, Send, TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle, Activity } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [smsBalance] = useState(5247);
  const [emailCredits] = useState(12500);
  const [whatsappCredits] = useState(8750);
  const [selectedMonth, setSelectedMonth] = useState("june");

  const monthlyData = {
    june: [
      { day: 1, sms: 1200, email: 800, whatsapp: 650 },
      { day: 2, sms: 1350, email: 920, whatsapp: 720 },
      { day: 3, sms: 1100, email: 750, whatsapp: 580 },
      { day: 4, sms: 1450, email: 1100, whatsapp: 890 },
      { day: 5, sms: 1600, email: 1200, whatsapp: 980 },
      { day: 6, sms: 1300, email: 950, whatsapp: 740 },
      { day: 7, sms: 1750, email: 1350, whatsapp: 1120 },
      { day: 8, sms: 1400, email: 1000, whatsapp: 820 },
      { day: 9, sms: 1550, email: 1150, whatsapp: 930 },
      { day: 10, sms: 1650, email: 1250, whatsapp: 1050 },
      { day: 11, sms: 1200, email: 850, whatsapp: 680 },
      { day: 12, sms: 1800, email: 1400, whatsapp: 1180 },
      { day: 13, sms: 1500, email: 1100, whatsapp: 880 },
      { day: 14, sms: 1350, email: 980, whatsapp: 760 },
      { day: 15, sms: 1900, email: 1500, whatsapp: 1240 },
      { day: 16, sms: 1650, email: 1200, whatsapp: 980 },
      { day: 17, sms: 1400, email: 1050, whatsapp: 820 },
      { day: 18, sms: 1750, email: 1300, whatsapp: 1080 },
      { day: 19, sms: 1550, email: 1150, whatsapp: 920 },
      { day: 20, sms: 1850, email: 1450, whatsapp: 1200 },
      { day: 21, sms: 1600, email: 1200, whatsapp: 960 },
      { day: 22, sms: 1450, email: 1000, whatsapp: 830 },
      { day: 23, sms: 1700, email: 1250, whatsapp: 1020 },
      { day: 24, sms: 1500, email: 1100, whatsapp: 870 },
      { day: 25, sms: 2000, email: 1600, whatsapp: 1350 },
      { day: 26, sms: 1800, email: 1400, whatsapp: 1150 },
      { day: 27, sms: 1650, email: 1250, whatsapp: 1000 },
      { day: 28, sms: 1900, email: 1500, whatsapp: 1220 },
      { day: 29, sms: 1750, email: 1350, whatsapp: 1100 },
      { day: 30, sms: 2100, email: 1700, whatsapp: 1420 },
    ],
    may: [
      { day: 1, sms: 1100, email: 750, whatsapp: 600 },
      { day: 2, sms: 1250, email: 820, whatsapp: 680 },
      { day: 3, sms: 1000, email: 650, whatsapp: 520 },
      { day: 4, sms: 1350, email: 1000, whatsapp: 820 },
      { day: 5, sms: 1500, email: 1100, whatsapp: 890 },
      { day: 6, sms: 1200, email: 850, whatsapp: 680 },
      { day: 7, sms: 1650, email: 1250, whatsapp: 1020 },
      { day: 8, sms: 1300, email: 900, whatsapp: 750 },
      { day: 9, sms: 1450, email: 1050, whatsapp: 860 },
      { day: 10, sms: 1550, email: 1150, whatsapp: 930 },
      { day: 11, sms: 1100, email: 750, whatsapp: 600 },
      { day: 12, sms: 1700, email: 1300, whatsapp: 1050 },
      { day: 13, sms: 1400, email: 1000, whatsapp: 820 },
      { day: 14, sms: 1250, email: 880, whatsapp: 720 },
      { day: 15, sms: 1800, email: 1400, whatsapp: 1150 },
      { day: 16, sms: 1550, email: 1100, whatsapp: 890 },
      { day: 17, sms: 1300, email: 950, whatsapp: 770 },
      { day: 18, sms: 1650, email: 1200, whatsapp: 980 },
      { day: 19, sms: 1450, email: 1050, whatsapp: 860 },
      { day: 20, sms: 1750, email: 1350, whatsapp: 1100 },
      { day: 21, sms: 1500, email: 1100, whatsapp: 880 },
      { day: 22, sms: 1350, email: 900, whatsapp: 750 },
      { day: 23, sms: 1600, email: 1150, whatsapp: 940 },
      { day: 24, sms: 1400, email: 1000, whatsapp: 820 },
      { day: 25, sms: 1900, email: 1500, whatsapp: 1230 },
      { day: 26, sms: 1700, email: 1300, whatsapp: 1070 },
      { day: 27, sms: 1550, email: 1150, whatsapp: 930 },
      { day: 28, sms: 1800, email: 1400, whatsapp: 1150 },
      { day: 29, sms: 1650, email: 1250, whatsapp: 1020 },
      { day: 30, sms: 2000, email: 1600, whatsapp: 1320 },
      { day: 31, sms: 1850, email: 1450, whatsapp: 1200 },
    ],
    april: [
      { day: 1, sms: 1000, email: 700, whatsapp: 550 },
      { day: 2, sms: 1150, email: 770, whatsapp: 620 },
      { day: 3, sms: 900, email: 600, whatsapp: 480 },
      { day: 4, sms: 1250, email: 950, whatsapp: 750 },
      { day: 5, sms: 1400, email: 1050, whatsapp: 820 },
      { day: 6, sms: 1100, email: 800, whatsapp: 630 },
      { day: 7, sms: 1550, email: 1200, whatsapp: 950 },
      { day: 8, sms: 1200, email: 850, whatsapp: 680 },
      { day: 9, sms: 1350, email: 1000, whatsapp: 790 },
      { day: 10, sms: 1450, email: 1100, whatsapp: 860 },
      { day: 11, sms: 1000, email: 700, whatsapp: 550 },
      { day: 12, sms: 1600, email: 1250, whatsapp: 980 },
      { day: 13, sms: 1300, email: 950, whatsapp: 750 },
      { day: 14, sms: 1150, email: 830, whatsapp: 660 },
      { day: 15, sms: 1700, email: 1350, whatsapp: 1050 },
      { day: 16, sms: 1450, email: 1050, whatsapp: 820 },
      { day: 17, sms: 1200, email: 900, whatsapp: 710 },
      { day: 18, sms: 1550, email: 1150, whatsapp: 900 },
      { day: 19, sms: 1350, email: 1000, whatsapp: 790 },
      { day: 20, sms: 1650, email: 1300, whatsapp: 1020 },
      { day: 21, sms: 1400, email: 1050, whatsapp: 820 },
      { day: 22, sms: 1250, email: 850, whatsapp: 680 },
      { day: 23, sms: 1500, email: 1100, whatsapp: 860 },
      { day: 24, sms: 1300, email: 950, whatsapp: 750 },
      { day: 25, sms: 1800, email: 1450, whatsapp: 1130 },
      { day: 26, sms: 1600, email: 1250, whatsapp: 980 },
      { day: 27, sms: 1450, email: 1100, whatsapp: 860 },
      { day: 28, sms: 1700, email: 1350, whatsapp: 1050 },
      { day: 29, sms: 1550, email: 1200, whatsapp: 940 },
      { day: 30, sms: 1900, email: 1550, whatsapp: 1220 },
    ],
  };

  const chartConfig = {
    sms: {
      label: "SMS Sent",
      color: "#3b82f6",
    },
    email: {
      label: "Email Sent",
      color: "#10b981",
    },
    whatsapp: {
      label: "WhatsApp Sent",
      color: "#25d366",
    },
  };

  const stats = [
    {
      title: "SMS Balance",
      value: smsBalance.toLocaleString(),
      icon: MessageSquare,
      color: "bg-blue-500",
      change: "+12.5%",
      trend: "up"
    },
    {
      title: "Email Credits",
      value: emailCredits.toLocaleString(),
      icon: Mail,
      color: "bg-green-500",
      change: "+8.2%",
      trend: "up"
    },
    {
      title: "WhatsApp Credits",
      value: whatsappCredits.toLocaleString(),
      icon: FaWhatsapp,
      color: "bg-green-600",
      change: "+15.8%",
      trend: "up"
    },
    {
      title: "Total Contacts",
      value: "8,547",
      icon: Users,
      color: "bg-purple-500",
      change: "+4.1%",
      trend: "up"
    },
    {
      title: "Campaigns Sent",
      value: "126",
      icon: Send,
      color: "bg-orange-500",
      change: "-2.3%",
      trend: "down"
    }
  ];

  const quickActions = [
    { title: "Send SMS", icon: MessageSquare, color: "bg-blue-500", link: "/send-sms" },
    { title: "Create Template", icon: Mail, color: "bg-green-500", link: "/sms-templates" },
    { title: "Manage Contacts", icon: Users, color: "bg-purple-500", link: "/contacts" },
    { title: "View Reports", icon: Activity, color: "bg-orange-500", link: "/reports" }
  ];

  const deliveryData = [
    { name: "Delivered", value: 8540, color: "#10b981" },
    { name: "Pending", value: 1250, color: "#f59e0b" },
    { name: "Failed", value: 210, color: "#ef4444" },
  ];

  const recentActivity = [
    { 
      id: 1, 
      action: "SMS Campaign Sent", 
      details: "Summer Sale - 2,340 recipients", 
      time: "2 hours ago",
      status: "success",
      icon: CheckCircle
    },
    { 
      id: 2, 
      action: "Email Template Created", 
      details: "Newsletter #45", 
      time: "4 hours ago",
      status: "info",
      icon: Mail
    },
    { 
      id: 3, 
      action: "Contact List Updated", 
      details: "VIP Customers - 150 new contacts", 
      time: "6 hours ago",
      status: "success",
      icon: Users
    },
    { 
      id: 4, 
      action: "SMS Credits Purchased", 
      details: "5,000 SMS credits", 
      time: "1 day ago",
      status: "warning",
      icon: AlertCircle
    },
  ];

  const getMonthName = (monthKey: string) => {
    const monthNames = {
      june: "June 2024",
      may: "May 2024",
      april: "April 2024"
    };
    return monthNames[monthKey as keyof typeof monthNames];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-green-600 bg-green-50";
      case "warning": return "text-yellow-600 bg-yellow-50";
      case "info": return "text-blue-600 bg-blue-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-8 p-6 bg-background min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Welcome back! Here's what's happening with your campaigns.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-200 px-2 py-1 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
            System Online
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <div className="flex items-center space-x-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-4 rounded-2xl ${stat.color} shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-md border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>Get things done faster with these shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-24 flex-col space-y-2 hover:scale-105 transition-transform"
                onClick={() => window.location.href = action.link}
              >
                <div className={`p-3 rounded-lg ${action.color}`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly SMS vs Email Chart - Full Width */}
      <Card className="shadow-md border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                SMS vs Email vs WhatsApp Sent - Daily View
              </CardTitle>
              <CardDescription>
                Daily SMS, email and WhatsApp sent for {getMonthName(selectedMonth)}
              </CardDescription>
            </div>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="june">June 2024</SelectItem>
                <SelectItem value="may">May 2024</SelectItem>
                <SelectItem value="april">April 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData[selectedMonth as keyof typeof monthlyData]} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="day" 
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
                  activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                  name="SMS Sent"
                />
                <Line 
                  type="monotone" 
                  dataKey="email" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                  name="Email Sent"
                />
                <Line 
                  type="monotone" 
                  dataKey="whatsapp" 
                  stroke="#25d366" 
                  strokeWidth={3}
                  dot={{ fill: "#25d366", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#25d366", strokeWidth: 2 }}
                  name="WhatsApp Sent"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Bottom Section - Recent Activity and Delivery Status side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-gray-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.details}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{activity.time}</p>
                    <Badge variant="outline" className="text-xs">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Delivery Status Chart */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Delivery Status
            </CardTitle>
            <CardDescription>Message delivery breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliveryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deliveryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {deliveryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
