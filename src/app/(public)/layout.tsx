import React from "react";
import PublicHeader from "../components/PublicHeader";
import PublicFooter from "../components/PublicFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center">
        <PublicHeader />
        <main className="grow flex flex-col justify-center">
          {children}
        </main>
        <PublicFooter />
      </div>
    </>
  );
}
