import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Search, MessageSquare, Mail, CheckCircle, XCircle, Clock, AlertCircle, MoreHorizontal, Eye } from "lucide-react";

const OutboxDetails = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("sentAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Mock campaign data - in real app, this would come from API
  const campaign = {
    id: parseInt(id || "1"),
    type: id === "1" ? "SMS" : "Email",
    title: id === "1" ? "Summer Sale Alert" : "Weekly Newsletter #45",
    content: id === "1" ? "🌞 Summer Sale is live! Get 50% off everything. Shop now!" : "Your weekly dose of industry insights and company updates...",
    totalRecipients: 2340,
    sentAt: "2024-07-01 14:30",
    status: "Delivered",
    deliveryRate: "98.5%"
  };

  // Mock individual message data with phone numbers for SMS and emails for Email
  const messageDetails = Array.from({ length: 2340 }, (_, index) => ({
    id: index + 1,
    recipient: campaign.type === "SMS" 
      ? `+1${Math.floor(1000000000 + Math.random() * 9000000000)}` 
      : `user${index + 1}@example.com`,
    status: Math.random() > 0.02 ? (Math.random() > 0.1 ? 'Delivered' : Math.random() > 0.5 ? 'Sent' : 'Failed') : 'Failed',
    sentAt: new Date(2024, 6, 1, 14, 30 + Math.floor(Math.random() * 120)).toISOString(),
    deliveredAt: Math.random() > 0.1 ? new Date(2024, 6, 1, 14, 35 + Math.floor(Math.random() * 60)).toISOString() : null,
    errorMessage: Math.random() > 0.9 ? 'Invalid number' : null
  }));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Sent':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500';
      case 'Sent':
        return 'bg-blue-500';
      case 'Failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleViewDetails = (message: any) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  // Filter and sort data
  const filteredData = messageDetails.filter(item => {
    const matchesSearch = item.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'recipient':
        aValue = a.recipient;
        bValue = b.recipient;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'sentAt':
        aValue = new Date(a.sentAt).getTime();
        bValue = new Date(b.sentAt).getTime();
        break;
      case 'deliveredAt':
        aValue = a.deliveredAt ? new Date(a.deliveredAt).getTime() : 0;
        bValue = b.deliveredAt ? new Date(b.deliveredAt).getTime() : 0;
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => setCurrentPage(i)}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if current page is far from start
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => setCurrentPage(i)}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if current page is far from end
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always show last page
      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              isActive={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="cursor-pointer"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/outbox">
          <Button variant="ghost" size="sm" className="h-10 px-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-all duration-200">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Outbox
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Campaign Details</h1>
          <p className="text-gray-600 mt-2">Detailed delivery status for "{campaign.title}"</p>
        </div>
      </div>

      {/* Campaign Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${campaign.type === 'SMS' ? 'bg-blue-100' : 'bg-green-100'}`}>
              {campaign.type === 'SMS' ? (
                <MessageSquare className="h-6 w-6 text-blue-600" />
              ) : (
                <Mail className="h-6 w-6 text-green-600" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{campaign.title}</h2>
              <p className="text-gray-600 mt-1">
                {campaign.type} Campaign • Sent on {campaign.sentAt} • {campaign.totalRecipients.toLocaleString()} recipients
              </p>
              <div className="flex items-center space-x-4 mt-3">
                <Badge className={getStatusColor(campaign.status)}>
                  {campaign.status}
                </Badge>
                <span className="text-sm font-medium text-green-600">
                  {campaign.deliveryRate} delivery rate
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded mt-4">
                <p className="text-sm text-gray-700">{campaign.content}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={`Search ${campaign.type === 'SMS' ? 'phone numbers' : 'email addresses'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sentAt">Sent Time</SelectItem>
                <SelectItem value="recipient">Recipient</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="deliveredAt">Delivered Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Details</CardTitle>
          <CardDescription>
            Showing {paginatedData.length} of {filteredData.length} messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('recipient')}
                  >
                    {campaign.type === 'SMS' ? 'Phone Number' : 'Email Address'}
                    {sortBy === 'recipient' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('status')}
                  >
                    Status
                    {sortBy === 'status' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('sentAt')}
                  >
                    Sent At
                    {sortBy === 'sentAt' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('deliveredAt')}
                  >
                    Delivered At
                    {sortBy === 'deliveredAt' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </TableHead>
                  <TableHead>Error</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">{message.recipient}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(message.status)}
                        <Badge className={getStatusColor(message.status)}>
                          {message.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(message.sentAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                    <TableCell>
                      {message.deliveredAt ? (
                        new Date(message.deliveredAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {message.errorMessage ? (
                        <span className="text-red-600 text-sm">{message.errorMessage}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48" align="end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => handleViewDetails(message)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Modern Pagination */}
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {renderPaginationItems()}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <div className="text-sm text-gray-500 mt-4 text-center">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
          </div>
        </CardContent>
      </Card>

      {/* Message Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              Complete information for this {campaign.type.toLowerCase()} message
            </DialogDescription>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-6">
              {/* Campaign Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Campaign Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Campaign:</span>
                    <p className="font-medium">{campaign.title}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <p className="font-medium">{campaign.type}</p>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Message Content</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="text-sm text-gray-700">{campaign.content}</p>
                </div>
              </div>

              {/* Recipient Details */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Recipient Details</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-500">{campaign.type === 'SMS' ? 'Phone Number:' : 'Email Address:'}</span>
                    <span className="font-medium">{selectedMessage.recipient}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-500">Status:</span>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedMessage.status)}
                      <Badge className={getStatusColor(selectedMessage.status)}>
                        {selectedMessage.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-500">Sent At:</span>
                    <span className="font-medium">
                      {new Date(selectedMessage.sentAt).toLocaleString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-500">Delivered At:</span>
                    <span className="font-medium">
                      {selectedMessage.deliveredAt ? (
                        new Date(selectedMessage.deliveredAt).toLocaleString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })
                      ) : (
                        <span className="text-gray-400">Not delivered</span>
                      )}
                    </span>
                  </div>
                  {selectedMessage.errorMessage && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-500">Error Message:</span>
                      <span className="text-red-600 font-medium">{selectedMessage.errorMessage}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Details */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Technical Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Message ID:</span>
                    <p className="font-mono text-xs">{selectedMessage.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Campaign ID:</span>
                    <p className="font-mono text-xs">{campaign.id}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OutboxDetails;
