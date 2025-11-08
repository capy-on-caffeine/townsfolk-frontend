import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Auth0ProviderClient from "@/components/Auth0ProviderClient";

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-urbanist',
});

export const metadata: Metadata = {
  title: "Townsfolk - AI Persona Feedback for Startups",
  description: "Get authentic feedback on your startup idea from AI-generated personas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} antialiased min-h-screen bg-black text-white`}>
        <Auth0ProviderClient>
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
        </Auth0ProviderClient>
      </body>
    </html>
  );
}
