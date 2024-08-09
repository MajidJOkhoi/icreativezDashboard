import React from "react";
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

const jobTypeOptions = [
  { label: "Full Time", value: "1" },
  { label: "Part Time", value: "2" },
  { label: "Full Time Intern", value: "3" },
  { label: "Part Time Intern", value: "4" },
];

const roleOptions = [
  { label: "Admin", value: "1" },
  { label: "Team Lead", value: "2" },
  { label: "User", value: "3" },
];

const designationOptions = [
  { label: "Administrator", value: "1" },
  { label: "Senior Web Developer", value: "2" },
  { label: "Junior Web Developer", value: "3" },
  { label: "Senior Flutter Developer", value: "4" },
  { label: "Junior Flutter Developer", value: "5" },
  { label: "Junior Python Developer", value: "6" },
  { label: "Senior Python Developer", value: "7" },
  { label: "Junior Graphic Designer", value: "8" },
  { label: "Senior Graphic Designer", value: "9" },
  { label: "Junior SEO Expert", value: "10" },
  { label: "Senior SEO Expert", value: "11" },
];

const AddUser = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      contact: "",
      address: "",
      password: "",
      companyId: "66a22d85820e6836bbc1e8e5",
      jobType: "",
      designation: "",
      role: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      // await axios.post('/api/users', data);
      console.log(data);
      toast.success("User created successfully");
      navigate("/dashboard/team");
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
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
            <div className="w-full">
              <label htmlFor="fullName" className="block mb-2 font-medium">
                Full Name
              </label>
              <Input
                id="fullName"
                className="w-full"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                className="w-full"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="contact" className="block mb-2 font-medium">
                Contact No{" "}
              </label>
              <Input
                id="contact"
                className="w-full"
                type="number"
                {...register("contact", { required: "Contact is required" })}
              />
              {errors.contact && (
                <p className="text-red-500">{errors.contact.message}</p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="address" className="block mb-2 font-medium">
                Address
              </label>
              <Textarea
                id="address"
                className="w-full min-h-[150px]"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                className="w-full"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="companyId" className="block mb-2 font-medium">
                Company ID
              </label>
              <Input
                id="companyId"
                className="w-full"
                {...register("companyId", {
                  required: "Company ID is required",
                })}
              />
              {errors.companyId && (
                <p className="text-red-500">{errors.companyId.message}</p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="jobType" className="block mb-2 font-medium">
                Job Type
              </label>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <Select
                    id="jobType"
                    options={jobTypeOptions}
                    className="w-full"
                    {...field}
                    onChange={(selected) => field.onChange(selected)}
                  />
                )}
              />
              {errors.jobType && (
                <p className="text-red-500">{errors.jobType.message}</p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="role" className="block mb-2 font-medium">
                Role
              </label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    id="role"
                    options={roleOptions}
                    className="w-full"
                    {...field}
                    onChange={(selected) => field.onChange(selected)}
                  />
                )}
              />
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="designation" className="block mb-2 font-medium">
                Designation
              </label>
              <Controller
                name="designation"
                control={control}
                render={({ field }) => (
                  <Select
                    id="designation"
                    options={designationOptions}
                    className="w-full"
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
