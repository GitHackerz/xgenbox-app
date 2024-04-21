import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { Bin } from "@/types/Bin";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductsClientProps {
  data: Bin[];
}

export const BinClient: React.FC<ProductsClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Bins (${data.length})`}
          description="List of all bins in the system"
        />
        <Link href={"/dashboard/bin/new"}>
          <Button className="text-xs md:text-sm">
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </Link>
      </div>
      <Separator />
      <DataTable searchKey="type" columns={columns} data={data} />
    </>
  );
};
