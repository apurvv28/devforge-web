// app/layout.tsx
import type { Metadata } from 'next'
import { GeistSans, GeistMono } from './fonts'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ChangelogPopup } from '@/components/ChangelogPopup'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'DevForge - Agentic AI DevOps Pipeline Generator',
  description: 'Production-ready CI/CD pipelines with AI-powered recommendations. Support for Amazon Nova Pro, Gemini, OpenAI, Anthropic, and Bedrock.',
  keywords: 'devops, ci/cd, ai, pipeline, automation, security, compliance, iac',
  openGraph: {
    title: 'DevForge - Agentic AI DevOps Pipeline Generator',
    description: 'Production-ready CI/CD pipelines with AI-powered recommendations.',
    url: 'https://devforge-ai.vercel.app',
    siteName: 'DevForge',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevForge - Agentic AI DevOps Pipeline Generator',
    description: 'Production-ready CI/CD pipelines with AI-powered recommendations.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="theme-transition">
        <ThemeProvider>
          {children}
          <ChangelogPopup />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}