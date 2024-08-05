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
import { Input } from "@/components/ui/input"; // Import the Input component

import { useForm } from "react-hook-form";

const sampleUsers = [
  {
    _id: "1",
    fullName: "John Doe",
    email: "john.doe@example.com",
    jobType: ['full-time'],
    role: ['developer'],
    address: "123 Main St, Anytown",
    username: "johndoe",
  },
  {
    _id: "2",
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    jobType: ['part-time'],
    role: ['designer'],
    address: "456 Elm St, Othertown",
    username: "janesmith",
  },
  {
    _id: "3",
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    jobType: ['full-time'],
    role: ['manager'],
    address: "789 Oak St, Sometown",
    username: "alicejohnson",
  },
  {
    _id: "4",
    fullName: "Bob Brown",
    email: "bob.brown@example.com",
    jobType: ['contract'],
    role: ['tester'],
    address: "101 Pine St, Elsewhere",
    username: "bobbrown",
  },
  {
    _id: "5",
    fullName: "Charlie Davis",
    email: "charlie.davis@example.com",
    jobType: ['full-time'],
    role: ['developer'],
    address: "202 Maple St, Nowhere",
    username: "charliedavis",
  },
  {
    _id: "6",
    fullName: "Diana Evans",
    email: "diana.evans@example.com",
    jobType: ['part-time'],
    role: ['support'],
    address: "303 Birch St, Somewhere",
    username: "dianaevans",
  },
  {
    _id: "7",
    fullName: "Evan Fisher",
    email: "evan.fisher@example.com",
    jobType: ['full-time'],
    role: ['designer'],
    address: "404 Cedar St, Yourtown",
    username: "evanfisher",
  },
  {
    _id: "8",
    fullName: "Fiona Green",
    email: "fiona.green@example.com",
    jobType: ['intern'],
    role: ['developer'],
    address: "505 Redwood St, Heretown",
    username: "fionagreen",
  },
  {
    _id: "9",
    fullName: "George Hill",
    email: "george.hill@example.com",
    jobType: ['contract'],
    role: ['tester'],
    address: "606 Spruce St, Hisplace",
    username: "georgehill",
  },
  {
    _id: "10",
    fullName: "Hannah Irwin",
    email: "hannah.irwin@example.com",
    jobType: ['full-time'],
    role: ['developer'],
    address: "707 Chestnut St, Mytown",
    username: "hannahirwin",
  },
  {
    _id: "11",
    fullName: "Ian Jacobs",
    email: "ian.jacobs@example.com",
    jobType: ['part-time'],
    role: ['support'],
    address: "808 Walnut St, Anyplace",
    username: "ianjacobs",
  },
  {
    _id: "12",
    fullName: "Jessica King",
    email: "jessica.king@example.com",
    jobType: ['full-time'],
    role: ['manager'],
    address: "909 Willow St, Everytown",
    username: "jessicaking",
  },
  {
    _id: "13",
    fullName: "Kevin Lee",
    email: "kevin.lee@example.com",
    jobType: ['full-time'],
    role: ['developer'],
    address: "1010 Aspen St, Newtown",
    username: "kevinlee",
  },
  {
    _id: "14",
    fullName: "Linda Moore",
    email: "linda.moore@example.com",
    jobType: ['contract'],
    role: ['designer'],
    address: "1111 Beech St, Oldtown",
    username: "lindamoore",
  },
  {
    _id: "15",
    fullName: "Michael Neal",
    email: "michael.neal@example.com",
    jobType: ['intern'],
    role: ['tester'],
    address: "1212 Fir St, Smallville",
    username: "michaelneal",
  },
  {
    _id: "16",
    fullName: "Nancy O'Brien",
    email: "nancy.obrien@example.com",
    jobType: ['part-time'],
    role: ['support'],
    address: "1313 Holly St, Bigcity",
    username: "nancyobrien",
  },
  {
    _id: "17",
    fullName: "Oscar Parker",
    email: "oscar.parker@example.com",
    jobType: ['full-time'],
    role: ['developer'],
    address: "1414 Ivy St, Littletown",
    username: "oscarparker",
  },
  {
    _id: "18",
    fullName: "Paula Quinn",
    email: "paula.quinn@example.com",
    jobType: ['part-time'],
    role: ['designer'],
    address: "1515 Juniper St, Smallplace",
    username: "paulaquinn",
  },
  {
    _id: "19",
    fullName: "Robert Stone",
    email: "robert.stone@example.com",
    jobType: ['contract'],
    role: ['manager'],
    address: "1616 Laurel St, Middlecity",
    username: "robertstone",
  },
  {
    _id: "20",
    fullName: "Susan Turner",
    email: "susan.turner@example.com",
    jobType: ['intern'],
    role: ['support'],
    address: "1717 Maple St, Quiettown",
    username: "susanturner",
  },
];



const ManageTeam = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(sampleUsers); // Use sample data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState(""); // State to manage search query
  const [filteredUsers, setFilteredUsers] = useState(sampleUsers); // State to manage filtered users

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // Number of users per page

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
      role: [],
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
    // Filter users based on search query
    const filtered = users.filter((user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.some((type) =>
        type.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||  user.jobType.some((type) =>
        type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
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
        <Button onClick={navigateToCreateUser}>
          <PlusCircle size={20} />
          <span className="ml-2">Add User</span>
        </Button>
      </div>

      {/* Search Input */}
      <div className="my-4">
        <Input
          type="text"
          placeholder="Search by name  email, role & job type"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      <Card className="mt-2 w-full max-w-sm sm:max-w-full">
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
                <TableHead>Job Type</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Username</TableHead>
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
                  <TableCell>
                    {user.jobType.map((type) => (
                      <Badge key={type} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    {user.role.map((role) => (
                      <Badge key={role} variant="outline">
                        {role}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.username}</TableCell>
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
            >
              <ChevronLeft />
              Prev
            </Button>
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ManageTeam;
