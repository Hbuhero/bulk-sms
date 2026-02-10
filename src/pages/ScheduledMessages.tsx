
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MessageSquare, Mail, Play, Pause, Trash2 } from "lucide-react";

const ScheduledMessages = () => {
  const scheduledMessages = [
    {
      id: 1,
      type: "SMS",
      title: "Flash Sale Reminder",
      scheduledFor: "2024-07-03 10:00 AM",
      recipients: 2500,
      status: "Scheduled",
      content: "🔥 Flash Sale starts in 1 hour! Don't miss 50% off everything!"
    },
    {
      id: 2,
      type: "Email",
      title: "Weekly Newsletter",
      scheduledFor: "2024-07-05 08:00 AM",
      recipients: 5670,
      status: "Scheduled",
      content: "Your weekly dose of industry insights and company updates..."
    },
    {
      id: 3,
      type: "SMS",
      title: "Appointment Confirmation",
      scheduledFor: "2024-07-04 09:00 AM",
      recipients: 150,
      status: "Paused",
      content: "Reminder: Your appointment is tomorrow at 2 PM. Reply YES to confirm."
    },
    {
      id: 4,
      type: "Email",
      title: "Product Launch Announcement",
      scheduledFor: "2024-07-06 12:00 PM",
      recipients: 3200,
      status: "Scheduled",
      content: "We're excited to announce our latest product launch..."
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-500';
      case 'Paused':
        return 'bg-yellow-500';
      case 'Completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Scheduled Messages</h1>
        <p className="text-gray-600 mt-2">Manage your scheduled SMS and email campaigns.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled SMS</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled Emails</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Mail className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Recipients</p>
                <p className="text-2xl font-bold">11,520</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Messages List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Scheduled Campaigns
          </CardTitle>
          <CardDescription>
            View and manage your scheduled SMS and email campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledMessages.map((message) => (
              <div key={message.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${message.type === 'SMS' ? 'bg-blue-100' : 'bg-green-100'}`}>
                      {message.type === 'SMS' ? (
                        <MessageSquare className={`h-4 w-4 ${message.type === 'SMS' ? 'text-blue-600' : 'text-green-600'}`} />
                      ) : (
                        <Mail className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{message.title}</h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {message.scheduledFor}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {message.recipients.toLocaleString()} recipients
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(message.status)}>
                      {message.status}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Pause className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <p className="text-gray-700">{message.content.substring(0, 100)}...</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduledMessages;
