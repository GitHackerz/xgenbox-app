"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ShieldAlert, Trash } from "lucide-react";
import { deleteUser, grantUser } from "@/actions/user";
import { User } from "@/types/User";
import useSession from "@/hooks/useSession";
import { UserType } from "@/enums";

interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { user } = useSession();
  if (!user) return null;

  if (user.role == UserType.ADMIN)
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Access</DropdownMenuLabel>
          <DropdownMenuItem
            style={{ color: "#57e363" }}
            onClick={() => grantUser(data._id)}
          >
            <ShieldAlert className="mr-2 h-4 w-4" />
            Grant
          </DropdownMenuItem>
          {user?._id !== data._id && (
            <DropdownMenuItem
              style={{ color: "#e3576c" }}
              onClick={() => deleteUser(data._id)}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
};
