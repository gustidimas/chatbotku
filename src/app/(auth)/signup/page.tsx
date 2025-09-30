"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    console.log("Sending:", email, password);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setMessage("Account created. Redirecting...");
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else {
        setMessage(data.error || "Failed to create account");
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Link href="/">Back</Link>
        <p>SignUp</p>
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
          <Input
            type="password"
            placeholder="Verify Password"
            className="border"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            required
          />
          <Button type="submit" disabled={loading}>Register</Button>
          {message && (
            <p className={`${success ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
