import BreadCrumb from "@/components/dashboard/breadcrumb";
import { getCollectorBinActions } from "@/actions/binActions";
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

  const collections = await getCollectorBinActions(user._id);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <BinActionClient title={"Bin Actions History"} data={collections} />
      </div>
    </>
  );
}
