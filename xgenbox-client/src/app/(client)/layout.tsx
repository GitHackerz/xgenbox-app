import type { Metadata } from "next";
import React from "react";
import Header from "@/components/client/layout/header";
import Footer from "@/components/client/layout/footer";

export const metadata: Metadata = {
  title: "XGenBox Client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        {children}
      </main>
      <Footer />
    </>
  );
}
