import { ScrollArea } from "@/components/ui/scroll-area";
import BreadCrumb from "@/components/dashboard/breadcrumb";
import React from "react";
import { BinRequestForm } from "@/components/dashboard/forms/bin-request-form";

export default function RequestBinPage() {
  const breadcrumbItems = [
    { title: "User", link: "/dashboard/user" },
    { title: "Create", link: "/dashboard/user/create" },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <BinRequestForm />
      </div>
    </ScrollArea>
  );
}
