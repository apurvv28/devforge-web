'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Handshake, ChevronRight, CheckCircle2, GitPullRequest, Terminal, Code
} from 'lucide-react'

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="rounded-xl border font-mono text-sm overflow-x-auto my-3"
      style={{ background: 'var(--bg-code)', borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-2 px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
        <Terminal size={13} style={{ color: 'var(--accent)' }} />
        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>terminal</span>
      </div>
      <pre className="px-4 py-3 m-0 border-none" style={{ background: 'transparent' }}>
        <code style={{ color: 'var(--text-primary)' }}>
          <span style={{ color: 'var(--text-tertiary)' }}>$ </span>{code}
        </code>
      </pre>
    </div>
  )
}

export default function ContributingPage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Contributing</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <Handshake size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">Contributing Guide</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Thank you for your interest in contributing to DevForge! We welcome pull requests, bug reports, and suggestions to make cloud infrastructure generation better for everyone.
        </p>
      </motion.div>

      {/* Local Setup */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Code size={20} style={{ color: 'var(--accent)' }} />
          Local Development Setup
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Follow these steps to set up a local development copy:
        </p>
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-sm">Step 1: Clone the repository</span>
            <CodeBlock code="git clone https://github.com/apurvv28/DevForge.git" />
          </div>
          <div>
            <span className="font-semibold text-sm">Step 2: Install dependencies</span>
            <CodeBlock code="npm install" />
          </div>
          <div>
            <span className="font-semibold text-sm">Step 3: Run local unit tests</span>
            <CodeBlock code="npm run test" />
          </div>
        </div>
      </motion.section>

      {/* Code Standards */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <GitPullRequest size={20} style={{ color: 'var(--accent)' }} />
          Standards & Pull Requests
        </h2>
        <div className="p-5 rounded-xl border space-y-4 text-sm" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
          <div className="flex gap-3">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
            <div>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>TypeScript First:</span>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>All new commands, models, or hooks must be written in clean, strongly-typed TypeScript.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
            <div>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Unit Tests Required:</span>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Include test assertions for new parsing logic or generation targets to prevent regressions.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
            <div>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Small Commits:</span>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Keep pull requests scoped to single features or bugs to simplify the review cycle.</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
