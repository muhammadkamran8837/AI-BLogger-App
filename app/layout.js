import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="px-5 md:px-24 py-6"> {children}</main>
        <Toaster position="top-right" theme="light" richColors />
      </body>
    </html>
  );
}
