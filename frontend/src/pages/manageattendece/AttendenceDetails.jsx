import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useParams } from "react-router-dom";

const AttendanceDetails = () => {
  const [request, setRequest] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

const {id } = useParams();

console.log(" user id ",id)


  const fetchAttendanceData = async (date) => {
    try {
      const month = date.toLocaleString("default", { month: "long" }).toLowerCase();
      const response = await axios.get(`/api/attendance/getMyMonthAttendanceById?userid=${id}&&month=${month}`);
      console.log(response.data);

      if (response.data.success) {
        setRequest(response.data.monthAttendance);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching the attendance data:", error);
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchAttendanceData(selectedDate);
  }, [selectedDate]);

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
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="p-2 border rounded"
            />
          </div>

          {!request ? (
            <div>Loading...</div>
          ) : (
            <>
              {request.map((attendance, index) => (
                <div key={index} className="mb-6">
                  <div className="flex items-center mb-6">
                    <img
                      src="https://via.placeholder.com/50"
                      alt={attendance.date}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-lg">{attendance.date}</h4>
                      <p className="text-gray-500">Check-in: {attendance.checkIn.time}</p>
                      <p className="text-gray-500">Check-out: {attendance.checkOut?.time || "N/A"}</p>
                      <p className="text-gray-500">Duration: {attendance.duration?.hours ?? 0} hrs {attendance.duration?.minutes ?? 0} mins {attendance.duration?.seconds ?? 0} secs</p>
                      <p className="text-gray-500 flex items-center">
                        Status: 
                        <span
                          className={`ml-2 w-4 h-4 rounded-full ${
                            attendance.status === "present" ? "bg-green-500" : "bg-red-500"
                          }`}
                          title={attendance.status === "present" ? "Present" : "Absent"}
                        ></span>
                      </p>
                    </div>
                  </div>

                  <Table className="w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Check-in</TableHead>
                        <TableHead>Check-out</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow key={attendance._id}>
                        <TableCell>{attendance.date}</TableCell>
                        <TableCell>{attendance.checkIn.time}</TableCell>
                        <TableCell>{attendance.checkOut?.time || "N/A"}</TableCell>
                        <TableCell>{attendance.duration?.hours ?? 0} hrs {attendance.duration?.minutes ?? 0} mins {attendance.duration?.seconds ?? 0} secs</TableCell>
                        <TableCell>
                          <span
                            className={`ml-2 w-4 h-4 rounded-full ${
                              attendance.status === "present" ? "bg-green-500" : "bg-red-500"
                            }`}
                            title={attendance.status === "present" ? "Present" : "Absent"}
                          ></span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default AttendanceDetails;
