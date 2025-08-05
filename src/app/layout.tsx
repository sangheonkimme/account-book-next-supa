import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";

export const metadata: Metadata = {
  title: "나의 사랑스런 가계부",
  description: "수입과 지출을 기록합니다.",
  openGraph: {
    title: "나의 사랑스런 가계부",
    description: "수입과 지출을 기록합니다.",
    url: "https://account-book-next.vercel.app/",
    siteName: "나의 사랑스런 가계부",
    images: [
      {
        url: "/images/og-image.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body suppressHydrationWarning>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {children}
      </body>
    </html>
  );
}
