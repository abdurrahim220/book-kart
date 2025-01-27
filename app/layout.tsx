import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';


import StoreProvider from "./StoreProvider";
const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",

});

export const metadata: Metadata = {
  title: "Book Kart",
  description: "This is  e-commerce platform where you can buy or sell you used books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={roboto_mono.className}
      >
        <StoreProvider>
         
          {children}
          <Toaster />
        </StoreProvider>

      </body>
    </html>
  );
}
