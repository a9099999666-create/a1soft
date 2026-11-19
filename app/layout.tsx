import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A1Soft",
  description:
    "Сложное должно быть простым. Международная команда. Собственные продукты в программной разработке и искусственном интеллекте.",
  applicationName: "A1Soft",
};

export const viewport: Viewport = {
  themeColor: "#06111B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${inter.className} ${inter.variable} h-full antialiased`}
    >
      <body id="top" className="min-h-full">
        {children}
      </body>
    </html>
  );
}
