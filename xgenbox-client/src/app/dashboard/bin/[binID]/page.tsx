import BreadCrumb from "@/components/dashboard/breadcrumb";
import { BinForm } from "@/components/dashboard/forms/bin-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { getBin } from "@/actions/bin";

export default async function Page({ params }: { params: { binID: string } }) {
  const breadcrumbItems = [
    { title: "User", link: "/dashboard/user" },
    { title: "Create", link: "/dashboard/user/create" },
  ];
  const { binID } = params;
  const bin = binID !== "new" ? await getBin(binID) : null;

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <BinForm initialData={bin} binID={binID} />
      </div>
    </ScrollArea>
  );
}
