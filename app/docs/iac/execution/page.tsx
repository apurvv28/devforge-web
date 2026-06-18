'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Play, ChevronRight, CheckCircle2, Info, Terminal
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

const executions = [
  { tool: 'Terraform', command: 'terraform plan ──→ user confirmation ──→ terraform apply' },
  { tool: 'AWS CDK', command: 'cdk diff ──→ user confirmation ──→ cdk deploy --all' },
  { tool: 'boto3', command: 'python deploy.py --dry-run ──→ user confirmation ──→ python deploy.py' }
]

export default function IaCExecutionPage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Infrastructure as Code</span>
          <ChevronRight size={14} />
          <span>Automated Execution</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <Play size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">Automated Execution</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          When existing configurations are detected and fully initialized, DevForge delegates execution directly to native cloud resource engines.
        </p>
      </motion.div>

      {/* Execution Commands */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">Native Command Pipelines</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          The <code>IaCExecutor</code> invokes standard tool commands under a staged approval scheme:
        </p>
        <div className="space-y-4">
          {executions.map((exe) => (
            <div key={exe.tool} className="p-4 rounded-xl border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
              <h4 className="font-semibold text-sm mb-1">{exe.tool}</h4>
              <div className="p-3 rounded-lg border font-mono text-xs overflow-x-auto" style={{ background: 'var(--bg-code)', borderColor: 'var(--border)', color: 'var(--accent)' }}>
                {exe.command}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Non-interactive Approval */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Approval Overrides</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          By default, DevForge pauses and prompts you in the terminal before committing changes. You can bypass this prompt:
        </p>
        <ul className="space-y-3 pl-1 text-sm">
          <li className="flex gap-2">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
            <span>Pass the <code>--yes</code> flag via CLI (perfect for headless CI/CD runner workflows).</span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
            <span>Set <code>autoApprove: true</code> in the project configuration file.</span>
          </li>
        </ul>
        <CodeBlock code="devforge deploy --yes" />
      </motion.section>
    </div>
  )
}
