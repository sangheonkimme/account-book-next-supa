"use client";

import Script from "next/script";

declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

export const gtagEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Original Gtag
// <!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-9WB94T7SLE"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-9WB94T7SLE');
// </script>

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      ></Script>
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}');
        `,
        }}
      ></Script>
    </>
  );
}
