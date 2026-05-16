import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arb-Yield // Receta de Arbitraje',
  description: 'Oportunidad de Arbitraje: Hardware B2B a D2C. Receta verificada con Machine Payments Protocol.',
  keywords: ['arbitrage', 'hardware', 'b2b', 'd2c', 'mpp', 'machine-payments'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-black text-gray-100 font-mono antialiased">
        {children}
      </body>
    </html>
  )
}
