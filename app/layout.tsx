import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { CartProvider } from '@/components/cart/cart-provider'
import { CartSheet } from '@/components/cart/cart-sheet'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'HYPERFLUX | High-Power Li-Ion Batteries for FPV & Robotics',
  description: 'NZ-made high-drain lithium-ion battery packs engineered for FPV, robotics, and high-current applications. 70A continuous, 250A burst discharge.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
          <CartSheet />
          <Toaster position="bottom-right" theme="dark" richColors />
        </CartProvider>
      </body>
    </html>
  )
}
