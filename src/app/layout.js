import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700'] });

export const metadata = {
  title: "Agave Fitness | Tu Centro de Entrenamiento Virtual",
  description: "Plataforma de bienestar físico integral y entrenamiento virtual inteligente.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={outfit.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
