"use client";

import Spinner from "@/app/components/Spinner";
import { Organization } from "@/app/interface/Organization";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrganizationDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchOrganization() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/organization/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch organization");
        }

        const data = await res.json();
        setOrg(data.org);
      } catch (error) {
        setError("Unable to load organization details");
      } finally {
        setLoading(false);
      }
    }
    fetchOrganization();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/organization/${org?._id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/dashboard/organization");
    } else {
      alert("Failed to delete organization");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error || !org) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error || "Organization not found."}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-blue-600 hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="border rounded-lg p-6 shadow-sm bg-white">
          <h1 className="text-2xl font-bold mb-4">{org.org_name}</h1>

          <div className="space-y-3 text-gray-700">
            <p>
              <strong>ID:</strong> {org._id}
            </p>
            <p>
              <strong>Admin ID:</strong> {org.administrator_id}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {new Date(org.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Updated:</strong>{" "}
              {new Date(org.updated_at).toLocaleString()}
            </p>
            <Button onClick={handleDelete} variant="destructive">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
