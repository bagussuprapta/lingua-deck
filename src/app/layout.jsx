import { Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";

import { AuthContextProvider } from "@/contexts/authContext";
import AppLayout from "@/components/AppLayout";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LinguaDeck - Learn Languages with Flashcards",
  description: "LinguaDeck is a language learning app with interactive flashcards. Learn new vocabulary in a fun and effective way!",
  keywords: "LinguaDeck, flashcards, language learning, vocabulary, learn languages, study, education",
  authors: [{ name: "Bagus Suprapta", url: "https://bagussuprapta.netlify.app" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${geistMono.variable}`}
      style={{
        "--font-base": "var(--font-nunito)",
        "--font-mono": "var(--font-geist-mono)",
      }}
    >
      <body className="text-sm">
        <AuthContextProvider>
          <AppLayout>{children}</AppLayout>
        </AuthContextProvider>
      </body>
    </html>
  );
}
