import BreadCrumb from "@/components/dashboard/breadcrumb";
import { BinClient } from "@/components/dashboard/tables/bin-table/client";
import { getBins, getCompanyBins } from "@/actions/bin";
import { getSession } from "@/lib/auth";
import { CollectorAccountType, UserType } from "@/enums";
import { Collector } from "@/types/User";

const breadcrumbItems = [{ title: "Bin", link: "/dashboard/bin" }];
export default async function UserPage() {
  const session = await getSession();
  if (!session) return null;
  const { user } = session;
  if (!user) return null;
  if (
    ![UserType.COMPANY, UserType.COLLECTOR, UserType.ADMIN].includes(user.role)
  )
    return (
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <h1 className="text-2xl text-red-500 text-center pt-5">
          You are not authorized to view this page
        </h1>
      </div>
    );

  const bins =
    user.role === UserType.COMPANY
      ? await getCompanyBins(user._id)
      : user.role === UserType.COLLECTOR &&
          (user as Collector).accountType === CollectorAccountType.COMPANY
        ? await getCompanyBins((user as Collector).company)
        : await getBins();

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <BinClient data={bins} />
      </div>
    </>
  );
}
