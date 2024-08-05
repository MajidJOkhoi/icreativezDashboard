import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const sampleData = [
  {
    id: 1,
    user: {
      image: "https://via.placeholder.com/50",
      name: "Jack Dylen",
      role: "UI/UX Designer",
      email: "user1@gmail.com",
      jobType: "Full-Time",
    },
    attendance: {
      totalHours: 264,
      regular: 172,
      overtime: 24,
      pto: 0,
      holiday: 20,
      records: [
        { date: "1st Jun 2022", checkin: "09:00 AM", checkout: "09:00 PM", mealBreak: "1:00 hrs", workHours: "8.00 hrs", overtime: "4.00 hrs" },
        { date: "2nd Jun 2022", checkin: "08:01 AM", checkout: "07:02 PM", mealBreak: "1:00 hrs", workHours: "8.00 hrs", overtime: "3.00 hrs" },
      ],
    },
  },
  {
    id: 2,
    user: {
      image: "https://via.placeholder.com/50",
      name: "Ivan Bryant",
      role: "Product Designer",
      email: "user2@gmail.com",
      jobType: "Part-Time",
    },
    attendance: {
      totalHours: 150,
      regular: 120,
      overtime: 10,
      pto: 0,
      holiday: 10,
      records: [
        { date: "1st Jun 2022", checkin: "10:00 AM", checkout: "06:00 PM", mealBreak: "0:45 hrs", workHours: "7.00 hrs", overtime: "1.00 hrs" },
        { date: "2nd Jun 2022", checkin: "09:30 AM", checkout: "05:30 PM", mealBreak: "0:45 hrs", workHours: "7.00 hrs", overtime: "1.00 hrs" },
      ],
    },
  },
];

const AttendanceDetails = () => {
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const fetchRequest = () => {
      try {
        const data = sampleData.find((item) => item.id === 2);
        setRequest(data);
      } catch (error) {
        console.error("Error fetching the request data:", error);
      }
    };

    fetchRequest();
  }, []);

  if (!request) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/attendence">Attendance</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="max-w-6xl mx-auto p-6 rounded-lg ">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Attendance Details</CardTitle>
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
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-500">Total Hours</p>
              <p className="text-xl font-semibold">{request.attendance.totalHours} hrs</p>
            </div>
            <div>
              <p className="text-gray-500">Regular</p>
              <p className="text-xl font-semibold">{request.attendance.regular} hrs</p>
            </div>
            <div>
              <p className="text-gray-500">Overtime</p>
              <p className="text-xl font-semibold">{request.attendance.overtime} hrs</p>
            </div>
            <div>
              <p className="text-gray-500">PTO</p>
              <p className="text-xl font-semibold">{request.attendance.pto} hrs</p>
            </div>
            <div>
              <p className="text-gray-500">Holiday</p>
              <p className="text-xl font-semibold">{request.attendance.holiday} hrs</p>
            </div>
          </div>

          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Meal Break</TableHead>
                <TableHead>Work Hours</TableHead>
                <TableHead>Overtime</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {request.attendance.records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.checkin}</TableCell>
                  <TableCell>{record.checkout}</TableCell>
                  <TableCell>{record.mealBreak}</TableCell>
                  <TableCell>{record.workHours}</TableCell>
                  <TableCell>{record.overtime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default AttendanceDetails;
