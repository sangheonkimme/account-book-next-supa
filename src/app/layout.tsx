import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "나의 사랑스런 가계부",
  description: "수입과 지출을 기록합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
