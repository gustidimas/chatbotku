"use client";

import Link from "next/link";
import AuthButton from "../components/AuthButton";

export default function Home() {
  return (
    <>
      <div>
        <p>Landing Page</p>
        <AuthButton />
        <Link href="/signin">Sign In</Link>
        <Link href="/signup">Sign Up</Link>
      </div>
    </>
  );
}
