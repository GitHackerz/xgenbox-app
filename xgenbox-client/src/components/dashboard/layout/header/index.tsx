import ThemeToggle from "@/components/dashboard/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link
            href={"/dashboard"}
            className="inline-flex items-center font-bold text-lg text-primary-500 dark:text-primary-400"
          >
            <div className="dark:block hidden">
              <Image
                src={"/images/logoW.webp"}
                width={120}
                height={120}
                alt="logo"
              />
            </div>
            <div className="block dark:hidden">
              <Image
                src={"/images/logo.webp"}
                width={120}
                height={120}
                alt="logo"
              />
            </div>
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
