import type { Metadata } from "next";
import { Press_Start_2P, Cardo, Poppins, Raleway } from "next/font/google";
import "./globals.css";

const PressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const CormorantGaramond = Cardo({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const PoppinsFont = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const RalewayFont = Raleway({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokedex",
  description: "A simple pokedex app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`
      ${PressStart.className}
      ${CormorantGaramond.className}
      ${RalewayFont.className}
      ${PoppinsFont.className}
    `}>
      <body>
        {children}
      </body>
    </html>
  );
}
