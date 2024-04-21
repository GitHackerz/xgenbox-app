import BreadCrumb from "@/components/dashboard/breadcrumb";
import { BinClient } from "@/components/dashboard/tables/bin-table/client";
import { getBins } from "@/actions/bin";

const breadcrumbItems = [{ title: "Bin", link: "/dashboard/bin" }];
export default async function UserPage() {
  const bins = await getBins();
  console.log(bins);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <BinClient data={bins} />
      </div>
    </>
  );
}
