import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const sampleData = [
  {
    id: 1,
    user: {
      image: "https://via.placeholder.com/50",
      name: "Jack Dylen",
      role: "UI/UX Designer",
      email:"user@gmail.com",
      jobType: "Full-Time",
    }
  },
  {
    id: 2,
    user: {
      image: "https://via.placeholder.com/50",
      name: "Ivan Bryant",
      role: "Product Designer",
       email:"user@gmail.com",
       jobType:"Part-Time",
    },
   
  },
];

const AttendenceDetails = () => {
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const fetchRequest = () => {
      try {
        const data = sampleData.find((item) => item.id === 1);
        setRequest(data);
      } catch (error) {
        console.error("Error fetching the request data:", error);
      }
    };

    fetchRequest();
  }, []);

  const handleApprove = () => {
    try {
      toast.success("Request approved successfully!");
    } catch (error) {
      console.error("Error approving the request:", error);
      toast.error("Failed to approve the request.");
    }
  };

  const handleReject = () => {
    try {
      toast.error("Request rejected successfully!");
    } catch (error) {
      console.error("Error rejecting the request:", error);
      toast.error("Failed to reject the request.");
    }
  };

  if (!request) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/leaves">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#"> Attendence </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="max-full mx-auto p-6 rounded-lg shadow-lg">
        <CardHeader className="flex justify-between items-center">
          <CardTitle> User Profile </CardTitle>
        
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <img
              src={request.user.image}
              alt={request.user.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h4 className="font-bold text-lg">{request.user.name}</h4>
              <p className="text-gray-500">{request.user.email}</p>
              <p className="text-gray-500">{request.user.role}</p>
              <p className="text-gray-500">{request.user.jobType}</p>
              
            </div>
            <span className="ml-auto text-yellow-500 font-semibold">
              Address 
            </span>
          </div>


        
        
        </CardContent>
      </Card>
    </>
  );
};

export default AttendenceDetails;
