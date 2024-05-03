import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Bin } from "@/types/Bin";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "@/types/User";
import { UserType } from "@/enums";
import { columns } from "@/components/dashboard/tables/bin-table/columns";
import { columnsCollector } from "@/components/dashboard/tables/bin-table/columns-collector";

interface ProductsClientProps {
  data: Bin[];
  user: User;
}

export const BinClient: React.FC<ProductsClientProps> = ({ data, user }) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Bins (${data.length})`}
          description="List of all bins in the system"
        />
        {[UserType.COMPANY, UserType.ADMIN].includes(user.role) && (
          <Link
            href={
              user.role == UserType.ADMIN
                ? "/dashboard/bin/new"
                : user.role == UserType.COMPANY
                  ? "/dashboard/bin/request"
                  : ""
            }
          >
            <Button className="text-xs md:text-sm">
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </Link>
        )}
      </div>
      <Separator />
      <DataTable
        searchKey="type"
        columns={user.role === UserType.ADMIN ? columns : columnsCollector}
        data={data}
      />
    </>
  );
};
