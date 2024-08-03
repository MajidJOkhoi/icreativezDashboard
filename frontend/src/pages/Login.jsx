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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/auth/AuthContext";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Login successful");
        login(data.user); 
        navigate("/Home");
      } else {
        const errorData = await response.json();
        toast.warning(errorData.message || "Invalid email or password");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section className="flex justify-center items-center py-16 px-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">Log In</CardTitle>
          <CardDescription>Enter your details to log in to your account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
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
              <span className="ml-2">Log In</span>
            </Button>
          </CardFooter>
        </form>
        <div className="mb-4 text-center text-sm">
          Don't have an account?
          <Link to="/signup" className="-underline font-bold ml-1">
            Sign up
          </Link>
        </div>
      </Card>
    </section>
  );
};

export default Login;
