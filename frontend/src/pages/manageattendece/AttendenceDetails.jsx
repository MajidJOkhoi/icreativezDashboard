import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const AttendanceDetails = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  let { id } = useParams();

  const fetchAttendanceData = async (date) => {
    setLoading(true);
    setAttendanceData([]);
    try {
      const month = date
        .toLocaleString("default", { month: "long" })
        .toLowerCase();
      const year = date.getFullYear();
      const response = await axios.get(
        `/api/attendance/getMyMonthAttendanceById?userid=${id}&&month=${month}`
      );

      console.log(response.data.monthAttendance);

      if (response.data.success && response.data.monthAttendance.length > 0) {
        setAttendanceData(response.data.monthAttendance);
      } else {
        toast.error("No Record Available for the selected month.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData(selectedDate);

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`/api/user/getUserById/${id}`);
        setUserData(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, [selectedDate, id]);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/attendance">
              Attendance
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-2 w-full rounded-3xl shadow-sm shadow-green-50 max-w-sm sm:max-w-full">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Attendance Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6 ">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            User Information
          </h2>
          <h2 className=" text-gray-600 mb-2">
            Name: {userData.fullName}
          </h2>
          <h2 className=" text-gray-600 mb-4">
            Email: {userData.email}
          </h2>
        

          <div className="flex justify-between items-center mb-6">
            <div></div>
            <div className="flex">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="p-2 border rounded-3xl text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center text-blue-500">Loading...</div>
          ) : attendanceData.length === 0 ? (
            <div className="text-center text-red-500">
              No Record Available for the selected month...
            </div>
          ) : (
            <Table className="w-full text-left text-gray-800 rounded-3xl">
              <TableHeader className="bg-gray-100 ">
                <TableRow>
                  <TableHead className="py-2 px-4">Date</TableHead>
                  <TableHead className="py-2 px-4">Check-in</TableHead>
                  <TableHead className="py-2 px-4">Check-out</TableHead>
                  <TableHead className="py-2 px-4">Duration</TableHead>
                  <TableHead className="py-2 px-4">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((attendance) => (
                  <TableRow
                    key={attendance._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="py-2 px-4">
                      {attendance.date}
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      {attendance.checkIn  || "N/A"}
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      {attendance.checkOut || "N/A"}


                    </TableCell>
                    <TableCell className="py-2 px-4">
                      {attendance.duration?.hours} hrs {attendance.duration?.minutes} {" "}
                      mins 
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${
                          attendance.status === "present"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {attendance.status === "present" ? "Present" : "Absent"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default AttendanceDetails;
