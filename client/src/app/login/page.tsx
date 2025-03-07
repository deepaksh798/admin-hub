"use client";

import { setToken } from "@/_utils/cookies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const loginHandler = async (formData: FormData) => {
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/signin`,
        {
          email,
          password,
        }
      );
      console.log("Login Successful", data);
      // localStorage.setItem("token", data.content.meta.access_token);

      setToken(data.content.meta.access_token);
      router.push("/community");
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        action={loginHandler}
        className="flex flex-col items-start gap-4 p-4 border rounded-lg"
      >
        <h1 className="text-2xl place-self-center">Community</h1>
        <Label>Email</Label>
        <Input type="email" placeholder="Email" name="email" />
        <Label>Password</Label>
        <Input type="text" placeholder="password" name="password" />
        {error && <span className="text-red-400 text-sm">{error}</span>}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
