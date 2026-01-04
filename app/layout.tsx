import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flustre",
  description: "AI that talks like humans to humans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#05050a]">
      <body
        className={`${plusJakarta.variable} font-sans antialiased bg-[#05050a]`}
      >
        {children}
      </body>
    </html>
  );
}
