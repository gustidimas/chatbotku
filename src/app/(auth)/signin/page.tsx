"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setMessage("Email or password is invalid. Please try again!");
      setPassword("");
    } else {
      setPassword("");
      router.push("/");
    }
  };

  return (
    <>
      <div>
        <Link href="/">Back</Link>
        <p>Sign In</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {message && <p className="text-red-500">{message}</p>}
        </form>
      </div>
    </>
  );
}
