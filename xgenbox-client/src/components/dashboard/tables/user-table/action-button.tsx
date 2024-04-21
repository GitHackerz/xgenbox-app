import { approveUser, rejectUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function ActionButton({
  type,
  row,
}: {
  type: string;
  row: any;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    if (type === "approve") {
      await approveUser(row.original._id);
      row.original.status = "Approved";
    } else {
      await rejectUser(row.original._id);
      row.original.status = "Rejected";
    }

    setLoading(false);
  };
  return (
    <Button
      disabled={loading}
      variant="outline"
      size="sm"
      className={
        type === "approve"
          ? "text-blue-600 hover:bg-blue-600 hover:text-white capitalize"
          : "text-red-600 hover:bg-red-600 hover:text-white capitalize"
      }
      onClick={handleClick}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {type}
    </Button>
  );
}
