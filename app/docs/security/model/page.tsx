'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Shield, ChevronRight, CheckCircle2, AlertTriangle, EyeOff, Lock
} from 'lucide-react'

export default function SecurityModelPage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Security & Compliance</span>
          <ChevronRight size={14} />
          <span>Security Model</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <Shield size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">Security Model</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          DevForge is architected with security and code privacy as core principles. It operates on a zero-trust model relative to your proprietary business logic.
        </p>
      </motion.div>

      {/* What DevForge Reads */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <CheckCircle2 size={20} style={{ color: 'var(--accent)' }} />
          What DevForge Reads
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          DevForge only inspects metadata configurations required to detect your application stack:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Project Manifests', desc: 'package.json, requirements.txt, go.mod, pom.xml to capture runtime dependencies.' },
            { title: 'Lock Files', desc: 'package-lock.json, pnpm-lock.yaml, yarn.lock to capture exact dependency versions.' },
            { title: 'Framework Configs', desc: 'next.config.js, tailwind.config.js, tsconfig.json to identify asset compiling structures.' },
            { title: 'IaC Signatures', desc: 'main.tf, cdk.json, Pulumi.yaml to verify if infrastructure configurations exist.' }
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
              <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* What DevForge Does Not Do */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <EyeOff size={20} style={{ color: 'var(--accent)' }} />
          What DevForge Does Not Do
        </h2>
        <div className="p-5 rounded-xl border space-y-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full mt-2" style={{ background: 'var(--accent)' }} />
            <div>
              <h4 className="font-semibold text-sm">Never Reads Source Code</h4>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                Your business logic (`.ts`, `.py`, `.go`, `.java` files under `/src` or `/app`) remains completely unread. DevForge only reads configuration headers and metadata manifests.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full mt-2" style={{ background: 'var(--accent)' }} />
            <div>
              <h4 className="font-semibold text-sm">No Network Calls During Generation</h4>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                All code templates are generated locally or inside an isolated sandboxed context. The execution pipeline does not upload project structures or code strings to external cloud servers.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full mt-2" style={{ background: 'var(--accent)' }} />
            <div>
              <h4 className="font-semibold text-sm">No Credentials Injection</h4>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                DevForge never records cleartext passwords, tokens, or IAM access keys inside files. Instead, it emits standard placeholder references (e.g. <code className="font-mono text-[10px] px-1 rounded" style={{ background: 'var(--bg-code)' }}>${`{{ secrets.AWS_ACCESS_KEY_ID }}`}</code>).
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Safe Defaults */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Lock size={20} style={{ color: 'var(--accent)' }} />
          Safe Defaults
        </h2>
        <ul className="space-y-3 pl-1">
          {[
            { title: 'Guarded File System', desc: 'All writes go through a transaction wrapper. If file creation fails, the transaction immediately rolls back to prevent half-written files.' },
            { title: 'Static and Deterministic Templates', desc: 'Standard files are compiled from local layouts, ensuring they are reproducible and easy to inspect.' },
            { title: 'Read-only Flow by Default', desc: 'Update and audit commands run in dry-run/read-only mode. No workspace modifications are committed without explicit terminal approval.' }
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

      {/* Accepted Risks */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <div className="p-5 rounded-xl border flex items-start gap-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
          <AlertTriangle size={24} className="shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
          <div>
            <h3 className="font-bold text-base mb-1">Accepted Risks</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              The current local audit reports one high-severity advisory in the npm toolchain's transitive dependency tree. While not accepted as a release risk, this must be reviewed as a dependency validation step before production runs. Future policy exceptions will be documented here.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
