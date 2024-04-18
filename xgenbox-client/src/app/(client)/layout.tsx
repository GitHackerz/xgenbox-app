import "@/app/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SetupProvider from "@/lib/SetupProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XGENBOX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-white dark:bg-gray-900"}>
        <SetupProvider>
          <Header />
          <main className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
            {children}
          </main>
          <Footer />
          <Toaster />
        </SetupProvider>
      </body>
    </html>
  );
}
