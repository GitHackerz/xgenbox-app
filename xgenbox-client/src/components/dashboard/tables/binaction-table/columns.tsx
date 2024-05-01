"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BinAction } from "@/types/Bin";

export const columns: ColumnDef<BinAction>[] = [
  {
    accessorKey: "bin",
    header: "BIN ID",
    cell: ({ row }) => row.original.bin.type,
  },
  {
    accessorKey: "user",
    header: "USER",
    cell: ({ row }) => row.original.user.name,
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
    accessorKey: "createdAt",
    header: "CREATED AT",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  },
];
