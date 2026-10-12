import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "Margin — Mini CMS", template: "%s · Margin" },
  description:
    "A small space for thoughtful stories. A local editorial CMS demo.",
};
export const runtime = "nodejs";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
