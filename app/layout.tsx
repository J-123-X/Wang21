import type { Metadata, Viewport } from 'next'
import { LXGW_WenKai_TC } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const lxgw = LXGW_WenKai_TC({ 
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lxgw",
})

export const metadata: Metadata = {
  title: '\u751f\u65e5\u5feb\u4e50 - \u7ed9\u4eb2\u7231\u7684\u6c6a',
  description: '\u4e00\u4e2a\u7279\u522b\u7684\u751f\u65e5\u795d\u798f\u7f51\u9875',
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

export const viewport: Viewport = {
  themeColor: '#e8a0a0',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${lxgw.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
