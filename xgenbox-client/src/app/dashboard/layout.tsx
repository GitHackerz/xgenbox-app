import Sidebar from "@/components/dashboard/layout/sidebar";
import { ReactNode } from "react";
import Header from "@/components/dashboard/layout/header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-16">{children}</main>
      </div>
    </>
  );
}
