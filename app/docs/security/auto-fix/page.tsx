'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Wrench, ChevronRight, CheckCircle2, AlertCircle, Info, Terminal
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

export default function AutoFixCapabilitiesPage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Security & Compliance</span>
          <ChevronRight size={14} />
          <span>Auto-Fix Capabilities</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <Wrench size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">Auto-Fix Capabilities</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          DevForge provides deterministic auto-fix remediation to quickly resolve security and configuration violations in your workflows.
        </p>
      </motion.div>

      {/* Remediations Supported */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Supported Remediations</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          The auto-fix engine is designed to handle common structure gaps:
        </p>
        <ul className="space-y-3">
          {[
            { title: 'Workflow Permissions Narrowing', desc: 'Adds explicit `permissions: read-all` or custom token blocks to prevent wildcard pipeline scopes.' },
            { title: 'Action Pinning', desc: 'Resolves unpinned third-party actions by converting mutable tags (e.g. `@v3`) into immutable SHA-1 commit digests.' },
            { title: 'Log Configuration Refactoring', desc: 'Appends necessary debug flags and console capture commands in generation targets.' },
            { title: 'Deprecated Property Replacements', desc: 'Updates deprecated settings in GitHub Actions to their modern alternatives.' }
          ].map((item, idx) => (
            <li key={idx} className="flex gap-3">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
              <div>
                <span className="font-semibold text-sm block">{item.title}</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Remediations Execution */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">How to Run Auto-Fix</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Pass the <code className="font-mono text-xs px-1 rounded" style={{ background: 'var(--bg-code)' }}>--fix</code> flag to the audit command:
        </p>
        <CodeBlock code="devforge audit --security --fix" />
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          For automated or non-interactive environments (such as CI runners), add the <code className="font-mono text-xs px-1.5 rounded" style={{ background: 'var(--bg-code)' }}>--yes</code> flag to auto-approve fixes:
        </p>
        <CodeBlock code="devforge audit --security --fix --yes" />
      </motion.section>

      {/* Limitations */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Limitations & Safe Boundaries</h2>
        <div className="p-5 rounded-xl border flex items-start gap-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
          <AlertCircle size={24} className="shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
          <div className="space-y-2 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p><strong>Business Logic:</strong> Auto-fix NEVER edits application business logic. It operates strictly on configuration manifests and runner workflows.</p>
            <p><strong>Interactive Approvals:</strong> If not running with <code>--yes</code>, DevForge writes changes to a draft staging log and displays a interactive diff to confirm changes before committing files.</p>
            <p><strong>Third-party Scopes:</strong> Hand-authored workflows are avoided unless they match common security vulnerability signatures.</p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
