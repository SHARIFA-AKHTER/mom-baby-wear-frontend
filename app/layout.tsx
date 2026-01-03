import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { AuthProvider } from "./providers/AuthProvider";

import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "Mom & Baby Wear",
  description: "Your one-stop shop for mom & baby essentials",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <QueryProvider>
          
          <GoogleOAuthProvider clientId={googleClientId}>
            <AuthProvider>
              <Navbar />
              <main className="container mx-auto px-4 min-h-screen">
                {children}
              </main>
              <Footer />
            </AuthProvider>
          </GoogleOAuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}