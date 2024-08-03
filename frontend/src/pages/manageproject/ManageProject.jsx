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

const sampleProjects = [
  {
    _id: "1",
    title: "Project Alpha",
    genre: "Science Fiction",
    createdAt: "2023-07-15T14:48:00.000Z",
    coverImage: "https://via.placeholder.com/50",
  },
  {
    _id: "2",
    title: "Project Beta",
    genre: "Fantasy",
    createdAt: "2023-07-18T09:30:00.000Z",
    coverImage: "https://via.placeholder.com/50",
  },
  {
    _id: "3",
    title: "Project Gamma",
    genre: "Mystery",
    createdAt: "2023-07-20T12:45:00.000Z",
    coverImage: "https://via.placeholder.com/50",
  },
];

const ManageProject = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(sampleProjects); // Use sample data
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const navigateToProjectPage = () => {
    navigate(`/dashboard/projects/create`);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Commenting out the API request
        // const response = await axios.get('/api/projects');
   
        // Use sampleProjects for now
        // console.log("Fetched projects:", response.data);
        // if (Array.isArray(response.data)) {
        //   setProjects(response.data);
        // } else {
        //   throw new Error("Data is not an array");
        // }

        // Using sample data directly
        setProjects(sampleProjects);
      } catch (err) {
        setError("An error occurred while fetching projects.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Projects</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button onClick={navigateToProjectPage}>
          <PlusCircle size={20} />
          <span className="ml-2">Add Project</span>
        </Button>
      </div>

      <Card className="mt-2 w-full max-w-sm sm:max-w-full">
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>
            Manage your Projects and view their Team performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead className="hidden md:table-cell">Created at</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell className="sm:table-cell">
                    <img
                      alt={project.title}
                      className="aspect-square rounded-md object-cover"
                      height="60"
                      src={project.coverImage}
                      width="50"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{project.genre}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(project.createdAt).toLocaleDateString()}
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
                        <Link to={`/dashboard/projects/edit/${project._id}`}>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                        </Link>
                        <Link to={`/dashboard/projects/delete/${project._id}`}>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
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

export default ManageProject;
