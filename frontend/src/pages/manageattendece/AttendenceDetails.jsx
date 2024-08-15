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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchAttendanceData = async (date) => {
    setLoading(true);
    setAttendanceData([]);
    try {
      const month = date
        .toLocaleString("default", { month: "long" })
        .toLowerCase();
      const year = date.getFullYear();
      const response = await axios.get(
        `/api/attendance/getMyMonthAttendanceById?userid=${id}&month=${month}&year=${year}`
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
  }, [selectedDate]);

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
        <CardContent>
          <div className="flex justify-between items-center">
           
            <div className="flex mb-6">
              <h2> User Information details </h2>
            </div>

            <div className="flex mb-6">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className=" p-2 border rounded-3xl"
              />
            </div>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : attendanceData.length === 0 ? (
            <div className="text-red-500">
              No Record Available for the selected month ...{" "}
            </div>
          ) : (
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
                {attendanceData.map((attendance) => (
                  <TableRow key={attendance._id}>
                    <TableCell>{attendance.date}</TableCell>
                    <TableCell>{attendance.checkIn.time}</TableCell>
                    <TableCell>{attendance.checkOut?.time || "N/A"}</TableCell>
                    <TableCell>
                      {attendance.duration?.hours} hrs{" "}
                      {attendance.duration?.minutes} mins{" "}
                      {attendance.duration?.seconds} secs
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-sm font-semibold text-white ${
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
