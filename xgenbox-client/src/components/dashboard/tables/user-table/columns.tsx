"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/User";
import { Button } from "@/components/ui/button";
import { approveUser, rejectUser } from "@/actions/user";
import { UserStatus } from "@/enums";
import ActionButton from "@/components/dashboard/tables/user-table/action-button";

export const columns: ColumnDef<User>[] = [
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
    cell: ({ row }) =>
      row.original.status == UserStatus.PENDING && (
        <div className="inline-flex items-center gap-2">
          <ActionButton type={"approve"} row={row} />
          <ActionButton type={"reject"} row={row} />
        </div>
      ),
  },
];
