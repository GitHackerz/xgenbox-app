import {
  adminNavItems,
  collectorNavItems,
  companyNavItems,
  employeeNavItems,
} from "@/constants/data";
import { cn } from "@/lib/utils";
import DashboardNav from "./dashboard-nav";
import { getSession } from "@/lib/auth";
import { UserType } from "@/enums";

export default async function Sidebar() {
  const session = await getSession();
  if (session) {
    const { user } = session;

    return (
      <nav
        className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72`)}
      >
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight ">
                Overview
              </h2>
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
              />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
