"use client";

import React, { useEffect } from "react";
import PublicHeader from "../components/PublicHeader";
import PublicFooter from "../components/PublicFooter";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PublicLayout({
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
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return <p>Redirecting...</p>;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center">
        <PublicHeader />
        <main className="grow flex flex-col justify-center">{children}</main>
        <PublicFooter />
      </div>
    </>
  );
}
