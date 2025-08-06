import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard Pelacakan BTS",
  description: "Melacak lokasi menara seluler menggunakan Unwired Labs API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
