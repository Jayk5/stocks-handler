import { Inter } from "next/font/google";
import "./globals.css";
import "./navbar"
import Navbar from "./navbar";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
