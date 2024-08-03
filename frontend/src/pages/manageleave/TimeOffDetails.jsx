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
      <Breadcrumb>
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

      <Card className="max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Time off details</CardTitle>
          <button onClick={() => console.log("Close")} className="text-gray-500">
            <X size={20} />
          </button>
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
              <p className="text-gray-500">{request.user.role}</p>
            </div>
            <span className="ml-auto text-yellow-500 font-semibold">
              {request.status}
            </span>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Time off type</span>
              <span>{request.type}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold mr-6">Time off date</span>
              <span>
                {request.startDate} - {request.endDate}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Duration</span>
              <span>{request.duration}</span>
            </div>
          </div>

          <div className="flex justify-around mt-6">
            <Button onClick={handleApprove} variant={"ghost"}>
              Approve
            </Button>
            <Button onClick={handleReject} variant={"destructive"}>
              Reject
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TimeOffDetails;
