import BreadCrumb from "@/components/dashboard/breadcrumb";
import { UserClient } from "@/components/dashboard/tables/user-table/client";
import { getUsers } from "@/actions/user";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];
export default async function UserPage() {
  const users = await getUsers();
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </>
  );
}
