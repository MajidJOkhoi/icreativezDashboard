import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/auth/AuthContext";

const Signup = () => {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const fullNameRef = useRef(null);
  const avatarRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const fullName = fullNameRef.current.value;
    const avatar = avatarRef.current.files[0];
    const password = passwordRef.current.value;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("fullName", fullName);
    formData.append("avatar", avatar);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("User registered successfully");
        
        login(data.user); // Assume login updates the user context

        navigate("/login");
      } else {
        const errorData = await response.json();
        toast.warning(errorData.message || "Invalid credentials. Please check your details and try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <section className="flex justify-center items-center py-16 px-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">Sign Up</CardTitle>
          <CardDescription>Enter your details to create an account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="username">Username</label>
              <Input
                ref={usernameRef}
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <Input
                ref={emailRef}
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="fullName">Full Name</label>
              <Input
                ref={fullNameRef}
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="avatar">Avatar</label>
              <Input
                ref={avatarRef}
                id="avatar"
                type="file"
                name="avatar"
                accept="image/*"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">Password</label>
              <Input
                ref={passwordRef}
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
          </CardContent>
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
          <CardFooter className="flex justify-center gap-2">
            <Button className="-w-sm" type="submit">
              <span className="ml-2">Sign Up</span>
            </Button>
          </CardFooter>
        </form>
        <div className="mb-4 text-center text-sm">
          Already have an account?
          <Link to="/login" className="-underline font-bold ml-1">
            Log in
          </Link>
        </div>
      </Card>
    </section>
  );
};

export default Signup;
