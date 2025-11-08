import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Auth0ProviderClient from "@/components/Auth0ProviderClient";

const inter = Inter({ subsets: ["latin"] });

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
      <body className="antialiased min-h-screen bg-black text-white">
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
