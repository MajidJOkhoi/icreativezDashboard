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
import { LoaderCircle, MoreHorizontalIcon, PlusCircle, Trash } from "lucide-react";
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
];

const ManageTeam = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(sampleUsers); // Use sample data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      jobType: [],
      role: [],
      address: '',
      username: '',
    },
  });

  const navigateToCreateUser = () => {
    navigate(`/dashboard/team/create`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Commenting out the API request
        // const response = await axios.get('/api/users');

        // Use sampleUsers for now
        // console.log("Fetched users:", response.data);
        // if (Array.isArray(response.data)) {
        //   setUsers(response.data);
        // } else {
        //   throw new Error("Data is not an array");
        // }

        // Using sample data directly
        setUsers(sampleUsers);
      } catch (err) {
        setError("An error occurred while fetching users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    // Handle form submission
    // axios.post('/api/users', data)
    //   .then(response => console.log("User added:", response.data))
    //   .catch(err => console.error("Error adding user:", err));
    // Reset the form after successful submission
    reset();
  };

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
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.jobType.map(type => (
                      <Badge key={type} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    {user.role.map(role => (
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
                          <DropdownMenuItem className='text-red-500'> delete </DropdownMenuItem>
                        </Link>
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

export default ManageTeam;
