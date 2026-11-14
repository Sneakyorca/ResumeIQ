import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import { getUser } from "./auth/actions";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResumeIQ",
  description: "...",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { navUser } = await getUser();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-black">
        <Navbar user={navUser} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
