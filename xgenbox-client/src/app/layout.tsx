import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
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
      <body className={inter.className + "bg-white dark:bg-gray-900"}>
        <SetupProvider>{children}</SetupProvider>
      </body>
    </html>
  );
}
