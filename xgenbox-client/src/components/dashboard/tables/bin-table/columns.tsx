"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Bin } from "@/types/Bin";
import { CellAction } from "@/components/dashboard/tables/bin-table/cell-action";

export const columns: ColumnDef<Bin>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "TYPE",
  },
  {
    accessorKey: "weight",
    header: "WEIGHT",
  },
  {
    accessorKey: "latitude",
    header: "LATITUDE",
  },
  {
    accessorKey: "longitude",
    header: "LONGITUDE",
  },
  {
    accessorKey: "capacity",
    header: "CAPACITY",
    cell: ({ row }) => (
      <div className="flex items-center">
        <div
          className={`px-2 py-1 w-fit text-xs font-semibold rounded-full ${
            row.original.capacity < 50
              ? "bg-green-100 text-green-800"
              : row.original.capacity < 80
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.capacity} %
        </div>
      </div>
    ),
  },
  {
    accessorKey: "temperature",
    header: "TEMPERATURE",
  },
  {
    accessorKey: "gaz",
    header: "GAZ",
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
