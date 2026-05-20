import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { ClerkProvider } from "@clerk/nextjs";
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'NourishWell Admin Dashboard',
  description: 'Premium admin dashboard for nutritionist platform management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>

    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}
