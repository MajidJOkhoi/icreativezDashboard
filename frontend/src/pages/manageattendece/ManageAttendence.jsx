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
import { LoaderCircle, MoreHorizontalIcon, CalendarIcon } from "lucide-react";
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
        const response = await axios.get("/api/user/getMyAllUsers");
        if (response.data && response.data.myUsers) {
          const formattedData = response.data.myUsers.map((user) => ({
            _id: user._id,
            fullName: user.fullName || "Unknown",
            address: user.address || "Unknown",
            companyId: user.companyId || "N/A",
            contact: user.contact || "N/A",
           
            designation: {
              1: "Administrator",
              2: "Senior Web Developer",
              3: "Junior Web Developer",
              4: "Senior Flutter Developer",
              5: "Junior Flutter Developer",
              6: "Senior Python Developer",
              7: "Junior Python Developer",
              8: "Senior SEO Expert",
              9: "Senior SEO Expert",
            }[user.designation] || "N/A",


            email: user.email || "N/A",
            jobType: {
              1: "Full Time",
              2: "Part Time",
              3: "Full Time Intern",
              4: "Part Time Intern"
            }[user.jobType] || "N/A",
            role: {
              1: "Admin",
              2: "Team Lead",
              3: "User"
            }[user.role] || "N/A",
            status: user.status ? "present" : "absent",
          }));
          
          setRequests(formattedData);
          setFilteredRequests(formattedData);
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
        request.fullName.toLowerCase().includes(searchName.toLowerCase())
        
      );
    }
    if (selectedMonth) {
      const month = selectedMonth.toLocaleString("default", { month: "long" });
      filtered = filtered.filter(
        (request) =>
          new Date(request.date).toLocaleString("default", { month: "long" }) ===
          month
      );
    }
    setFilteredRequests(filtered);
  };

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="h-10 w-10 text-green-600 animate-spin" />
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
      </div>

      <div className="flex items-center justify-between mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 rounded-3xl flex-grow"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        {/* <div className="relative">
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
        </div> */}
      </div>

      <Card className="mt-2 w-full rounded-3xl shadow-sm shadow-green-50 max-w-sm sm:max-w-full">
        <CardHeader>
          <CardTitle>View List Of All Users </CardTitle>
          <CardDescription className='text-red-500'> To Check Attadence Report Click User Record .</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Company ID</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Role</TableHead>
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
                  className="cursor-pointer hover:bg-gray-50 rounded-3xl"
                  onClick={() =>
                    navigate(`/dashboard/attendencedetails/${request._id}`)
                  }
                >
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar
                        src="https://via.placeholder.com/50"
                        alt={request.fullName || "User"}
                      />
                      <div>
                        <div className="font-medium">{request.fullName}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{request.address}</TableCell>
                  <TableCell>{request.companyId}</TableCell>
                  <TableCell>{request.contact}</TableCell>
                  <TableCell>{request.designation}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.jobType}</TableCell>
                  <TableCell>{request.role}</TableCell>
                  <TableCell>


                  <Badge
                        className={`inline-block px-2 py-1 rounded-full text-sm font-semibold text-white hover:bg-gray-500  ${
                          request.status === "present" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {request.status === "present" ? "Present" : "Absent"}
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
                          onClick={() =>
                            navigate(`/dashboard/attendencedetails/${request._id}`)
                          }
                        >
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => alert(`Edit ${request.fullName}`)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => alert(`Delete ${request.fullName}`)}
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
                {Array.from(
                  { length: Math.ceil(filteredRequests.length / requestsPerPage) },
                  (_, index) => (
                    <li key={index}>
                      <Button
                        variant={currentPage === index + 1 ? "primary" : "outline"}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </Button>
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


