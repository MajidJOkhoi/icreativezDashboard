import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { LoaderCircle, MoreHorizontalIcon, PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";

const sampleRequests = [
  {
    id: "1",
    name: "Ivan Bryant",
    role: "Product Designer",
    duration: "3 days",
    date: "23rd - 25th Aug 2022",
    type: "Sick Leave",
    reason: "Sick Leave",
    approval: "pending",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    name: "Jack Dylen",
    role: "UI/UX Designer",
    duration: "2 days",
    date: "26th - 27th Aug 2022",
    type: "PTO",
    reason: "Personal Time Off",
    approval: "pending",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: "3",
    name: "Jamie Blue",
    role: "Project Manager",
    duration: "1 day",
    date: "27th Aug 2022",
    type: "Parent Duty",
    reason: "Parent Duty",
    approval: "approved",
    avatar: "https://via.placeholder.com/50",
  },
];

const ManageLeave = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(sampleRequests);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const navigateToTimeOffPage = () => {
    navigate(`/dashboard/time-off/create`);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        // Fetch data here, currently using sample data
        // const response = await axios.get('/api/requests');
        // setRequests(response.data);
        setRequests(sampleRequests); // Use sample data directly
      } catch (err) {
        setError("An error occurred while fetching Leaves requests.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Leaves</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button onClick={navigateToTimeOffPage}>
          <PlusCircle size={20} />
          <span className="ml-2">Add Time Off</span>
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>32 Requests</CardTitle>
          <CardDescription>Manage and view Leaves requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <Badge variant="outline">Pending 12</Badge>
            <Badge variant="outline">Approved 12</Badge>
            <Badge variant="outline">Rejected 12</Badge>
          </div>
          <Table>
          
            <TableHeader>
         
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
              
          
            </TableHeader>


            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}  className="cursor-pointer hover:bg-gray-100"  onClick={() => navigate(`/dashboard/managetimedetails`)} >
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar src={request.avatar} alt={request.name} />
                      <div>
                        <div className="font-medium">{request.name}</div>
                        <div className="text-sm text-gray-500">{request.role}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{request.duration}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>
                    <Badge variant={request.approval === "approved" ? "success" : "warning"}>
                      {request.approval.charAt(0).toUpperCase() + request.approval.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/Leaves/edit/${request.id}`)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/Leaves/delete/${request.id}`)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
              
             
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default ManageLeave;
