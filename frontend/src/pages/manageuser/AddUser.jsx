import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AddUser = () => {
  const navigate = useNavigate();
  const [jobTypeOptions, setJobTypeOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);

  const { control, handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      contact: "",
      address: "",
      password: "",
      companyId: "66ba0d4aeb042864cd040b6c", 
      jobType: "",
      designation: "",
      role: "",
    },
  });

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await axios.get("/api/jobType/getALLJobTypes");
        setJobTypeOptions(response.data.jobTypes.map(type => ({
          label: type.name,
          value: type.id
        })));
      } catch (error) {
        toast.error("Failed to load job types");
        console.error("Job Type Error:", error);
      }
    };

    const fetchDesignations = async () => {
      try {
        const response = await axios.get("/api/designation/getAllDesignation");
        setDesignationOptions(response.data.designations.map(designation => ({
          label: designation.name,
          value: designation.id
        })));
      } catch (error) {
        toast.error("Failed to load designations");
        console.error("Designation Error:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get("/api/role/getAllRoles");
        setRoleOptions(response.data.roles.map(role => ({
          label: role.name,
          value: role.id
        })));
      } catch (error) {
        toast.error("Failed to load roles");
        console.error("Role Error:", error);
      }
    };

    fetchJobTypes();
    fetchDesignations();
    fetchRoles();
  }, []);

  const onSubmit = async (data) => {
    // Format the data to match the API expectations
    const formattedData = {
      ...data,
      jobType: data.jobType.value,
      designation: data.designation.value,
      role: data.role.value,
    };

    console.log("Formatted Form Data:", formattedData);

    try {
      await axios.post("/api/user/create", formattedData);
      toast.success("User created successfully");
      navigate("/dashboard/team");
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        toast.error(`Server Error: ${error.response.data.message || 'An error occurred'}`);
      } else if (error.request) {
        console.error("Error Request Data:", error.request);
        toast.error("Network Error: No response received from the server");
      } else {
        console.error("Error Message:", error.message);
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/team">Users</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Add User</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-4">
          <Link to="/dashboard/team">
            <Button variant="outline" className='hover:bg-yellow-500 rounded-3xl'>Cancel</Button>
          </Link>
          <Button type="submit"  className="bg-[#BA0D09] hover:bg-[#BA0D09] rounded-3xl" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </div>

      <Card className="mt-4 pb-8 rounded-3xl shadow-sm shadow-green-50 ">
        <CardHeader>
          <CardTitle>Create a new User</CardTitle>
          <CardDescription>
            Fill out the form below to create a new user.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            {/* Full Name Field */}
            <div className="w-full">
              <label htmlFor="fullName" className="block mb-2 font-medium">
                Full Name
              </label>
              <Input
                id="fullName"
                className="w-full rounded-3xl"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="w-full">
              <label htmlFor="email" className="block mb-2 font-medium ">
                Email
              </label>
              <Input
                id="email"
                type="email"
                className="w-full rounded-3xl"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Contact Field */}
            <div className="w-full">
              <label htmlFor="contact" className="block mb-2 font-medium">
                Contact No{" "}
              </label>
              <Input
                id="contact"
                className="w-full rounded-3xl"
                {...register("contact", { required: "Contact is required" })}
              />
              {errors.contact && (
                <p className="text-red-500">{errors.contact.message}</p>
              )}
            </div>

            {/* Address Field */}
            <div className="w-full">
              <label htmlFor="address" className="block mb-2 font-medium ">
                Address
              </label>
              <Input
                 id="address"
                 className="w-full  rounded-3xl"
                 {...register("address", { required: "Address is required" })}
              />
             
             
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="w-full">
              <label htmlFor="password" className="block mb-2 font-medium ">
                Password
              </label>
              <Input
                id="password"
                type="password"
                className="w-full rounded-3xl"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Job Type Field */}
            <div className="w-full">
              <label htmlFor="jobType" className="block mb-2 font-medium ">
                Job Type
              </label>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <Select
                    id="jobType"
                    options={jobTypeOptions}
                    className="w-full rounded-3xl"
                    {...field}
                    onChange={(selected) => field.onChange(selected)}
                  />
                )}
              />
              {errors.jobType && (
                <p className="text-red-500">{errors.jobType.message}</p>
              )}
            </div>

            {/* Role Field */}
            <div className="w-full">
              <label htmlFor="role" className="block mb-2 font-medium ">
                Role
              </label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    id="role"
                    options={roleOptions}
                    className="w-full rounded-3xl"
                    {...field}
                    onChange={(selected) => field.onChange(selected)}
                  />
                )}
              />
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>

            {/* Designation Field */}
            <div className="w-full">
              <label htmlFor="designation" className="block mb-2 font-medium ">
                Designation
              </label>
              <Controller
                name="designation"
                control={control}
                render={({ field }) => (
                  <Select
                    id="designation"
                    options={designationOptions}
                    className="w-full rounded-3xl"
                    {...field}
                    onChange={(selected) => field.onChange(selected)}
                  />
                )}
              />
              {errors.designation && (
                <p className="text-red-500">{errors.designation.message}</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default AddUser;
