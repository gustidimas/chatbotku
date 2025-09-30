"use client";

import { signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user?.email}</p>
        <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
      </div>
    );
  }

  return <p>Logged out</p>;
}
