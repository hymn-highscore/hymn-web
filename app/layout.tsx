import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "./providers/ThemeProvider";
import MusicPreloader from "./components/MusicPreloader";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SoundOfHymns",
  description: "Bringing the majestic sound of hymns everywhere.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} antialiased font-sans`}
      >
        <ThemeProvider>
          <NextTopLoader color="#a855f7" showSpinner={false} />
          <MusicPreloader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
