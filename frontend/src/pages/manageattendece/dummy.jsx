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
import { LoaderCircle, MoreHorizontalIcon, PlusCircle, CalendarIcon } from "lucide-react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManageAttendance = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/attendance/getUsersAttendance');
        console.log(response.data);

        if (response.data && response.data.usersAttendance) {
          setRequests(response.data.usersAttendance);
          setFilteredRequests(response.data.usersAttendance);
        } else {
          setError("No data found");
        }
      } catch (err) {
        setError("An error occurred while fetching attendance requests.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [searchName, selectedMonth]);

  const filterRequests = () => {
    let filtered = requests;
    if (searchName) {
      filtered = filtered.filter((request) =>
        request.user.fullName.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (selectedMonth) {
      const month = selectedMonth.toLocaleString("default", { month: "long" });
      filtered = filtered.filter((request) =>
        new Date(request.date).toLocaleString("default", { month: "long" }) === month
      );
    }
    setFilteredRequests(filtered);
  };

  // Pagination logic
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              <BreadcrumbLink href="#">Attendance</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* <Button onClick={navigateToTimeOffPage}>
          <PlusCircle size={20} />
          <span className="ml-2">Add Time Off</span>
        </Button> */}
      </div>

      <div className="flex items-center justify-between mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 rounded w-3/6"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <div className="relative">
          <DatePicker
            selected={selectedMonth}
            onChange={(date) => setSelectedMonth(date)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="border p-2 rounded w-full"
            placeholderText="Select month"
          />
          <CalendarIcon
            size={24}
            className="absolute top-2 right-2 text-gray-500 pointer-events-none"
          />
        </div>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>View Attendance Report</CardTitle>
          <CardDescription>Manage and view attendance requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Check-In Time</TableHead>
                <TableHead>Check-Out Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRequests.map((request) => (
                <TableRow
                  key={request._id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(`/dashboard/attendencedetails/${request._id}`)}
                >
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar src="https://via.placeholder.com/50" alt={request.user.fullName || "User"} />
                      <div>
                        <div className="font-medium">{request.user.fullName || "User"}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{request.checkIn?.time || "N/A"}</TableCell>
                  <TableCell>{request.checkOut?.time || "N/A"}</TableCell>
                  <TableCell>
                    {request.duration
                      ? `${request.duration.hours}h ${request.duration.minutes}m ${request.duration.seconds}s`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "present" ? "success" : "warning"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => navigate(`/dashboard/attendencedetails/${request._id}`)}
                        >
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => alert(`Edit ${request.user.fullName}`)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => alert(`Delete ${request.user.fullName}`)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <nav>
              <ul className="flex space-x-2">
                {Array.from({ length: Math.ceil(filteredRequests.length / requestsPerPage) }).map(
                  (_, index) => (
                    <li key={index}>
                      <button
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 rounded ${
                          currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ManageAttendance;
