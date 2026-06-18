'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ShieldAlert, ChevronRight, CheckCircle2, Shield, Info, Terminal
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

export default function TrivyScanningPage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Security & Compliance</span>
          <ChevronRight size={14} />
          <span>Trivy Scanning</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <Shield size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">Trivy Scanning</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          DevForge integrates with Trivy to identify security vulnerabilities and misconfigurations in pipelines and Infrastructure-as-Code files.
        </p>
      </motion.div>

      {/* Scope of Scanning */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Scope of Scanning</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Trivy scanning runs locally if the binary is present, checking files before they are written to your workspace:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Workflows & Actions', desc: 'Checks pipeline runners for unsafe configurations, shell-injection risks, and third-party action issues.' },
            { title: 'Terraform HCL', desc: 'Validates AWS ECS, EKS, and EC2 resource models against cloud configuration standards.' },
            { title: 'AWS CDK', desc: 'Inspects TypeScript stack templates and synthesises output structures for anomalies.' },
            { title: 'Container Dockerfiles', desc: 'Reviews base image selections, environment assignments, and command vectors.' }
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
              <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Non-Blocking Warnings */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Non-blocking Execution Design</h2>
        <div className="p-5 rounded-xl border space-y-3 text-sm" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
          <div className="flex items-start gap-2.5">
            <Info size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
            <p style={{ color: 'var(--text-secondary)' }}>
              Trivy findings are reported as <strong>Warnings</strong>. They never crash the code generator or prevent the physical files from being written to your workspace.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <Info size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
            <p style={{ color: 'var(--text-secondary)' }}>
              This ensures that local code generation remains fast and developer-first, while still surfacing helpful advisories to review before git commits.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Running Scans */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">How it looks in execution</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          During initialization, if Trivy scans detect a config issue, warnings print to standard output:
        </p>
        <div className="p-4 rounded-xl border font-mono text-xs" style={{ background: 'var(--bg-code)', borderColor: 'var(--border)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>⟳ Scanning generated IaC configurations with Trivy...</p>
          <p className="mt-1" style={{ color: 'var(--accent)' }}>⚠ WARNING: Trivy scan found 2 issues in infra/main.tf</p>
          <p style={{ color: 'var(--text-tertiary)' }}>  - [LOW] avd-aws-0104: IAM policy allows wildcard action</p>
          <p style={{ color: 'var(--text-tertiary)' }}>  - [MEDIUM] avd-aws-0129: Security group allows unrestricted ingress</p>
        </div>
      </motion.section>
    </div>
  )
}
