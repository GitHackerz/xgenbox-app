"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  adminNavItems,
  collectorNavItems,
  companyNavItems,
  employeeNavItems,
} from "@/constants/data";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import DashboardNav from "@/components/dashboard/layout/sidebar/dashboard-nav";
import { UserType } from "@/enums";
import useSession from "@/hooks/useSession";

export function MobileSidebar() {
  const { user } = useSession();
  const [open, setOpen] = useState(false);
  if (user)
    return (
      <>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="left" className="!px-0">
            <div className="space-y-4 py-4">
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                  Overview
                </h2>
                <div className="space-y-1">
                  <DashboardNav
                    items={
                      user.role == UserType.ADMIN
                        ? adminNavItems
                        : user.role == UserType.COLLECTOR
                          ? collectorNavItems
                          : user.role == UserType.COMPANY
                            ? companyNavItems
                            : user.role == UserType.EMPLOYEE
                              ? employeeNavItems
                              : []
                    }
                    setOpen={setOpen}
                  />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
}
