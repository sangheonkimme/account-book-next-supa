"use client";

import React from "react";
import AuthButton from "@/components/auth/AuthButton";
import {
  AppShell,
  Group,
  Container,
  Title,
  MantineProvider,
} from "@mantine/core";
import GoogleAnalytics from "../common/GoogleAnalytics";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <MantineProvider>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}

      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Title order={3}>나의 가계부</Title>
            <AuthButton />
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          {/* Children */}
          <Container>{children}</Container>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
};

export default Layout;
