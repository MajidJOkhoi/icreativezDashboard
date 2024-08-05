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
    },
    status: "Pending Approval",
    type: "PTO",
    startDate: "Jul 01st, 2022",
    endDate: "Jul 04th, 2022",
    duration: "3 days",
  },
  {
    id: 2,
    user: {
      image: "https://via.placeholder.com/50",
      name: "Ivan Bryant",
      role: "Product Designer",
    },
    status: "Approved",
    type: "Sick Leave",
    startDate: "Aug 10th, 2022",
    endDate: "Aug 12th, 2022",
    duration: "2 days",
  },
];

const TimeOffDetails = () => {
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
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/leaves">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Leaves</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="max-w-lg mx-auto p-6 rounded-lg shadow-lg border border-gray-200">
        <CardHeader className="flex justify-between items-center border-b pb-4">
          <CardTitle className="text-xl font-semibold">Time Off Details</CardTitle>
        
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center mb-6">
            <img
              src={request.user.image}
              alt={request.user.name}
              className="w-16 h-16 rounded-full border border-gray-300 mr-4"
            />
            <div>
              <h4 className="font-bold text-lg text-gray-800">{request.user.name}</h4>
              <p className="text-sm text-gray-500">{request.user.role}</p>
            </div>
            <span className={`ml-auto px-3 py-1 rounded-full text-sm font-semibold ${request.status === "Approved" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
              {request.status}
            </span>
          </div>

          <div className="mb-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Time Off Type:</span>
              <span className="text-gray-800">{request.type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Dates:</span>
              <span className="text-gray-800">
                {request.startDate} - {request.endDate}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Duration:</span>
              <span className="text-gray-800">{request.duration}</span>
            </div>
          </div>

          <div className="flex justify-around mt-6">
            <Button onClick={handleApprove} variant="success" className="w-full mx-1">
              Approve
            </Button>
            <Button onClick={handleReject} variant="destructive" className="w-full mx-1">
              Reject
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TimeOffDetails;
