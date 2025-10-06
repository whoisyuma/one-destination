import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One Destination",
  description: "友人とグループを作成して、行きたい場所を共有しあうWebアプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

      {/* ヘッダー */}
      <header className="w-full p-5 bg-sky-100">
        <div className="flex justify-center items-end">
          <h1 className="font-bold text-2xl mr-1 text-emerald-500 mt-10">Destination</h1>
        </div>
      </header>

        {children}
      </body>
    </html>
  );
}
