import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BMI Calculator',
  description: 'Calculate your Body Mass Index and get health insights',
  keywords: ['BMI', 'calculator', 'health', 'fitness', 'weight'],
  authors: [{ name: 'BMI Calculator Team' }],
  creator: 'BMI Calculator Team',
  publisher: 'BMI Calculator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bmi-calculator.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and get health insights',
    type: 'website',
    locale: 'en_US',
    url: 'https://bmi-calculator.vercel.app',
    siteName: 'BMI Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and get health insights',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  )
}