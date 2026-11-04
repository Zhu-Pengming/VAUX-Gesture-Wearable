import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VAUX — Beyond Touch",
  description: "Movement is the interface. Explore VAUX's gesture wearable concept for creation, expression, and control.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
