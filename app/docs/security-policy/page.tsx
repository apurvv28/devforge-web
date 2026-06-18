'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ShieldAlert, ChevronRight, CheckCircle2, ShieldCheck, Mail
} from 'lucide-react'

export default function SecurityPolicyPage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Security Policy</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <ShieldAlert size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">Security Policy</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          We take the security of DevForge seriously. If you find a security issue or vulnerability, please let us know immediately so we can remediate it.
        </p>
      </motion.div>

      {/* Reporting Vulnerabilities */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Mail size={20} style={{ color: 'var(--accent)' }} />
          Vulnerability Reporting
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Please do NOT create public Github issues for security vulnerabilities. Report bugs privately:
        </p>
        <div className="p-5 rounded-xl border space-y-4 text-sm" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            Email reports directly to the core maintainer team at: <strong style={{ color: 'var(--accent)' }}>security@devforge.dev</strong>
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Include a detailed explanation of the exploit vector, replication steps, and potential impact. We target sending an initial confirmation within 24 hours.
          </p>
        </div>
      </motion.section>

      {/* Handling Process */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <ShieldCheck size={20} style={{ color: 'var(--accent)' }} />
          Our Disclosure Policy
        </h2>
        <ul className="space-y-3 pl-1 text-sm">
          {[
            { title: 'Triage phase:', desc: 'Reports are evaluated within 48 hours to confirm the severity rating.' },
            { title: 'Remediation:', desc: 'A patch plan is drafted and tested locally against test fixtures.' },
            { title: 'Coordinated Release:', desc: 'A patch version is released on npm and documented in the changelog before a public security advisory is announced.' }
          ].map((item, idx) => (
            <li key={idx} className="flex gap-3">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
              <div>
                <span className="font-semibold block">{item.title}</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>
    </div>
  )
}
