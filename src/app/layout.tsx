import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The AI Search Report — Data & Trends",
  description:
    "An interactive data journalism piece exploring the explosive growth of AI search and its impact on the traditional search landscape.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script src="https://js.hsforms.net/forms/embed/20896464.js" defer></script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
