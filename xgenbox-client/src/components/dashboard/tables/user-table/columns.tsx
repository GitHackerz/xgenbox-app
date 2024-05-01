"use client";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/User";
import { UserStatus } from "@/enums";
import ActionButton from "@/components/dashboard/tables/user-table/action-button";
import { CellAction } from "@/components/dashboard/tables/user-table/cell-action";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => (
      <div className="flex flex-col items-start">
        <p className="font-semibold">{row.original.name}</p>
        <p className="text-xs text-muted-foreground"> {row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "PHONE",
  },
  {
    accessorKey: "role",
    header: "ROLE",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => (
      <div
        className={`px-2 py-1 w-fit text-xs font-semibold rounded-full ${
          row.original.status == UserStatus.PENDING
            ? "bg-yellow-100 text-yellow-800"
            : row.original.status == UserStatus.APPROVED
              ? "bg-green-100 text-green-800"
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
    cell: ({ row }) => (
      <div className="inline-flex items-center gap-2">
        {row.original.status == UserStatus.PENDING && (
          <>
            <ActionButton type={"approve"} row={row} />
            <ActionButton type={"reject"} row={row} />
          </>
        )}
        <CellAction data={row.original} />
      </div>
    ),
  },
];
