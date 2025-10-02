"use client";

import Spinner from "@/app/components/Spinner";
import { Organization } from "@/app/interface/Organization";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function OrganizationDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };

  const [org, setOrg] = useState<Organization | null>(null);
  const [org_name, setOrg_name] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

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
        setOrg_name(data.org.org_name);
      } catch (err) {
        setError("Unable to load organization details");
      } finally {
        setLoading(false);
      }
    }
    fetchOrganization();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const res = await fetch(`/api/organization/${org?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ org_name: org_name.trim() }),
    });

    if (res.ok) {
      const updatedData = await res.json();
      // ✅ Update state lokal → nama di <h1> langsung berubah!
      setOrg(updatedData.org);
      setOrg_name(updatedData.org.org_name);
      // Opsional: tetap refresh untuk konsistensi penuh
      router.refresh();
    } else {
      const errorData = await res.json();
      if (res.status === 409 || errorData.error?.includes("already exists")) {
        setFormError("An organization with this name already exists.");
      } else if (res.status === 400) {
        setFormError(errorData.details?.[0] || "Invalid organization name.");
      } else {
        setFormError("Failed to update organization. Please try again.");
      }
    }
    setSubmitting(false);
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this organization? This action cannot be undone."
      )
    )
      return;

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
      <div className="p-6 max-w-2xl mx-auto">
        <p className="text-red-500">{error || "Organization not found."}</p>
        <Button variant="link" onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link
        href="/dashboard/organization"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Back to Organizations
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{org.org_name}</h1>
        <p className="text-sm text-gray-500">
          Manage your organization settings
        </p>
      </div>

      {/* Rename Form */}
      <div className="bg-white border rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Organization Name</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter organization name"
                value={org_name}
                onChange={(e) => {
                  setOrg_name(e.target.value);
                  // Bersihkan error saat user mengetik
                  if (formError) setFormError(null);
                }}
                disabled={submitting}
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              disabled={
                submitting ||
                !org_name.trim() ||
                org_name.trim() === org.org_name
              }
              className="w-full sm:w-auto"
            >
              {submitting ? (
                <span className="flex items-center">
                  <Spinner />
                </span>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
          {formError && (
            <p className="mt-2 text-sm text-red-600">{formError}</p>
          )}
          {org_name.trim() &&
            org_name.trim() !== org.org_name &&
            !formError && (
              <p className="mt-2 text-sm text-green-600">
                ✅ Will be updated to:{" "}
                <span className="font-medium">"{org_name.trim()}"</span>
              </p>
            )}
        </form>
      </div>

      {/* Organization Details */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Organization Details</h2>
        <div className="space-y-3 text-gray-700 text-sm">
          <div>
            <span className="font-medium">ID:</span>{" "}
            <code className="ml-1 text-xs">{org._id}</code>
          </div>
          <div>
            <span className="font-medium">Admin ID:</span>{" "}
            <code className="ml-1 text-xs">{org.administrator_id}</code>
          </div>
          <div>
            <span className="font-medium">Created:</span>{" "}
            {new Date(org.created_at).toLocaleString()}
          </div>
          <div>
            <span className="font-medium">Last Updated:</span>{" "}
            {new Date(org.updated_at).toLocaleString()}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <Button onClick={handleDelete} variant="destructive">
            Delete Organization
          </Button>
        </div>
      </div>
    </div>
  );
}
