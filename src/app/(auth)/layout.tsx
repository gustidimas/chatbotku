"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Spinner from "../components/Spinner";
import Redirecting from "../components/Redirecting";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "authenticated") {
    return <Redirecting />;
  }
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        {children}
      </div>
    </>
  );
}
