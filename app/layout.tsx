import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "沐爪宠物洗护",
  description: "沐爪宠物洗护提供温和、透明、低压力的猫狗洗护与造型服务。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
