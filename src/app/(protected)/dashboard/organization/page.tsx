"use client";

import Spinner from "@/app/components/Spinner";
import { Organization } from "@/app/interface/Organization";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrganizationPage() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrgs() {
      try {
        const res = await fetch("/api/organization", {
          cache: "no-store",
        });
        const data = await res.json();
        setOrgs(data.orgs || []);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    fetchOrgs();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div>
        <Link href="/dashboard">Back</Link>
        <p>Organization</p>
        <Link href="/dashboard/organization/create">Create</Link>
        {orgs.length === 0 ? (
          <p>No organizations found.</p>
        ) : (
          <ul className="space-y-2">
            {orgs.map((org) => (
              <li
                key={org._id}
                className="p-4 border rounded-md shadow-sm hover:bg-gray-50"
              >
                <p>{org._id}</p>
                <p className="font-semibold">{org.org_name}</p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(org.created_at).toLocaleString()}
                </p>
                <Link href={`/dashboard/organization/${org._id}`}>Detail</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
