"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Spinner from "../components/Spinner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "authenticated") {
    return (
      <>
        <SidebarProvider>
          <AppSidebar />
          <main className="p-2 flex flex-col w-full">
            <div className="w-full flex flex-row items-center border-b p-4">
              <SidebarTrigger />
              <DynamicBreadcrumb />
            </div>
            <div className="p-4">{children}</div>
          </main>
        </SidebarProvider>
      </>
    );
  }

  return null;
}
