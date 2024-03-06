import Navbar from "@/components/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { AuthContextProvider } from "@/app/context/AuthContext";

const font = Montserrat({
  weight: "500",
  preload: false,
});

export const metadata = {
  title: "LearnThink",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`antialiased min-h-screen text-black  ${font.className}`}>
        <AuthContextProvider>
          <div className="max-w-screen-xl mx-auto min-h-screen">
            <Navbar />

            <main className="min-height-md">{children}</main>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
