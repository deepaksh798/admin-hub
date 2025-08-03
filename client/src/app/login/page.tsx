"use client";

import { setToken } from "@/_utils/cookies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { loginApi, signupApi } from "@/network/Api";
import { LuUserRound } from "react-icons/lu";
import { useFormik } from "formik";
import * as Yup from "yup";

const Auth = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: isSignup ? Yup.string().required("Name is required") : Yup.string(),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setError("");
      setLoading(true);

      try {
        if (isSignup) {
          const { data } = await signupApi(values);
          console.log("Signup successful", data);
          setToken(data.content.meta.access_token);
        } else {
          const { data } = await loginApi({
            email: values.email,
            password: values.password,
          });
          console.log("Login successful", data);
          setToken(data.content.meta.access_token);
        }
        router.push("/dashboard");
      } catch (error: any) {
        setError(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="relative w-16 h-16 overflow-hidden border border-gray-300 rounded-full bg-gray-100">
            <LuUserRound className="h-full w-full text-[#6B7280] p-1" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            {isSignup ? "Create an Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-500 text-center">
            {isSignup
              ? "Sign up to access your community"
              : "Sign in to access your community"}
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="w-full"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-sm text-red-500">{formik.errors.name}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="pl-10"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? isSignup
                ? "Signing up..."
                : "Signing in..."
              : isSignup
              ? "Sign up"
              : "Sign in"}
          </Button>

          <div className="text-center text-sm">
            {isSignup ? (
              <>
                <span className="text-gray-500">Already have an account? </span>
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => setIsSignup(false)}
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                <span className="text-gray-500">Don't have an account? </span>
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => setIsSignup(true)}
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
