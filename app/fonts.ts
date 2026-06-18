// app/fonts.ts
import localFont from 'next/font/local'

export const GeistSans = localFont({
  src: [
    {
      path: '../public/fonts/Geist-Regular.woff2',
      weight: '400',
    },
    {
      path: '../public/fonts/Geist-Medium.woff2',
      weight: '500',
    },
    {
      path: '../public/fonts/Geist-SemiBold.woff2',
      weight: '600',
    },
  ],
  variable: '--font-geist-sans',
  display: 'swap',
})

export const GeistMono = localFont({
  src: [
    {
      path: '../public/fonts/GeistMono-Regular.woff2',
      weight: '400',
    },
    {
      path: '../public/fonts/GeistMono-Medium.woff2',
      weight: '500',
    },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
})