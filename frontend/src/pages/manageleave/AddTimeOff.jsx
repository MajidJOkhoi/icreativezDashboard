import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInCalendarDays } from "date-fns";

const typeOptions = [
  { value: "Sick Leave", label: "Sick Leave" },
  { value: "PTO", label: "PTO" },
  { value: "Parent Duty", label: "Parent Duty" },
  { value: "Vacation", label: "Vacation" },
  { value: "Covid-19 Selfcare", label: "Covid-19 Selfcare" },
  { value: "Covid-19 Family Care", label: "Covid-19 Family Care" },
];

const AddTimeOff = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    startDate: null,
    endDate: null,
    duration: "",
    type: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      type: selectedOption.value,
    }));
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setFormData((prevData) => ({
      ...prevData,
      startDate: start,
      endDate: end,
      duration: end && start ? `${differenceInCalendarDays(end, start) + 1} days` : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    navigate("/dashboard/attendance"); 
  };

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
              <BreadcrumbLink href="/dashboard/Leaves">Leaves</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Card className="w-full max-w-lg mx-auto mt-10">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Add Time Off Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="timeOffForm" onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>
           
            <div className="mb-4">
            <Label htmlFor="date">Date</Label>
            <br />
             
              <DatePicker
                id="date"
                selectsRange
                startDate={formData.startDate}
                endDate={formData.endDate}
                onChange={handleDateChange}
                isClearable
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                readOnly
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="type">Type</Label>
              <Select
                id="type"
                name="type"
                value={typeOptions.find(
                  (option) => option.value === formData.type
                )}
                onChange={handleSelectChange}
                options={typeOptions}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center justify-center gap-4">
              <Link to="/dashboard/Leaves">
                <Button variant={"outline"}>
                  <span className="ml-2">Cancel</span>
                </Button>
              </Link>
              <Button type="submit" form="timeOffForm">
                <span className="ml-2">Submit</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddTimeOff;
