import AuthButton from "@/app/components/AuthButton";
import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <div>
        <p>Dashboard</p>
        <Link href="/dashboard/organization">Organization</Link>
        <AuthButton />
      </div>
    </>
  );
}
