"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import useSession from "@/hooks/useSession";

export default function SetupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useSession();

  if (!loading)
    return (
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextUIProvider>{children}</NextUIProvider>
      </NextThemesProvider>
    );
}
