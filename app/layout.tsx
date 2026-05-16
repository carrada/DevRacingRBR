import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arb-Yield // Receta de Arbitraje',
  description: 'Oportunidad de Arbitraje: Hardware B2B a D2C. Receta verificada con Machine Payments Protocol.',
  keywords: ['arbitrage', 'hardware', 'b2b', 'd2c', 'mpp', 'machine-payments'],
  robots: 'index, follow',
  openGraph: {
    title: 'Arb-Yield // Receta de Arbitraje',
    description: 'Oportunidad de Arbitraje: Hardware B2B a D2C. Receta verificada con Machine Payments Protocol.',
    type: 'website',
    url: 'https://arb-yield.vercel.app',
  },
  alternates: {
    canonical: 'https://arb-yield.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-black text-gray-100 font-mono antialiased">
        {children}
      </body>
    </html>
  )
}
