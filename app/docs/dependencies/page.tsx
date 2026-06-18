'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Package, ChevronRight, CheckCircle2, Info
} from 'lucide-react'

const deps = [
  { name: 'commander', purpose: 'CLI command parsing and option handling', date: '2026-06-01' },
  { name: 'inquirer', purpose: 'Interactive prompts during init and update', date: '2026-06-01' },
  { name: 'chalk', purpose: 'Colored terminal output', date: '2026-06-01' },
  { name: 'ora', purpose: 'Progress spinners for detection phases', date: '2026-06-01' },
  { name: 'js-yaml', purpose: 'YAML parsing and validation', date: '2026-06-01' },
  { name: 'cli-table3', purpose: 'Tabular CLI summaries', date: '2026-06-01' },
  { name: 'cli-highlight', purpose: 'Syntax-highlighted previews in console', date: '2026-06-01' },
  { name: 'zod', purpose: 'Runtime schema validation', date: '2026-06-01' },
  { name: 'diff', purpose: 'Unified diffs for update mode', date: '2026-06-01' },
  { name: 'tinybench', purpose: 'Benchmarking init performance', date: '2026-06-01' },
  { name: 'jest', purpose: 'Test runner', date: '2026-06-01' },
  { name: 'ts-jest', purpose: 'TypeScript test compilation', date: '2026-06-01' }
]

export default function DependenciesPage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Dependencies</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <Package size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">Dependencies</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          DevForge is designed with a lightweight footprint. This page documents the direct third-party library dependencies of the tool.
        </p>
      </motion.div>

      {/* Dependency List Table */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Dependency Register</h2>
        <div className="rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: 'var(--border)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--bg-code)' }}>
                <th className="p-3 text-left font-semibold">Dependency</th>
                <th className="p-3 text-left font-semibold">Why it is needed</th>
                <th className="p-3 text-center font-semibold">Last Reviewed</th>
              </tr>
            </thead>
            <tbody>
              {deps.map((d) => (
                <tr key={d.name} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="p-3 font-mono text-xs font-semibold" style={{ color: 'var(--accent)' }}>{d.name}</td>
                  <td className="p-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{d.purpose}</td>
                  <td className="p-3 text-center text-xs font-mono text-secondary" style={{ color: 'var(--text-tertiary)' }}>{d.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Security note */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <div className="p-5 rounded-xl border flex items-start gap-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
          <Info size={24} className="shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
          <div>
            <h3 className="font-bold text-sm mb-1">Dependency Security Audits</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Dependencies are scanned weekly for vulnerabilities using static scanners. Any production warnings or security advisories are immediately resolved, or reviewed inside the Security Model register.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
