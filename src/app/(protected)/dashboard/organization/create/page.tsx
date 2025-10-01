"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Create() {
  const [loading, setLoading] = useState(false);
  const [org_name, setOrg_name] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/organization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ org_name }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Organization created. Redirecting...");
        setOrg_name("");
        setLoading(false);
        setTimeout(() => {
          router.push("/dashboard/organization");
        }, 2000);
      } else {
        setMessage(data.error || "Failed to create organization");
        setOrg_name("");
        setLoading(false);
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setOrg_name("");
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <Link href="/dashboard/organization">Back</Link>
        <p>Create Organization</p>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Organization Name"
            value={org_name}
            onChange={(e) => setOrg_name(e.target.value)}
            disabled={loading}
            required
          />
          <Button type="submit" disabled={loading}>
            Create
          </Button>
          <p>{message}</p>
        </form>
      </div>
    </>
  );
}
