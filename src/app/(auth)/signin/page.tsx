"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setMessage("Email or password is invalid. Please try again!");
      setPassword("");
      setLoading(false);
    } else {
      setPassword("");
      router.push("/");
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Link href="/">Back</Link>
        <p>Sign In</p>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            className="border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            className="border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          <Button type="submit" disabled={loading}>
            Login
          </Button>
          {message && <p className="text-red-500">{message}</p>}
        </form>
      </div>
    </>
  );
}
