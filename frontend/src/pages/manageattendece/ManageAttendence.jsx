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

// Sample data
const sampleRequests = [
  {
    id: "1",
    name: "Ivan Bryant",
    workingHours: "160 hours",
    month: "August",
    jobType: "Full-Time",
    totalLeaves: "3 days",
    approval: "pending",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    name: "Jack Dylen",
    workingHours: "140 hours",
    month: "August",
    jobType: "Part-Time",
    totalLeaves: "2 days",
    approval: "pending",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: "3",
    name: "Jamie Blue",
    workingHours: "180 hours",
    month: "August",
    jobType: "Contract",
    totalLeaves: "1 day",
    approval: "approved",
    avatar: "https://via.placeholder.com/50",
  },
  // Add more sample data here for testing pagination
  {
    id: "4",
    name: "Sarah Johnson",
    workingHours: "160 hours",
    month: "July",
    jobType: "Full-Time",
    totalLeaves: "4 days",
    approval: "approved",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: "5",
    name: "Michael Smith",
    workingHours: "150 hours",
    month: "July",
    jobType: "Part-Time",
    totalLeaves: "2 days",
    approval: "pending",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: "6",
    name: "Emma Brown",
    workingHours: "170 hours",
    month: "June",
    jobType: "Contract",
    totalLeaves: "1 day",
    approval: "approved",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: "7",
    name: "Majid",
    workingHours: "170 hours",
    month: "June",
    jobType: "Contract",
    totalLeaves: "1 day",
    approval: "approved",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: "8",
    name: "Sajid",
    workingHours: "170 hours",
    month: "June",
    jobType: "Contract",
    totalLeaves: "1 day",
    approval: "approved",
    avatar: "https://via.placeholder.com/50",
  },
  // Add more records as needed...
];
const ManageAttendance = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(sampleRequests);
  const [filteredRequests, setFilteredRequests] = useState(sampleRequests);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5);

  const navigateToTimeOffPage = () => {
    // navigate(`/dashboard/time-off/create`);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        // Fetch data here, currently using sample data
        // const response = await axios.get('/api/requests');
        // setRequests(response.data);
        setRequests(sampleRequests); // Use sample data directly
        setFilteredRequests(sampleRequests);
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
        request.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (selectedMonth) {
      const month = selectedMonth.toLocaleString("default", { month: "long" });
      filtered = filtered.filter((request) => request.month === month);
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
         ? <span className="ml-2">Add Time Off</span>
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
                <TableHead>Working Hours</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Total Leaves</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRequests.map((request) => (
                <TableRow
                  key={request.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(`/dashboard/attendencedetails`)}
                >
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar src={request.avatar} alt={request.name} />
                      <div>
                        <div className="font-medium">{request.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{request.workingHours}</TableCell>
                  <TableCell>{request.month}</TableCell>
                  <TableCell>{request.jobType}</TableCell>
                  <TableCell>{request.totalLeaves}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.approval === "approved" ? "success" : "warning"
                      }
                    >
                      {request.approval.charAt(0).toUpperCase() +
                        request.approval.slice(1)}
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
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/dashboard/attendance/edit/${request.id}`)
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/dashboard/attendance/delete/${request.id}`)
                          }
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
            <Pagination
              requestsPerPage={requestsPerPage}
              totalRequests={filteredRequests.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

// Custom Pagination Component
const Pagination = ({ requestsPerPage, totalRequests, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRequests / requestsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${
              currentPage === number ? "font-bold" : ""
            }`}
          >
            <button
              onClick={() => paginate(number)}
              className="px-3 py-1 border rounded"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ManageAttendance;





