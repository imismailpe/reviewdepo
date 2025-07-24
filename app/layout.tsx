import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AllProviders from "@/app/AllProviders";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Review Depo",
  description: "Reviews of products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AllProviders>
          <header className="bg-primary text-white w-full h-16 p-4 flex items-center gap-12 shadow-sm">
            <a href="/">Home</a>
            <a href="/article/create">Create</a>
          </header>
          <main className="p-4">{children}</main>
          <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </AllProviders>
      </body>
    </html>
  );
}
