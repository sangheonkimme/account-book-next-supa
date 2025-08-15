"use client";

import { MantineProvider as Provider, createTheme } from "@mantine/core";
import { PropsWithChildren } from "react";

const theme = createTheme({});

export default function MantineProvider({ children }: PropsWithChildren) {
  return <Provider theme={theme}>{children}</Provider>;
}
