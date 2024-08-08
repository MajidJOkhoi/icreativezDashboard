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
import { ChevronLeft, ChevronRight, LoaderCircle, MoreHorizontalIcon, PlusCircle } from "lucide-react";
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

const ManageLeave = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5; // Number of requests to display per page

  const navigateToTimeOffPage = () => {
    navigate(`/dashboard/time-off/create`);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/leave/getAllLeaves');
        console.log(response.data);
        const data = response.data.allLeaves.map((leave) => ({
          id: leave._id,
          
          teamhead_id : leave.teamHead._id,
          teamhead : leave.teamHead.fullName,

          userid:leave.user._id,

          name: leave.user.fullName,
          role: leave.user.email,
          duration: `${leave.totalDays} days`,
          date: `${leave.intialDate} - ${leave.endDate}`,
          type: "Leave",
          reason: leave.description,
          approval: "pending", // assuming approval status isn't provided by API
          avatar: "https://via.placeholder.com/50", // replace with actual avatar if available
        }));
        setRequests(data);
       
        
      } catch (err) {
        setError("An error occurred while fetching Leaves requests.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Logic for displaying current requests
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="h-10 w-10 text-green-500 animate-spin" />
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
        {/* <Button onClick={navigateToTimeOffPage}>
          <PlusCircle size={20} />
          <span className="ml-2">Add Time Off</span>
        </Button> */}
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>{requests.length} Requests</CardTitle>
          <CardDescription>Manage and view Leaves <span className="text-red-500"> Click Record  </span> For More Details .</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <div className="flex space-x-4 mb-4">
            <Badge variant="outline">Pending 12</Badge>
            <Badge variant="outline">Approved 12</Badge>
            <Badge variant="outline">Rejected 12</Badge>
          </div> */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead> Team Head </TableHead>
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
              {currentRequests.map((request) => (
                <TableRow
                  key={request.userid}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(`/dashboard/managetimedetails/${request.userid}`)}
                >
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar src={request.avatar} alt={request.name} />
                      <div>
                        <div className="font-medium">{request.name}</div>
                        <div className="text-sm text-gray-500">{request.role}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell> {request.teamhead} </TableCell>
                  <TableCell>{request.duration}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>
                    <Badge
                      variant={request.approval === "approved" ? "success" : "warning"}
                    >
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
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/Leaves/edit/${request._id}`)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/Leaves/delete/${request._id}`)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <Button
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
              variant="ghost"
            >
              <ChevronLeft />
            </Button>
            <span>Page {currentPage} of {Math.ceil(requests.length / requestsPerPage)}</span>
            <Button
              disabled={currentPage === Math.ceil(requests.length / requestsPerPage)}
              onClick={() => paginate(currentPage + 1)}
              variant="ghost"
            >
              <ChevronRight />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ManageLeave;
