'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  CheckSquare, ChevronRight, CheckCircle2, Clock, Info
} from 'lucide-react'

const verifications = [
  {
    tool: 'Terraform',
    timeout: '60 seconds per step',
    steps: [
      'Write HCL configurations to an isolated workspace temp directory.',
      'Execute "terraform init -backend=false -input=false" to initialize and test cloud providers without active credentials.',
      'Execute "terraform validate" to verify structure patterns, module logic, and resource fields.',
      'Execute "terraform fmt -check -recursive" to audit layout alignment without overwriting your files.'
    ]
  },
  {
    tool: 'AWS CDK (TypeScript)',
    timeout: '120 seconds total',
    steps: [
      'Write CDK code to temporary workspace directories.',
      'Run "npm install --prefer-offline --no-audit" to build required package configurations.',
      'Run "npx cdk synth --quiet" to confirm stack classes resolve successfully to clean CloudFormation outputs.'
    ]
  },
  {
    tool: 'boto3 (Python)',
    timeout: '30 seconds total',
    steps: [
      'Write setup script (.py) files to temporary targets.',
      'Run "python -m py_compile <file>" to evaluate syntax parsing correctness.',
      'Run "pylint --errors-only <file>" (skipped automatically if the linter is not locally installed).'
    ]
  }
]

export default function IaCVerificationPage() {
  return (
    <div className="max-w-3xl py-4 space-y-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
          <Link href="/docs" className="hover:underline" style={{ color: 'var(--accent)' }}>Docs</Link>
          <ChevronRight size={14} />
          <span>Infrastructure as Code</span>
          <ChevronRight size={14} />
          <span>Verification Steps</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)' }}>
            <CheckSquare size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 className="text-4xl font-bold">Verification Steps</h1>
        </div>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          DevForge runs native tool-chain commands in temporary workspaces to verify generated configurations before committing them to your codebase.
        </p>
      </motion.div>

      {/* Verification Matrix */}
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
        {verifications.map((v) => (
          <div key={v.tool} className="p-6 rounded-xl border space-y-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-bold text-lg" style={{ color: 'var(--accent)' }}>{v.tool}</h3>
              <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--text-tertiary)' }}>
                <Clock size={13} />
                <span>Timeout: {v.timeout}</span>
              </div>
            </div>
            <ul className="space-y-3">
              {v.steps.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                  <div>
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Step 0{idx + 1}: </span>
                    {step}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.section>
    </div>
  )
}
