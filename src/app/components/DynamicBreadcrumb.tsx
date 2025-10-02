// src/components/DynamicBreadcrumb.tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

const formatSegment = (segment: string): string => {
  return segment
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

function DynamicBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Home</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  const breadcrumbItems = segments.map((_, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = formatSegment(segments[index]);
    return { href, label };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              <BreadcrumbLink
                href={item.href}
                className={
                  index === breadcrumbItems.length - 1 ? "font-medium" : ""
                }
              >
                {item.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default DynamicBreadcrumb;
