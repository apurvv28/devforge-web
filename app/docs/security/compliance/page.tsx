'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ShieldAlert, ChevronRight, FileText, CheckCircle2, ClipboardList
} from 'lucide-react'

export default function ComplianceAgentPage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Security & Compliance</span>
          <ChevronRight size={14} />
          <span>Compliance Agent</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <ClipboardList size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">Compliance Agent</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          DevForge v2 includes an integrated Security & Compliance Agent that scans your CI/CD pipelines and infrastructure declarations against standard framework guidelines.
        </p>
      </motion.div>

      {/* NIST SP 800-53 Controls */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">NIST SP 800-53 Controls</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          The Security Compliance Agent checks workflows against control requirements:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Access Control (AC)', desc: 'Validates least privilege tokens and prevents root access in executors.' },
            { title: 'Audit and Accountability (AU)', desc: 'Checks log capturing structures and ensures a clear trace is maintained.' },
            { title: 'Configuration Management (CM)', desc: 'Validates secure config controls and checks for static secrets injection.' },
            { title: 'System Communications (SC)', desc: 'Verifies network bounds and reviews exposure profiles for VPC boundaries.' }
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
              <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ISO 27001 Annex A */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">ISO 27001 Annex A</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Specific checks map directly to operations controls:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { control: 'A.8 Asset Management', desc: 'Maintains configuration matrices and traces dependencies.' },
            { control: 'A.9 Access Control', desc: 'Enforces strict token scopes for pipeline execution steps.' },
            { control: 'A.12 Operations Security', desc: 'Verifies log recording and ensures vulnerability scans are present.' },
            { control: 'A.14 Development & Maintenance', desc: 'Ensures static code formatting checks and build tests are enforced.' }
          ].map((item) => (
            <div key={item.control} className="p-4 rounded-xl border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
              <h4 className="font-semibold text-sm mb-1">{item.control}</h4>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* How to Read a Compliance Report */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Reading Compliance Reports</h2>
        <div className="p-5 rounded-xl border space-y-4 text-sm" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
          <div className="flex gap-3">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
            <p style={{ color: 'var(--text-secondary)' }}>
              <strong>Findings Severity:</strong> Reports group findings by severity levels: <code>CRITICAL</code>, <code>HIGH</code>, <code>MEDIUM</code>, and <code>LOW</code>.
            </p>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
            <p style={{ color: 'var(--text-secondary)' }}>
              <strong>Remediation Path:</strong> Each finding identifies the exact file path and code line, offering a targeted suggestion or command block.
            </p>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
            <p style={{ color: 'var(--text-secondary)' }}>
              <strong>Control Reference:</strong> Mapped controls show exactly which standard (e.g. NIST AC-3 or ISO A.9.1) requires the fix.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
