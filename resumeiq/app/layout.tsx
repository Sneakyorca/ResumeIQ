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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "ResumeIQ — AI resume review",
    template: "%s | ResumeIQ",
  },
  description:
    "Upload your resume and get an instant score, category feedback, and line-by-line rewrites.",
  openGraph: {
    type: "website",
    siteName: "ResumeIQ",
    title: "ResumeIQ — AI resume review",
    description:
      "Instant resume score, category feedback, and line-by-line rewrites.",
  },
  twitter: { card: "summary_large_image" },
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
