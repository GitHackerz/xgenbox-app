"use client";

import { NextUIProvider } from "@nextui-org/react";
import React from "react";

export default function SetupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
