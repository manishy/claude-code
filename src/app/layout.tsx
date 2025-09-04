import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CustomThemeProvider from "../components/ThemeProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Material-UI Next.js App",
  description: "A Next.js app with Material-UI components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <CustomThemeProvider>
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
