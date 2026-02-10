import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Inbox, MessageSquare, Mail, Search, Filter, RefreshCw } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Outbox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const messages = [
    {
      id: 1,
      type: "SMS",
      title: "Summer Sale Alert",
      recipients: 2340,
      status: "Delivered",
      sentAt: "2024-07-01 14:30",
      deliveryRate: "98.5%",
      content: "🌞 Summer Sale is live! Get 50% off everything. Shop now!"
    },
    {
      id: 2,
      type: "Email",
      title: "Weekly Newsletter #45",
      recipients: 5678,
      status: "Delivered", 
      sentAt: "2024-06-30 09:00",
      deliveryRate: "97.2%",
      content: "Your weekly dose of industry insights and company updates..."
    },
    {
      id: 3,
      type: "SMS",
      title: "Product Launch Reminder",
      recipients: 1250,
      status: "Sending",
      sentAt: "2024-07-02 10:15",
      deliveryRate: "45.2%",
      content: "🚀 Our new product launches tomorrow! Be the first to try it."
    },
    {
      id: 4,
      type: "Email",
      title: "Cart Abandonment Follow-up",
      recipients: 890,
      status: "Failed",
      sentAt: "2024-07-01 16:45",
      deliveryRate: "0%",
      content: "You left something in your cart. Complete your purchase now!"
    },
    {
      id: 5,
      type: "SMS",
      title: "Appointment Confirmation",
      recipients: 423,
      status: "Scheduled",
      sentAt: "2024-07-03 08:00",
      deliveryRate: "0%",
      content: "Reminder: Your appointment is confirmed for tomorrow at 2 PM."
    },
    {
      id: 6,
      type: "WhatsApp",
      title: "WhatsApp Promotion",
      recipients: 1850,
      status: "Delivered",
      sentAt: "2024-07-01 12:00",
      deliveryRate: "99.1%",
      content: "🎉 Exclusive WhatsApp offer! Get 30% off your next purchase."
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500';
      case 'Sending':
        return 'bg-blue-500';
      case 'Scheduled':
        return 'bg-yellow-500';
      case 'Failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDeliveryRateColor = (rate: string) => {
    const numRate = parseFloat(rate.replace('%', ''));
    if (numRate >= 95) return 'text-green-600';
    if (numRate >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || message.type.toLowerCase() === filterType;
    const matchesStatus = filterStatus === 'all' || message.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Outbox</h1>
        <p className="text-gray-600 mt-2">View all your sent, scheduled, and failed SMS and email campaigns.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sent</p>
                <p className="text-2xl font-bold">126</p>
              </div>
              <Inbox className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">SMS Sent</p>
                <p className="text-2xl font-bold">78</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emails Sent</p>
                <p className="text-2xl font-bold">48</p>
              </div>
              <Mail className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">WhatsApp Sent</p>
                <p className="text-2xl font-bold">32</p>
              </div>
              <FaWhatsapp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivery Rate</p>
                <p className="text-2xl font-bold">96.8%</p>
              </div>
              <RefreshCw className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sms">SMS Only</SelectItem>
                <SelectItem value="email">Email Only</SelectItem>
                <SelectItem value="whatsapp">WhatsApp Only</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="sending">Sending</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Inbox className="h-5 w-5 mr-2" />
            Campaign History
          </CardTitle>
          <CardDescription>
            View details of all your sent campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div key={message.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      message.type === 'SMS' ? 'bg-blue-100' : 
                      message.type === 'WhatsApp' ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      {message.type === 'SMS' ? (
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                      ) : message.type === 'WhatsApp' ? (
                        <FaWhatsapp className="h-4 w-4 text-green-600" />
                      ) : (
                        <Mail className="h-4 w-4 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{message.title}</h3>
                      <p className="text-sm text-gray-600">
                        Sent to {message.recipients.toLocaleString()} recipients • {message.sentAt}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getStatusColor(message.status)}>
                          {message.status}
                        </Badge>
                        <span className={`text-sm font-medium ${getDeliveryRateColor(message.deliveryRate)}`}>
                          {message.deliveryRate} delivered
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link to={`/outbox/${message.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <p className="text-gray-700">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Outbox;
