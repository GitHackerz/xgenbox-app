import BreadCrumb from "@/components/dashboard/breadcrumb";
import { getCompanyBinActions } from "@/actions/binActions";
import { getSession } from "@/lib/auth";
import { BinActionClient } from "@/components/dashboard/tables/binaction-table/client";

const breadcrumbItems = [
  { title: "Collection", link: "/dashboard/collection" },
];
export default async function UserPage() {
  const session = await getSession();
  if (!session) return null;
  const { user } = session;
  if (!user) return null;

  if (user.role !== "COMPANY")
    return (
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <h1 className="text-2xl text-red-500">Access Denied</h1>
      </div>
    );

  const collections = await getCompanyBinActions(user._id);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <BinActionClient title="Company Bin Actions" data={collections} />
      </div>
    </>
  );
}
