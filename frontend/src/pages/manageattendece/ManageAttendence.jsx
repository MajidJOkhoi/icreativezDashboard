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
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MoreHorizontalIcon,
  SearchIcon,
} from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";

const ManageAttendance = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState("");
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
            designation:
              {
                1: "Administrator",
                2: "Senior Web Developer",
                3: "Junior Web Developer",
                4: "Senior Flutter Developer",
                5: "Junior Flutter Developer",
                6: "Senior Python Developer",
                7: "Junior Python Developer",
                8: "Senior SEO Expert",
                9: "Junior SEO Expert",
              }[user.designation] || "N/A",
            email: user.email || "N/A",
            jobType:
              {
                1: "Full Time",
                2: "Part Time",
                3: "Full Time Intern",
                4: "Part Time Intern",
              }[user.jobType] || "N/A",
            role:
              {
                1: "Admin",
                2: "Team Lead",
                3: "User",
              }[user.role] || "N/A",
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
  }, [searchName]);

  const filterRequests = () => {
    let filtered = requests;
    if (searchName) {
      filtered = filtered.filter((request) =>
        request.fullName.toLowerCase().includes(searchName.toLowerCase())
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

  const handleDelete = async (id) => {
    try {
      await axios.put(`/api/user/delete/${id}`);
      toast.success("User deleted successfully");
      setRequests((prev) => prev.filter((request) => request._id !== id));
    } catch (error) {
      toast.error("Error deleting the user");
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getBadgeColor = (type, value) => {
    const colors = {
      designation: {
        Administrator:
          "bg-red-100 text-red-800 text-center shadow-sm hover:bg-green-500 hover:text-white",
        "Senior Web Developer":
          "bg-blue-100 text-blue-800 text-center shadow-sm hover:bg-green-500 hover:text-white",
        "Junior Web Developer":
          "bg-green-100 text-green-800 text-center shadow-sm hover:bg-green-500 hover:text-white",
        "Senior Flutter Developer":
          "bg-yellow-100 text-yellow-800 text-center shadow-sm hover:bg-green-500 hover:text-white",
        "Junior Flutter Developer":
          "bg-orange-100 text-orange-800 text-center shadow-sm hover:bg-green-500 hover:text-white",
        "Senior Python Developer":
          "bg-purple-100 text-purple-800 text-center shadow-sm hover:bg-green-500 hover:text-white",
        "Junior Python Developer":
          "bg-pink-100 text-pink-800 text-center shadow-sm hover:bg-green-500 hover:text-white",
        "Senior SEO Expert":
          "bg-teal-100 text-teal-800 text-center shadow-sm hover:bg-green-500 hover:text-white",
        "Junior SEO Expert":
          "bg-indigo-100 text-indigo-800 text-center shadow-md hover:bg-green-500 hover:text-white",
      },
      jobType: {
        "Full Time":
          "bg-green-100 text-green-800 text-center font-bold shadow-md hover:bg-green-500 hover:text-white ",
        "Part Time":
          "bg-yellow-100 text-yellow-800 text-center font-bold shadow-md hover:bg-green-500 hover:text-white",
        "Full Time Intern":
          "bg-blue-100 text-blue-800  font-bold shadow-md hover:bg-green-500 hover:text-white",
        "Part Time Intern":
          "bg-gray-100 text-blue-800 font-bold shadow-md hover:bg-green-500 hover:text-white",
      },
      role: {
        Admin:
          "bg-red-100 text-red-800 text-center shadow-md font-bold hover:bg-green-500 hover:text-white",
        "Team Lead":
          "bg-blue-100 text-blue-800 text-center shadow-sm font-bold hover:bg-green-500 hover:text-white",
        User: "bg-green-100 text-green-800 text-center shadow-md font-bold hover:bg-green-500 hover:text-white ",
      },
    };

    return (
      colors[type][value] ||
      "bg-red-100 text-red-800 text-center shadow-md font-bold hover:bg-green-500 hover:text-white"
    );
  };

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
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by name"
            className="border p-2 rounded-3xl w-full pr-10 focus:outline-none focus:ring focus:ring-green-200"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <SearchIcon
            size={24}
            className="absolute top-2 right-4 text-gray-500 pointer-events-none"
          />
        </div>
      </div>

      <Card className="mt-2 w-full rounded-3xl shadow-sm  transition-shadow duration-300 max-w-sm sm:max-w-full">
        <CardHeader>
          <CardTitle>View List Of All Users</CardTitle>
          <CardDescription>
            To Check Monthly{" "}
            <span className="text-red-500"> Report Attendance </span> Click User
            Record.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: requestsPerPage }).map((_, index) => (
                  <TableRow key={index} className="cursor-pointer hover:bg-gray-50 rounded-3xl">
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                  </TableRow>
                ))
              ) : currentRequests.length > 0 ? (
                currentRequests.map((request) => (
                  <TableRow key={request._id} className="cursor-pointer hover:bg-gray-50 rounded-3xl"  onClick={() => {
                    navigate(`/dashboard/attendencedetails/${request._id}`);
                  }}>
                    <TableCell>{request.fullName}</TableCell>
                    <TableCell>
                      <Badge className={getBadgeColor("role", request.role)}>
                        {request.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getBadgeColor("jobType", request.jobType)}>
                        {request.jobType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getBadgeColor("designation", request.designation)}>
                        {request.designation}
                      </Badge>
                    </TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.contact}</TableCell>
                    <TableCell>{request.address}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">
                            <MoreHorizontalIcon size={20} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            asChild
                            onClick={() => {
                              navigate(`/dashboard/attendencedetails/${request._id}`);
                            }}
                          >
                            <Link to="#">
                              View Report 
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            asChild
                            onClick={() => handleDelete(request._id)}
                          >
                            <Link to="#">
                              Delete
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-red-500">
                    No records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

         

          </Table>
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

export default ManageAttendance;
