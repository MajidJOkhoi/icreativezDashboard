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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const jobTypeOptions = [
  { label: "Full-Time", value: "full_time" },
  { label: "Part-Time", value: "part_time" },
  { label: "Contract", value: "contract" },
];

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
];

const AddUser = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      jobType: [],
      role: [],
      address: '',
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/users', data);
      toast.success('User created successfully');
      navigate('/dashboard/teams');
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
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create a new User</CardTitle>
          <CardDescription>Fill out the form below to create a new user.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <div className="w-full">
              <label htmlFor="fullName" className="block mb-2 font-medium">Full Name</label>
              <Input id="fullName" className="w-full" {...register('fullName', { required: 'Full name is required' })} />
              {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
            </div>

            <div className="w-full">
              <label htmlFor="email" className="block mb-2 font-medium">Email</label>
              <Input id="email" type="email" className="w-full" {...register('email', { required: 'Email is required' })} />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div className="w-full">
              <label htmlFor="address" className="block mb-2 font-medium">Address</label>
              <Textarea id="address" className="w-full min-h-[150px]" {...register('address', { required: 'Address is required' })} />
              {errors.address && <p className="text-red-500">{errors.address.message}</p>}
            </div>

            <div className="w-full">
              <label htmlFor="username" className="block mb-2 font-medium">Username</label>
              <Input id="username" className="w-full" {...register('username', { required: 'Username is required' })} />
              {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </div>

            <div className="w-full">
              <label htmlFor="password" className="block mb-2 font-medium">Password</label>
              <Input id="password" type="password" className="w-full" {...register('password', { required: 'Password is required' })} />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div className="w-full">
              <label htmlFor="jobType" className="block mb-2 font-medium">Job Type</label>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <Select
                    id="jobType"
                    isMulti
                    options={jobTypeOptions}
                    className="w-full"
                    {...field}
                    onChange={(selected) => field.onChange(selected)}
                  />
                )}
              />
              {errors.jobType && <p className="text-red-500">{errors.jobType.message}</p>}
            </div>

            <div className="w-full">
              <label htmlFor="role" className="block mb-2 font-medium">Role</label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    id="role"
                    isMulti
                    options={roleOptions}
                    className="w-full"
                    {...field}
                    onChange={(selected) => field.onChange(selected)}
                  />
                )}
              />
              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>

          
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default AddUser;
