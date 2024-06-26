"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Bin } from "@/types/Bin";
import { CellAction } from "@/components/dashboard/tables/bin-table/cell-action";
import { BinStatus } from "@/enums";
import ActionButton from "@/components/dashboard/tables/bin-table/action-button";

export const columns: ColumnDef<Bin>[] = [
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
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) =>
      row.original.status && (
        <div
          className={`px-2 py-1 w-fit text-xs font-semibold rounded-full ${
            row.original.status === BinStatus.APPROVED
              ? "bg-green-100 text-green-800"
              : row.original.status === BinStatus.PENDING
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.status}
        </div>
      ),
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row }) =>
      row.original.status !== BinStatus.PENDING ? (
        <CellAction data={row.original} />
      ) : (
        <>
          <ActionButton type="approve" row={row} />
          <ActionButton type="reject" row={row} />
        </>
      ),
  },
];
