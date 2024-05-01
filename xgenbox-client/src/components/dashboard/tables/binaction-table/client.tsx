import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { BinAction } from "@/types/Bin";

interface DataClientProps {
  data: BinAction[];
  title: string;
}

export const BinActionClient: React.FC<DataClientProps> = ({ data, title }) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`${title} (${data.length})`}
          description="List of all bins in the system"
        />
        {/*<Link href={"/dashboard/bin/new"}>*/}
        {/*  <Button className="text-xs md:text-sm">*/}
        {/*    <Plus className="mr-2 h-4 w-4" /> Add New*/}
        {/*  </Button>*/}
        {/*</Link>*/}
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
