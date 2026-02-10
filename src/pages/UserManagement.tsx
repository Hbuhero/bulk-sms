
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, UserCheck, Edit, Trash2, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserManagement = () => {
  const { toast } = useToast();
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("");

  const users = [
    { 
      id: 1, 
      name: "John Smith", 
      email: "john@company.com", 
      role: "Admin", 
      status: "Active", 
      lastLogin: "2024-07-01",
      campaigns: 45
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      email: "sarah@company.com", 
      role: "Manager", 
      status: "Active", 
      lastLogin: "2024-07-01",
      campaigns: 32
    },
    { 
      id: 3, 
      name: "Mike Wilson", 
      email: "mike@company.com", 
      role: "User", 
      status: "Active", 
      lastLogin: "2024-06-30",
      campaigns: 18
    },
    { 
      id: 4, 
      name: "Emily Davis", 
      email: "emily@company.com", 
      role: "User", 
      status: "Inactive", 
      lastLogin: "2024-06-25",
      campaigns: 8
    },
  ];

  const handleInviteUser = () => {
    if (!newUserEmail || !newUserRole) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${newUserEmail} as ${newUserRole}`,
    });
    setNewUserEmail("");
    setNewUserRole("");
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-500';
      case 'Manager':
        return 'bg-blue-500';
      case 'User':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-500' : 'bg-gray-500';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-gray-600 mt-2">Manage team members and their access permissions.</p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">9</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admins</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <UserCheck className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Invites</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Mail className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invite New User */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Invite New User
          </CardTitle>
          <CardDescription>
            Send an invitation to add a new team member
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="user-email">Email Address</Label>
              <Input
                id="user-email"
                type="email"
                placeholder="Enter email address"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="user-role">Role</Label>
              <Select value={newUserRole} onValueChange={setNewUserRole}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleInviteUser} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                <Mail className="h-4 w-4 mr-2" />
                Send Invite
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserCheck className="h-5 w-5 mr-2" />
            Team Members
          </CardTitle>
          <CardDescription>
            View and manage your team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Last login: {user.lastLogin}</p>
                    <p className="text-sm text-gray-500">{user.campaigns} campaigns created</p>
                    <div className="flex space-x-2 mt-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Overview of permissions for each role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-red-600">Admin</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Full platform access</li>
                <li>• User management</li>
                <li>• Billing & payments</li>
                <li>• System settings</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-600">Manager</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Campaign management</li>
                <li>• Contact list access</li>
                <li>• Template management</li>
                <li>• Reports & analytics</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-green-600">User</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Send campaigns</li>
                <li>• View assigned lists</li>
                <li>• Basic templates</li>
                <li>• Limited reports</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
