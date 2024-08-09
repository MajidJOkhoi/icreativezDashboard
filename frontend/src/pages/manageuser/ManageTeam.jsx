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
  LoaderCircle,
  MoreHorizontalIcon,
  PlusCircle,
  Trash,
  ChevronLeft,
  ChevronRight,
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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const ManageTeam = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Show 5 users per page

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      jobType: [],
      designation: "",
      address: "",
      username: "",
    },
  });

  const navigateToCreateUser = () => {
    navigate(`/dashboard/team/create`);
  };

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    reset();
  };

  useEffect(() => {
    setLoading(true);
    // Commented out the API call for demonstration purposes
    // axios
    //   .get("https://backend-production-6e95.up.railway.app/api/user/getMyAllUsers")
    //   .then((response) => {
    //     const users = response.data; // Assuming the data is in the correct format
    //     setUsers(users);
    //     setFilteredUsers(users);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //     setLoading(false);
    //   });

    // Sample data for demonstration purposes
    const sampleData = [
      {
        _id: "1",
        fullName: "John Doe",
        email: "john.doe@example.com",
        contact: "123-456-7890",
        address: "123 Main St, Anytown, USA",
        jobType: "Full Time",
        role: "Admin",
        designation: "Senior Web Developer",
        companyId: "Company1",
      },
      {
        _id: "2",
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        contact: "098-765-4321",
        address: "456 Oak St, Anytown, USA",
        jobType: "Part Time",
        role: "User",
        designation: "Junior Web Developer",
        companyId: "Company2",
      },
      {
        _id: "2",
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        contact: "098-765-4321",
        address: "456 Oak St, Anytown, USA",
        jobType: "Part Time",
        role: "User",
        designation: "Junior Web Developer",
        companyId: "Company2",
      },
      {
        _id: "2",
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        contact: "098-765-4321",
        address: "456 Oak St, Anytown, USA",
        jobType: "Part Time",
        role: "User",
        designation: "Junior Web Developer",
        companyId: "Company2",
      },
      {
        _id: "2",
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        contact: "098-765-4321",
        address: "456 Oak St, Anytown, USA",
        jobType: "Part Time",
        role: "User",
        designation: "Junior Web Developer",
        companyId: "Company2",
      },
      {
        _id: "2",
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        contact: "098-765-4321",
        address: "456 Oak St, Anytown, USA",
        jobType: "Part Time",
        role: "User",
        designation: "Junior Web Developer",
        companyId: "Company2",
      },
      // Add more sample data as needed
    ];
    setUsers(sampleData);
    setFilteredUsers(sampleData);
    setLoading(false);
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.jobType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.companyId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchQuery, users]);

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
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Users</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button onClick={navigateToCreateUser} className="rounded-3xl bg-[#BA0D09] hover:bg-[#BA0D09] hover:text-white">
          <PlusCircle size={20} />
          <span className="ml-2">Add User</span>
        </Button>
      </div>

      {/* Search Input */}
      <div className="my-4">
        <Input
          type="text"
          placeholder="Search by name, email, role, job type, contact, or company ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow rounded-3xl"
        />
      </div>

      <Card className="mt-2 w-full rounded-3xl shadow-sm shadow-green-50 max-w-sm sm:max-w-full">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage your Users and view their details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Company ID</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.jobType}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>{user.designation}</TableCell>
                  <TableCell>{user.companyId}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link to={`/dashboard/users/edit/${user._id}`}>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                        </Link>
                        <Link to={`/dashboard/users/delete/${user._id}`}>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="ghost"
            >
              <ChevronLeft />
            </Button>
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
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

export default ManageTeam;
