import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import GlobalErrorToasts from "@/components/GlobalErrorToasts";
import { DialogsContextProvider } from "@/contexts/DialogsProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flaschards App",
  icons: {
    icon: "/favicon.png",
  },
  keywords: ["flashcards", "studying", "learning"],
  alternates: {
    canonical: "localhost:3000/",
  },
  description:
    "A modern flashcard app for learning. Create custom flashcard sets, review efficiently, and track your progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased text-foreground px-4`}>
        <DialogsContextProvider>
          <main className="container mx-auto">
            <Navbar />
            {children}
          </main>
          <GlobalErrorToasts />
        </DialogsContextProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
