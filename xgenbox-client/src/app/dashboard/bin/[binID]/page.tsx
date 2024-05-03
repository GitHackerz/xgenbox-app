import BreadCrumb from "@/components/dashboard/breadcrumb";
import { BinForm } from "@/components/dashboard/forms/bin-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { getBin } from "@/actions/bin";
import { UserType } from "@/enums";
import { getSession } from "@/lib/auth";

const breadcrumbItems = [
  { title: "User", link: "/dashboard/user" },
  { title: "Create", link: "/dashboard/user/create" },
];

export default async function Page({ params }: { params: { binID: string } }) {
  const session = await getSession();
  if (!session) return null;
  const { user } = session;
  if (!user) return null;

  if (![UserType.ADMIN].includes(user.role))
    return (
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <h1 className="text-2xl text-red-500 text-center pt-5">
          You are not authorized to view this page
        </h1>
      </div>
    );

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
