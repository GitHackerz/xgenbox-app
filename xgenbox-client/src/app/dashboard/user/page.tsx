import BreadCrumb from "@/components/dashboard/breadcrumb";
import { UserClient } from "@/components/dashboard/tables/user-table/client";
import { getCompanyUsers, getUsers } from "@/actions/user";
import { UserType } from "@/enums";
import { getSession } from "@/lib/auth";
import React from "react";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];
export default async function UserPage() {
  const session = await getSession();
  if (!session) return null;
  const { user } = session;
  if (!user) return null;

  if (![UserType.ADMIN, UserType.COMPANY].includes(user.role))
    return (
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <h1 className="text-2xl text-red-500 text-center pt-5">
          You are not authorized to view this page
        </h1>
      </div>
    );

  const users =
    user.role === UserType.ADMIN
      ? await getUsers()
      : user.role === UserType.COMPANY && (await getCompanyUsers(user._id));

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </>
  );
}
